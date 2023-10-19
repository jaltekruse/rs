"use strict";

import RunestoneBase from "../../common/js/runestonebase.js";
// TODO fix this, in the meantime including from sphinx_static_files.html
// ERROR in ./runestone/doenet/js/doenet-standalone.js 240673:19
//Module parse failed: Unterminated template (240673:19)
//You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
//import "./doenet-standalone.js";

// separate into constructor and init
export class Doenet extends RunestoneBase {
  constructor(opts) {
    super(opts);
    this.doenetML = opts.doenetML;
    var orig = $(opts.orig).find("div")[0];
    // todo - think about how we pass around the doenetML
    //window.renderDoenetToContainer(orig, this.doenetML);
    window.renderDoenetToContainer(orig);
  }

  async logCurrentAnswer(sid) {

  }

  renderFeedback() {
  }

  disableInteraction() {
  }


  checkLocalStorage() {

  }
  setLocalStorage() {

  }

  restoreAnswers() {

  }

}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory.doenet = (opts) => {
  return new Doenet(opts);
};