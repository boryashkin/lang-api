import Text from "@/interfaces/Text"
import { ElementRule } from "@/proto/generated/ElementRule"

export const HydrateTextWithRules = (item: Text, elRules: ElementRule[]): Text => {
    if (elRules.length == 0) {
        return item
    }
    let originalText = item.text
    if (originalText.length == 0) {
        console.error("empty original text", item)
        return item
    }

    let sortedSelected = elRules.sort((a: ElementRule, b: ElementRule): number => { return (a.start ?? 0) - (b.start ?? 0) })
    console.log(elRules, sortedSelected)


    let selectedI = 0
    let state = 0 // 0 - none, 1 - empty, 2 - selected
    let curStart = 0
    let curEnd = 0
    let addRule = (start: number, stop: number, ruleName: string, ruleDescription: string, color: string) => {
        item.rules.push({
            ruleName: ruleName,
            ruleDescription: ruleDescription,
            text: originalText.substring(start, stop + 1),
            color: color
        })
    }
    for (let i = 0; i < originalText.length; i++) {
        let selectedItem = sortedSelected[selectedI]

        if (state == 0) { //none
            curStart = i
            if (selectedItem && selectedItem.start == i) {
                state = 2
                continue
            } else {
                state = 1
            }
            continue

        } else if (state == 1) { // empty
            if (selectedItem && selectedItem.start == i) {
                curEnd = i - 1
                addRule(curStart, curEnd, "", "", "")
                curStart = i
                state = 2
            } else if (i == originalText.length - 1) {
                curEnd = i
                addRule(curStart, curEnd, "", "", "")
            }
            continue
        } else { // selected
            if (selectedItem && i == selectedItem.stop) {
                let itemName = selectedItem.name ?? ""
                if (itemName == "") {
                    itemName = "Note"
                }
                curEnd = i
                addRule(curStart, curEnd, itemName, selectedItem.note ?? "", selectedItem.color ?? "")
                selectedI++
                state = 0
            }
            continue
        }
    }

    return item
}