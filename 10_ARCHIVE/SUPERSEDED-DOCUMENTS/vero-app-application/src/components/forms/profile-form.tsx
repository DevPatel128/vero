"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { CAREER_PATHS, ZONES } from "@/lib/career-paths";

interface ProfileFormProps {
  initial?: {
    display_name: string | null;
    bio: string | null;
    career_path: string | null;
    skills: string[] | null;
    zone: string | null;
  } | null;
}

export function ProfileForm({ initial }: ProfileFormProps) {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(initial?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function addSkill() {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.length >= 12 || skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setSkillInput("");
  }

  function removeSkill(s: string) {
    setSkills(skills.filter((x) => x !== s));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (skills.length === 0) {
      setError("Add at least one skill");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const payload = {
      displayName: formData.get("displayName") || "",
      bio: formData.get("bio") || "",
      careerPath: formData.get("careerPath"),
      city: "bengaluru" as const,
      zone: formData.get("zone"),
      skills,
    };

    startTransition(async () => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Save failed");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
      <Field label="Display name (optional)" htmlFor="displayName" hint="Shown on your public record. Leave blank to use your full name.">
        <Input
          id="displayName"
          name="displayName"
          defaultValue={initial?.display_name ?? ""}
          maxLength={60}
          disabled={isPending}
        />
      </Field>

      <Field label="Short bio (optional)" htmlFor="bio" hint="Max 600 characters.">
        <Textarea id="bio" name="bio" defaultValue={initial?.bio ?? ""} maxLength={600} disabled={isPending} />
      </Field>

      <Field label="Career path" htmlFor="careerPath">
        <Select id="careerPath" name="careerPath" required defaultValue={initial?.career_path ?? ""} disabled={isPending}>
          <option value="" disabled>Pick one</option>
          {Object.entries(
            CAREER_PATHS.reduce<Record<string, typeof CAREER_PATHS>>((acc, p) => {
              acc[p.category] = acc[p.category] ?? [];
              acc[p.category].push(p);
              return acc;
            }, {}),
          ).map(([category, paths]) => (
            <optgroup key={category} label={category}>
              {paths.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.label}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </Field>

      <Field label="City zone" htmlFor="zone" hint="Phase 1: Bengaluru only.">
        <Select id="zone" name="zone" required defaultValue={initial?.zone ?? ""} disabled={isPending}>
          <option value="" disabled>Pick a zone</option>
          {ZONES.map((z) => (
            <option key={z.slug} value={z.slug}>{z.label}</option>
          ))}
        </Select>
      </Field>

      <Field label="Skills" hint="Press Enter to add. Max 12.">
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            maxLength={40}
            placeholder="e.g. video editing"
            disabled={isPending || skills.length >= 12}
          />
          <Button type="button" variant="secondary" size="md" onClick={addSkill} disabled={isPending || skills.length >= 12}>
            Add
          </Button>
        </div>
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => removeSkill(s)}
                disabled={isPending}
                className="rounded-pill bg-surface-2 px-3 py-1 text-xs text-ink-1 hover:text-ink-0"
              >
                {s} ×
              </button>
            ))}
          </div>
        )}
      </Field>

      {error && (
        <p role="alert" className="text-sm text-signal" aria-live="polite">
          {error}
        </p>
      )}

      <Button variant="primary" size="lg" type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
