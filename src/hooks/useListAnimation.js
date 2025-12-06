import { useState } from "react";

export const useListAnimation = (
  slideOutDuration = 450,
  collapseDuration = 300
) => {
  const [removingId, setRemovingId] = useState(null);
  const [collapsingId, setCollapsingId] = useState(null);

  const handleRemove = async (id, onRemove) => {
    setRemovingId(id);
    await new Promise((resolve) => setTimeout(resolve, slideOutDuration));
    setCollapsingId(id);
    await new Promise((resolve) => setTimeout(resolve, collapseDuration));

    // Call the actual remove function
    await onRemove(id);

    setRemovingId(null);
    setCollapsingId(null);
  };

  return { removingId, collapsingId, handleRemove };
};
