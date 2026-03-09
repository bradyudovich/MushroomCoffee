export default function Comparison() {
  const rows = [
    {
      dimension: "Focus & Clarity",
      zenFocus: "Lion's Mane promotes sustained cognitive performance",
      regular: "Short-lived caffeine spike, then brain fog",
    },
    {
      dimension: "Energy Crash",
      zenFocus: "Smooth, steady energy — no crash",
      regular: "Inevitable afternoon energy crash",
    },
    {
      dimension: "Gut Health",
      zenFocus: "Prebiotic mushrooms support a healthy microbiome",
      regular: "Can irritate the gut lining and increase acidity",
    },
    {
      dimension: "Anxiety",
      zenFocus: "Adaptogenic blend helps calm the nervous system",
      regular: "High caffeine levels can trigger anxiety & jitters",
    },
    {
      dimension: "Antioxidants",
      zenFocus: "Rich in beta-glucans and polyphenols",
      regular: "Some antioxidants, but far fewer functional compounds",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-700">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="bg-neutral-800 text-left">
            <th className="px-6 py-4 font-semibold text-neutral-400 w-1/4">
              Category
            </th>
            <th className="px-6 py-4 font-semibold text-emerald-400">
              ✦ ZenFocus Mushroom Coffee
            </th>
            <th className="px-6 py-4 font-semibold text-neutral-500">
              Regular Coffee
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.dimension}
              className={`border-t border-neutral-700 transition-colors ${
                index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800/50"
              } hover:bg-neutral-700/40`}
            >
              <td className="px-6 py-4 font-medium text-white">
                {row.dimension}
              </td>
              <td className="px-6 py-4 text-emerald-300">{row.zenFocus}</td>
              <td className="px-6 py-4 text-neutral-400">{row.regular}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
