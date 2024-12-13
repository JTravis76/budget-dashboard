import van, { /*TagFunc,*/ ValidChildDomValue } from "vanjs-core";

// https://github.com/vanjs-org/van/blob/main/components/van-ui.ts

interface AwaitProps<Value> {
  value: Promise<Value>
  //container?: TagFunc<Element>
  Loading?: () => ValidChildDomValue
  Error?: (reason: Error) => ValidChildDomValue
}

export type AwaitState<Value> =
  | { status: "pending" }
  | { status: "fulfilled", value: Value }
  | { status: "rejected", value: Error }

export const Await = <T>(
  {
    value,
    //container = van.tags.div,
    Loading, Error
  }: AwaitProps<T>,
  children: (data: T) => ValidChildDomValue
) => {
  const data = van.state<AwaitState<T>>({ status: "pending" });

  value
    .then(result => data.val = { status: "fulfilled", value: result })
    .catch(err => data.val = { status: "rejected", value: err });

  return () =>
    data.val.status === "pending"
      ? Loading?.() ?? ""
      : data.val.status === "rejected"
        ? Error?.(data.val.value)
        : children(data.val.value)


  // return container(() =>
  //   data.val.status === "pending"
  //   ? Loading?.() ?? ""
  //   : data.val.status === "rejected"
  //     ? Error?.(data.val.value)
  //     : children(data.val.value),
  // );
};