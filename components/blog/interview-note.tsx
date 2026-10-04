import type { InterviewNote } from '@/lib/interview-notes'

export function InterviewNoteBox({ note }: { note: InterviewNote }) {
    return (
        <details className="group my-8 rounded-2xl border border-[#E7E4DF] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] open:bg-[#F3F1ED]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-[#151515]">In an interview</span>
                <span aria-hidden className="text-xl leading-none text-[#151515] group-open:hidden">
                    +
                </span>
                <span aria-hidden className="hidden text-xl leading-none text-[#151515] group-open:inline">
                    −
                </span>
            </summary>
            <div className="space-y-3 px-6 pb-6 text-[#5E5E5E]">
                <p>
                    <span className="font-semibold text-[#151515]">Why it matters: </span>
                    {note.whyItMatters}
                </p>
                <p>
                    <span className="font-semibold text-[#151515]">Use it to: </span>
                    {note.useItTo}
                </p>
                <p>
                    <span className="font-semibold text-[#151515]">Likely question: </span>
                    {note.likelyQuestion}
                </p>
            </div>
        </details>
    )
}
