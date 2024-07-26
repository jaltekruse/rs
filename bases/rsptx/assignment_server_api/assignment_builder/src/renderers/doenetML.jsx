import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { setCode } from "../state/preview/previewSlice";
import { setQuestionJson, selectUniqueId, setPreviewSrc } from "../state/interactive/interactiveSlice";
import { setStatement, setAttachment, selectAttachment, selectStatement } from "../state/shortanswer/shortSlice";
import { createShortAnswerTemplate } from "../componentFuncs";
import { DoenetEditor } from "@doenet/doenetml-iframe";

export function DoenetMLCreator () {
    const statement = useSelector(selectStatement);
    const attachment = useSelector(selectAttachment);
    const dispatch = useDispatch();
    const uniqueId = useSelector(selectUniqueId);

    function handleCodeUpdates() {
        console.log("Code updates");
        let code = createShortAnswerTemplate(uniqueId, statement, attachment);
        dispatch(setCode(code));
        dispatch(setPreviewSrc(code));
        dispatch(setQuestionJson({ statement, attachment }));
    
    }
    
    return (
        <div>
            <h1>DonetML</h1>

            <div className="p-fluid p-field">
                <label htmlFor="saStatement">Question Prompt</label>
                <InputTextarea id="saStatement"
                    placeholder="Question"
                    value={statement}
                    onChange={(e) => dispatch(setStatement(e.target.value))}
                    onBlur={handleCodeUpdates}
                />
            </div>

            <div className="p-fluid p-field">
                <label htmlFor="saStatement">Question Prompt</label>
                <DoenetEditor doenetML={statement}/>
            </div>
        </div>
    );
}