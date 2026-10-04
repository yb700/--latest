const fieldClassName =
    'w-full rounded-[12px] border border-[#E1DED8] bg-white px-4 py-2.5 text-sm text-[#151515] placeholder:text-[#8A8780]'

interface SearchFieldProps {
    action: string
    id: string
    defaultValue: string
    hidden?: Record<string, string>
}

export function SearchField({ action, id, defaultValue, hidden }: SearchFieldProps) {
    return (
        <form action={action} method="get" role="search">
            {hidden
                ? Object.entries(hidden).map(([name, value]) =>
                      value ? <input key={name} type="hidden" name={name} value={value} /> : null
                  )
                : null}
            <label className="sr-only" htmlFor={id}>
                Search titles and summaries
            </label>
            <input
                id={id}
                name="search"
                type="search"
                defaultValue={defaultValue}
                placeholder="Search titles and summaries"
                className={fieldClassName}
            />
            <button type="submit" className="sr-only">
                Search
            </button>
        </form>
    )
}
