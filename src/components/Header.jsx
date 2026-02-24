export default function Header({ title }) {
  return (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">{title}</h1>

      <button className="md:hidden text-gray-600">
        ☰
      </button>
    </header>
  )
}