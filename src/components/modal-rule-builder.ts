import van from "vanjs-core";
import { ModalFrame } from "./modal-frame";
import { FormRuleBuilder } from "./form-rule-builder";

const { } = van.tags;

export const ModalRuleBuilder = () => {
  return ModalFrame(
    { id: "RuleBuilderModal", title: "Tag Rule Builder" },
    FormRuleBuilder()
  );
}