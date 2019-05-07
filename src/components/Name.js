import React from "react";
import { addEffect, invalidate } from "react-three-fiber";
import { Globals, update, useTransition, a } from "react-spring";
import { useRoute } from "wouter";
import { names } from "../resources/index";

// Put react-springs update loop into three-fibers to save at least a little perf
// Though overall the perf is super bad b/c there are still two RS impl side by side
// At some point these libs will start to recognize one another automatically and things
// like raf-loops will be pulled from a shared intermediary lib ...
// But at the moment mixing reconcilers is still the wild west
addEffect(update);
Globals.injectManualFrameloop(() => invalidate());

export default function Name() {
  const [match, params] = useRoute("/person/:name");
  const name = match ? params.name : names[0];

  const transitions = useTransition(name, null, {
    from: { opacity: 0, transform: "translate3d(-400px,0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(400px, 0, 0)" }
  });

  return transitions.map(({ item, key, props }) => (
    <span class="middle">
      <a.div key={key} style={props}>
        {item}
      </a.div>
    </span>
  ));
}
