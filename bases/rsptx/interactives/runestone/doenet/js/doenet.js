"use strict";

import RunestoneBase from "../../common/js/runestonebase.js";
// TODO fix this, in the meantime including from sphinx_static_files.html
// ERROR in ./runestone/doenet/js/doenet-standalone.js 240673:19
//Module parse failed: Unterminated template (240673:19)
//You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
//import "./doenet-standalone.js";

console.log("IN DOENET - add event listener for splice");
// SPLICE Events
window.addEventListener("message", (event) => {
  console.log("IN DOENET - got a message", event);
  if (event.data.subject == "SPLICE.reportScoreAndState") {
    console.log(event.data.score);
    console.log(event.data.state);
    event.data.course_name = eBookConfig.course;
    let ev = {
      event: "hparsons",
      div_id: event.data.activityId,
      act: JSON.stringify(event.data),
    };
    window.componentMap[event.data.activityId].logBookEvent(ev);
  } else if (event.data.subject == "SPLICE.sendEvent") {
    console.log(event.data.location);
    console.log(event.data.name);
    console.log(event.data.data);
  }
});

// separate into constructor and init
export class Doenet extends RunestoneBase {
  constructor(opts) {
    super(opts);
    console.log(opts);
    console.log("Jason update oct 24th");
    this.doenetML = opts.doenetML;
    var orig = $(opts.orig).find("div")[0];
    console.log(`${eBookConfig.new_server_prefix}/logger/bookevent`);
    // todo - think about how we pass around the doenetML
    //window.renderDoenetToContainer(orig, this.doenetML);
    window.renderDoenetToContainer(orig, this.doenetML, {
      flags: {
        // showCorrectness,
        // readOnly,
        // showFeedback,
        // showHints,
        showCorrectness: true,
        readOnly: false,
        solutionDisplayMode: "button",
        showFeedback: true,
        showHints: true,
        allowLoadState: false,
        allowSaveState: true,
        allowLocalState: false,
        allowSaveSubmissions: true,
        allowSaveEvents: false,
        autoSubmit: false,
      },
      activityId: opts.orig.id,
      apiURLs: { postMessages: true },
    });
  }

  async logCurrentAnswer(sid) {}

  renderFeedback() {}

  disableInteraction() {}

  checkLocalStorage() {}
  setLocalStorage() {}

  restoreAnswers() {}
}

if (typeof window.component_factory === "undefined") {
  window.component_factory = {};
}
window.component_factory.doenet = (opts) => {
  return new Doenet(opts);
};
