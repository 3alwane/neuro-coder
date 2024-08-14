import React, { useState } from "react";
import SingleBadgeCard from "./SingleBadgeCard";
import { useAppContext } from "@/app/ContextApi";
import { Badge, badges } from "@/data/AllBadges";

function AllAchievements() {
  const [allBadges, setAllBadges] = useState<Badge[]>(badges);

  return (
    <div className="w-full flex flex-wrap max-sm:flex-col  gap-3 mt-6">
      {allBadges.map((singleBadge, index) => (
        <div
          key={index}
          className={`${index !== 0 && index !== 1 && "opacity-50"}`}
        >
          <SingleBadgeCard badge={singleBadge} />
        </div>
      ))}
    </div>
  );
}

export default AllAchievements;
