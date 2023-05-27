import Text from "@/interfaces/Text";
import TextRule from "@/interfaces/TextRule";
import { MouseEventHandler } from "react";

export function TextSpanList(props: { text: Text, handleSpanClick: MouseEventHandler<Element> | undefined }) {
    console.log("TextSpanList rerendered")
    const listRules = props.text.rules.map((rule: TextRule, index: number) => {
        let spanClasses = ""
        if (rule.ruleName !== "") {
            spanClasses = "note-element rounded-lg hover:bg-opacity-50"
            spanClasses += " bg-" + rule.color + "-200"
        }
        return <span key={"note-span-" + props.text.id + "-" + index} data-body={rule.ruleDescription} onClick={props.handleSpanClick} className={spanClasses} title={rule.ruleName}>{rule.text}</span>
    });
    return (
        <>{listRules}</>
    );
}