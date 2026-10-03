import { Workout } from "@/types/workout";

const primaryUrl = process.env.NEXT_PUBLIC_FITLOG_API_URL;
const fallbackUrl = process.env.NEXT_PUBLIC_FITLOG_API_FALLBACK_URL;

function baseUrls() {
  return [primaryUrl, fallbackUrl].filter((value): value is string =>
    Boolean(value),
  );
}

async function requestJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<unknown>;
}

async function fetchFromAvailableApi(path = "") {
  const urls = baseUrls();

  if (urls.length === 0) {
    throw new Error(
      "FitLog API URL is missing. Add NEXT_PUBLIC_FITLOG_API_URL to .env.local.",
    );
  }

  let lastError: unknown;

  for (const url of urls) {
    try {
      return await requestJson(`${url.replace(/\/$/, "")}${path}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Unable to reach the FitLog API.");
}

export async function getWorkouts(): Promise<Workout[]> {
  const raw = await fetchFromAvailableApi();
  const list = extractList(raw);
  return list.map(normalizeWorkout).filter(Boolean) as Workout[];
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const raw = await fetchFromAvailableApi(`/${encodeURIComponent(id)}`);
    const item = extractSingle(raw);
    return item ? normalizeWorkout(item) : null;
  } catch {
    const all = await getWorkouts().catch(() => []);
    return all.find((workout) => String(workout.id) === String(id)) ?? null;
  }
}

function extractList(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];

  const candidates = [value.data, value.workouts, value.results, value.items];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate.filter(isRecord);
    if (isRecord(candidate) && Array.isArray(candidate.items))
      return candidate.items.filter(isRecord);
  }

  return [];
}

function extractSingle(value: unknown): Record<string, unknown> | null {
  if (isRecord(value) && isRecord(value.data)) return value.data;
  if (isRecord(value) && isRecord(value.workout)) return value.workout;
  return isRecord(value) ? value : null;
}

function normalizeWorkout(item: Record<string, unknown>): Workout | null {
  const id = first(item, ["id", "_id", "workoutId"]);
  const name = stringValue(first(item, ["name", "title", "workoutName"]));

  if (id === undefined || !name) return null;

  return {
    id: id as string | number,
    name: name.toUpperCase(),
    description:
      stringValue(first(item, ["description", "summary", "details"])) ||
      "No description available.",
    categories: stringList(
      first(item, [
        "category",
        "categories",
        "bodyPart",
        "muscle",
        "targetMuscle",
      ]),
    ),
    equipment: stringList(first(item, ["equipment", "equipments", "tools"])),
    difficulty:
      stringValue(first(item, ["difficulty", "level"])) || "Not specified",
    sets: stringValue(first(item, ["sets", "set"])) || "-",
    reps: stringValue(first(item, ["reps", "repetitions", "rep"])) || "-",
    duration: numberValue(
      first(item, ["duration", "durationMinutes", "duration_min"]),
    ),
    calories: numberValue(
      first(item, ["calories", "caloriesBurned", "calorie"]),
    ),
    rating: numberValue(first(item, ["rating", "score", "stars"])),
    image:
      stringValue(first(item, ["image", "imageUrl", "img", "thumbnail"])) ||
      "/banner.png",
    instructions: stringList(
      first(item, ["instructions", "steps", "howTo", "procedure"]),
    ),
  };
}

function first(item: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null) return item[key];
  }
  return undefined;
}

function stringValue(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(stringValue).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[,|]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function numberValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const match = value.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    if (match) return Number(match[0]);
  }
  return 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
