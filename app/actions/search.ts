"use server";

import { Index } from "@upstash/vector";
import type { Applicant } from "@/types";

// Lazy initialization
let _index: Index | null = null;

function getIndex() {
  if (!_index) {
    _index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL || "",
      token: process.env.UPSTASH_VECTOR_REST_TOKEN || "",
    });
  }
  return _index;
}

export async function search(
  query: string = "",
): Promise<{ applicants: Applicant[]; duration: number }> {
  const startTime = performance.now();
  const response = await getIndex().query({
    topK: 50,
    data: query,
    includeMetadata: true,
    includeVectors: false,
  });
  const endTime = performance.now();
  return {
    applicants: response.map((result) => result.metadata) as Applicant[],
    duration: endTime - startTime,
  };
}
