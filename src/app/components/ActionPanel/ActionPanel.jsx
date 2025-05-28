import { FiSettings, FiMusic } from "react-icons/fi";
import { TbClipboardCheck } from "react-icons/tb";

export default function ActionPanel() {
  return (
    <div className="fixed top-1/2 right-6 -translate-y-1/2 bg-[#9FAF87] rounded-2xl py-4 px-2 flex flex-col gap-4 shadow-2xl">
      <button className="bg-[#F5F5F5] w-10 h-10 rounded-2xl flex items-center justify-center text-[#9FAF87] shadow-inner hover:scale-105 transition-transform">
        <FiSettings size={23} />
      </button>
      <button className="bg-[#F5F5F5] w-10 h-10 rounded-2xl flex items-center justify-center text-[#9FAF87] shadow-inner hover:scale-105 transition-transform">
        <TbClipboardCheck size={27} />
      </button>
      <button className="bg-[#F5F5F5] w-10 h-10 rounded-2xl flex items-center justify-center text-[#9FAF87] shadow-inner hover:scale-105 transition-transform">
        <FiMusic size={23} />
      </button>
    </div>
  );
}
