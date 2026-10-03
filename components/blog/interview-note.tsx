import type { InterviewNote } from '@/lib/interview-notes'

export function InterviewNoteBox({ note }: { note: InterviewNote }) {
    return (
        <details className="group my-8 rounded-xl border border-[#E6E8EC] bg-white open:bg-[#F7F8FA]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="font-bold text-[#14213D]">In an interview</span>
                <span aria-hidden className="text-xl leading-none text-[#14213D] group-open:hidden">
                    +
                </span>
                <span aria-hidden className="hidden text-xl leading-none text-[#14213D] group-open:inline">
                    −
                </span>
            </summary>
            <div className="space-y-3 px-4 pb-4 text-[#5A6270]">
                <p>
                    <span className="font-semibold text-[#14213D]">Why it matters: </span>
                    {note.whyItMatters}
                </p>
                <p>
                    <span className="font-semibold text-[#14213D]">Use it to: </span>
                    {note.useItTo}
                </p>
                <p>
                    <span className="font-semibold text-[#14213D]">Likely question: </span>
                    {note.likelyQuestion}
                </p>
            </div>
        </details>
    )
}
