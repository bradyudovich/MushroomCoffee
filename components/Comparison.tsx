interface ComparisonRow {
  dimension: string;
  tallow: string;
  waterBased: string;
}

interface ComparisonProps {
  rows: readonly ComparisonRow[];
}

export default function Comparison({ rows }: ComparisonProps) {

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="bg-[#8A9A5B] text-left">
            <th className="px-6 py-4 font-semibold text-[#FDFCF0] w-1/4">
              Category
            </th>
            <th className="px-6 py-4 font-semibold text-[#FDFCF0]">
              ✦ PureGlow Tallow Cream
            </th>
            <th className="px-6 py-4 font-semibold text-[#FDFCF0]/70">
              Water-Based Lotions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.dimension}
              className={`border-t border-stone-200 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-[#FDFCF0]"
              } hover:bg-stone-50`}
            >
              <td className="px-6 py-4 font-semibold text-stone-700">
                {row.dimension}
              </td>
              <td className="px-6 py-4 text-[#8A9A5B] font-medium">
                {row.tallow}
              </td>
              <td className="px-6 py-4 text-stone-400">{row.waterBased}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
