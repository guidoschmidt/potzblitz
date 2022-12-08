function remove(arr: Array<Function>, item: Function) {
  delete arr[arr.indexOf(item)];
}

function all<T>(arr: Array<Function>, val: T) {
  for (var k in arr) arr[k](val);
}

export function createSignal<T>(initial: T): Array<Function> {
  var _current = initial;
  const subscriptions = [];

  function setValue(newVal: T) {
    _current = newVal;
    all(subscriptions, _current);
  }

  function value() {
    observable.set = function (val: T) {
      _current = val;
      all(subscriptions, _current);
    };
    return observable;

    function observable(subscribe?: (v: T) => any) {
      if (subscribe === undefined) {
        return _current;
      }
      if (typeof subscribe === "function") {
        return (
          subscriptions.push(subscribe),
          (subscribe as Function)(_current),
          function () {
            remove(subscriptions, subscribe);
          }
        );
      }
    }
  }

  return [value(), setValue];
}
