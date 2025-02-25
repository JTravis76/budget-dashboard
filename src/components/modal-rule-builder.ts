import { ModalFrame } from "./modal-frame";
import { FormRuleBuilder } from "./form-rule-builder";

export const ModalRuleBuilder = () => {
  return ModalFrame(
    { id: "RuleBuilderModal", title: "Tag Rule Builder" },
    FormRuleBuilder()
  );
}