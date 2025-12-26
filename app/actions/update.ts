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

export async function update(applicant: Applicant) {
  await getIndex().update({
    id: applicant.id,
    metadata: applicant,
  });
}
