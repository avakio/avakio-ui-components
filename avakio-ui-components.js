import { jsxs as g, Fragment as et, jsx as e } from "react/jsx-runtime";
import Pe, { useRef as Ce, useState as q, useMemo as Ie, useEffect as be, forwardRef as He, createElement as wt, useCallback as ve, useImperativeHandle as We, useId as Nt } from "react";
import { createPortal as Tt } from "react-dom";
const Yt = (a, n, i) => Math.min(Math.max(a, n), i);
function Ut({
  open: a,
  anchorRef: n,
  anchorRect: i,
  x: o,
  y: l,
  offset: y,
  width: x,
  height: A,
  theme: O,
  modal: T,
  closeOnOutside: v = !0,
  closeOnEsc: D = !0,
  onClose: j,
  className: te,
  style: W,
  children: I,
  id: V,
  testId: J
}) {
  const H = Ce(null), [K, _] = q({ top: 0, left: 0 }), h = Ie(() => {
    if (typeof x == "number") return x;
    if (typeof x == "string") {
      const $ = parseInt(x, 10);
      return isNaN($) ? 320 : $;
    }
    return 320;
  }, [x]);
  if (be(() => {
    if (!a) return;
    const $ = () => {
      let z = typeof o == "number" ? o : (window.innerWidth - h) / 2, S = typeof l == "number" ? l : 96;
      if (n?.current) {
        const t = n.current.getBoundingClientRect();
        z = t.left + (y?.x ?? 0), S = t.bottom + (y?.y ?? 8);
      } else i && (z = i.left + (y?.x ?? 0), S = i.bottom + (y?.y ?? 8));
      const L = Math.max(8, window.innerWidth - h - 8);
      z = Yt(z, 8, L), S = Math.max(8, S), _({ top: S, left: z });
    };
    return $(), window.addEventListener("resize", $), window.addEventListener("scroll", $, !0), () => {
      window.removeEventListener("resize", $), window.removeEventListener("scroll", $, !0);
    };
  }, [a, n, i, o, l, y, h]), be(() => {
    if (!a || !D) return;
    const $ = (z) => {
      z.key === "Escape" && j?.();
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [a, D, j]), be(() => {
    if (!a || !v) return;
    const $ = (z) => {
      H.current && (H.current.contains(z.target) || j?.());
    };
    return document.addEventListener("mousedown", $, !0), () => document.removeEventListener("mousedown", $, !0);
  }, [a, v, j]), !a) return null;
  const ae = /* @__PURE__ */ g(et, { children: [
    T && /* @__PURE__ */ e(
      "div",
      {
        className: "avakio-popup-overlay",
        "data-admin-theme": O,
        onClick: v ? j : void 0
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        ref: H,
        id: V,
        "data-testid": J,
        className: ["avakio-popup", te || ""].join(" ").trim(),
        "data-admin-theme": O,
        style: {
          top: K.top,
          left: K.left,
          width: x ?? `${h}px`,
          height: A,
          ...W
        },
        children: I
      }
    )
  ] });
  return Tt(ae, document.body);
}
const Wn = ["material", "flat", "compact", "dark", "ocean", "sunset"];
function Kn({ columns: a, items: n, onMove: i, className: o, style: l, theme: y, id: x, testId: A }) {
  const [O, T] = q(null), v = Ie(() => {
    const W = {};
    return a.forEach((I) => {
      W[I.id] = [];
    }), n.forEach((I) => {
      W[I.columnId] || (W[I.columnId] = []), W[I.columnId].push(I);
    }), W;
  }, [a, n]), D = (W) => (I) => {
    T(W), I.dataTransfer.effectAllowed = "move", I.dataTransfer.setData("text/plain", W);
  }, j = (W) => {
    W.preventDefault(), W.dataTransfer.dropEffect = "move";
  }, te = (W) => (I) => {
    I.preventDefault();
    const V = I.dataTransfer.getData("text/plain") || O;
    V && i && i(V, W), T(null);
  };
  return /* @__PURE__ */ e(
    "div",
    {
      id: x,
      "data-testid": A,
      className: ["avakio-portlet", o].filter(Boolean).join(" "),
      style: l,
      "data-admin-theme": y,
      children: /* @__PURE__ */ e("div", { className: "avakio-portlet-grid", children: a.map((W) => /* @__PURE__ */ g(
        "div",
        {
          className: "avakio-portlet-column",
          onDragOver: j,
          onDrop: te(W.id),
          "data-column-id": W.id,
          "data-testid": `portlet-column-${W.id}`,
          children: [
            /* @__PURE__ */ e("div", { className: "avakio-portlet-column-header", children: W.title }),
            /* @__PURE__ */ g("div", { className: "avakio-portlet-column-body", children: [
              v[W.id]?.map((I) => {
                const V = O === I.id;
                return /* @__PURE__ */ g(
                  "div",
                  {
                    className: "avakio-portlet-item" + (V ? " avakio-portlet-item-dragging" : ""),
                    draggable: !0,
                    onDragStart: D(I.id),
                    onDragEnd: () => T(null),
                    "data-testid": `portlet-item-${I.id}`,
                    children: [
                      /* @__PURE__ */ e("div", { className: "avakio-portlet-item-title", children: I.title }),
                      /* @__PURE__ */ e("div", { className: "avakio-portlet-item-content", children: I.content })
                    ]
                  },
                  I.id
                );
              }),
              (!v[W.id] || v[W.id].length === 0) && /* @__PURE__ */ e("div", { className: "avakio-portlet-empty", children: "Drop items here" })
            ] })
          ]
        },
        W.id
      )) })
    }
  );
}
const Gt = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xt = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (n, i, o) => o ? o.toUpperCase() : i.toLowerCase()
), $t = (a) => {
  const n = Xt(a);
  return n.charAt(0).toUpperCase() + n.slice(1);
}, Rt = (...a) => a.filter((n, i, o) => !!n && n.trim() !== "" && o.indexOf(n) === i).join(" ").trim(), Jt = (a) => {
  for (const n in a)
    if (n.startsWith("aria-") || n === "role" || n === "title")
      return !0;
};
var Zt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Qt = He(
  ({
    color: a = "currentColor",
    size: n = 24,
    strokeWidth: i = 2,
    absoluteStrokeWidth: o,
    className: l = "",
    children: y,
    iconNode: x,
    ...A
  }, O) => wt(
    "svg",
    {
      ref: O,
      ...Zt,
      width: n,
      height: n,
      stroke: a,
      strokeWidth: o ? Number(i) * 24 / Number(n) : i,
      className: Rt("lucide", l),
      ...!y && !Jt(A) && { "aria-hidden": "true" },
      ...A
    },
    [
      ...x.map(([T, v]) => wt(T, v)),
      ...Array.isArray(y) ? y : [y]
    ]
  )
);
const Fe = (a, n) => {
  const i = He(
    ({ className: o, ...l }, y) => wt(Qt, {
      ref: y,
      iconNode: n,
      className: Rt(
        `lucide-${Gt($t(a))}`,
        `lucide-${a}`,
        o
      ),
      ...l
    })
  );
  return i.displayName = $t(a), i;
};
const ea = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], Ot = Fe("calendar", ea);
const ta = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], pt = Fe("check", ta);
const aa = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], tt = Fe("chevron-down", aa);
const na = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Ze = Fe("chevron-left", na);
const sa = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Ge = Fe("chevron-right", sa);
const ra = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], ia = Fe("chevron-up", ra);
const oa = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], la = Fe("chevrons-left", oa);
const ca = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], da = Fe("chevrons-right", ca);
const ua = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], ha = Fe("chevrons-up-down", ua);
const fa = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], va = Fe("clock", fa);
const ma = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], Ct = Fe("copy", ma);
const pa = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
], ka = Fe("ellipsis-vertical", pa);
const ga = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], ba = Fe("eye-off", ga);
const ya = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], xa = Fe("eye", ya);
const wa = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
], Na = Fe("file", wa);
const $a = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
], Ca = Fe("folder-open", $a);
const Sa = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
], Da = Fe("folder", Sa);
const Aa = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
], Ma = Fe("grip-vertical", Aa);
const _a = [["path", { d: "M5 12h14", key: "1ays0h" }]], zt = Fe("minus", _a);
const Ia = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], Ea = Fe("pen", Ia);
const Va = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Pt = Fe("plus", Va);
const La = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], it = Fe("search", La);
const Ta = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], Ra = Fe("send", Ta);
const Oa = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], za = Fe("trash-2", Oa);
const Pa = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Je = Fe("x", Pa), kt = ({ children: a, className: n, ...i }) => /* @__PURE__ */ e("button", { className: n, ...i, children: a }), St = ({ className: a, ...n }) => /* @__PURE__ */ e("input", { className: a, ...n }), Ft = ({ children: a }) => /* @__PURE__ */ e("div", { className: "relative", children: a }), Bt = ({ children: a }) => /* @__PURE__ */ e("div", { children: a }), Ht = ({ className: a, children: n }) => /* @__PURE__ */ e("div", { className: `absolute z-50 w-72 rounded-md border bg-white p-4 shadow-md ${a || ""}`, children: n });
function Ye(...a) {
  return a.filter(Boolean).join(" ");
}
const Fa = (a, n) => {
  if (!a) return "—";
  const i = new Date(a);
  return Number.isNaN(i.getTime()) ? a : n ? i.toLocaleString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : i.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
};
function Dt({
  value: a,
  onChange: n,
  className: i,
  showTime: o = !0
}) {
  const l = a ? new Date(a) : null, [y, x] = q(l || /* @__PURE__ */ new Date()), A = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ], O = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"], { year: T, month: v } = Ie(() => ({
    year: y.getFullYear(),
    month: y.getMonth()
  }), [y]), D = Ie(() => {
    const _ = new Date(T, v, 1), h = new Date(T, v + 1, 0), ae = _.getDay(), $ = h.getDate(), z = new Date(T, v, 0).getDate(), S = [];
    for (let t = ae - 1; t >= 0; t--)
      S.push({
        day: z - t,
        isCurrentMonth: !1,
        date: new Date(T, v - 1, z - t)
      });
    for (let t = 1; t <= $; t++)
      S.push({
        day: t,
        isCurrentMonth: !0,
        date: new Date(T, v, t)
      });
    const L = 42 - S.length;
    for (let t = 1; t <= L; t++)
      S.push({
        day: t,
        isCurrentMonth: !1,
        date: new Date(T, v + 1, t)
      });
    return S;
  }, [T, v]), j = () => {
    x(new Date(T, v - 1, 1));
  }, te = () => {
    x(new Date(T, v + 1, 1));
  }, W = (_) => {
    const h = new Date(_);
    if (o)
      l ? (h.setHours(l.getHours()), h.setMinutes(l.getMinutes())) : (h.setHours(0), h.setMinutes(0)), h.setSeconds(0), h.setMilliseconds(0), n(h.toISOString());
    else {
      const ae = h.getFullYear(), $ = String(h.getMonth() + 1).padStart(2, "0"), z = String(h.getDate()).padStart(2, "0");
      n(`${ae}-${$}-${z}`);
    }
  }, I = (_, h) => {
    const ae = l ? new Date(l) : /* @__PURE__ */ new Date();
    ae.setHours(_), ae.setMinutes(h), ae.setSeconds(0), ae.setMilliseconds(0), n(ae.toISOString());
  }, V = () => {
    const _ = /* @__PURE__ */ new Date();
    _.setSeconds(0), _.setMilliseconds(0), n(_.toISOString()), x(_);
  }, J = () => {
    n("");
  }, H = (_) => l ? _.getDate() === l.getDate() && _.getMonth() === l.getMonth() && _.getFullYear() === l.getFullYear() : !1, K = (_) => {
    const h = /* @__PURE__ */ new Date();
    return _.getDate() === h.getDate() && _.getMonth() === h.getMonth() && _.getFullYear() === h.getFullYear();
  };
  return /* @__PURE__ */ g("div", { className: Ye("avakio-datepicker-container", i), children: [
    /* @__PURE__ */ g("div", { className: "avakio-dp-nav", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: j,
          className: "avakio-dp-nav-btn",
          children: /* @__PURE__ */ e(Ze, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ g("div", { className: "avakio-dp-nav-label", children: [
        A[v],
        " ",
        T
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: te,
          className: "avakio-dp-nav-btn",
          children: /* @__PURE__ */ e(Ge, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "avakio-dp-weekdays", children: O.map((_) => /* @__PURE__ */ e("div", { className: "avakio-dp-weekday", children: _ }, _)) }),
    /* @__PURE__ */ e("div", { className: "avakio-dp-days", children: D.map((_, h) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => W(_.date),
        className: Ye(
          "avakio-dp-day",
          !_.isCurrentMonth && "avakio-dp-day-outside",
          H(_.date) && "avakio-dp-day-selected",
          K(_.date) && !H(_.date) && "avakio-dp-day-today"
        ),
        children: _.day
      },
      h
    )) }),
    o && /* @__PURE__ */ g("div", { className: "avakio-dp-time", children: [
      /* @__PURE__ */ g("div", { className: "avakio-dp-time-header", children: [
        /* @__PURE__ */ e(va, { className: "h-4 w-4" }),
        /* @__PURE__ */ e("span", { className: "avakio-dp-time-display", children: l ? (() => {
          const _ = l.getHours(), h = l.getMinutes(), ae = _ >= 12 ? "PM" : "AM";
          return `${(_ % 12 || 12).toString().padStart(2, "0")}:${h.toString().padStart(2, "0")} ${ae}`;
        })() : "00:00 AM" })
      ] }),
      /* @__PURE__ */ g("div", { className: "avakio-dp-time-inputs", children: [
        /* @__PURE__ */ e(
          St,
          {
            type: "number",
            min: "0",
            max: "23",
            placeholder: "00",
            value: l ? l.getHours().toString().padStart(2, "0") : "",
            onChange: (_) => {
              if (!_.target.value) return;
              const h = Math.max(0, Math.min(23, parseInt(_.target.value) || 0)), ae = l ? l.getMinutes() : 0;
              I(h, ae);
            },
            className: "avakio-dp-time-input",
            disabled: !l
          }
        ),
        /* @__PURE__ */ e("span", { className: "avakio-dp-time-separator", children: ":" }),
        /* @__PURE__ */ e(
          St,
          {
            type: "number",
            min: "0",
            max: "59",
            placeholder: "00",
            value: l ? l.getMinutes().toString().padStart(2, "0") : "",
            onChange: (_) => {
              if (!_.target.value) return;
              const h = Math.max(0, Math.min(59, parseInt(_.target.value) || 0)), ae = l ? l.getHours() : 0;
              I(ae, h);
            },
            className: "avakio-dp-time-input",
            disabled: !l
          }
        )
      ] }),
      !l && /* @__PURE__ */ e("p", { className: "avakio-dp-hint", children: "Select a date first" })
    ] }),
    /* @__PURE__ */ g("div", { className: "avakio-dp-actions", children: [
      /* @__PURE__ */ e(
        kt,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: V,
          className: "avakio-dp-action-btn",
          children: "Today"
        }
      ),
      /* @__PURE__ */ e(
        kt,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: J,
          className: "avakio-dp-action-btn",
          children: "Clear"
        }
      )
    ] })
  ] });
}
function gt({
  value: a,
  onChange: n,
  className: i,
  showTime: o = !0,
  id: l,
  testId: y,
  label: x = "Date",
  placeholder: A = "Select date",
  inline: O = !1
}) {
  const [T, v] = q(!1), D = Ce(null), [j, te] = q(null);
  be(() => {
    const I = D.current;
    if (!I) return;
    const V = I.closest("[data-admin-theme]");
    if (te(V?.getAttribute("data-admin-theme") ?? null), !V) return;
    const J = new MutationObserver(() => {
      te(V.getAttribute("data-admin-theme") ?? null);
    });
    return J.observe(V, { attributes: !0, attributeFilter: ["data-admin-theme"] }), () => J.disconnect();
  }, []);
  const W = Fa(a, o);
  return O ? /* @__PURE__ */ e(
    "div",
    {
      ref: D,
      id: l,
      "data-testid": y,
      className: Ye("avakio-dp-inline", i),
      "data-admin-theme": j || void 0,
      children: /* @__PURE__ */ e(
        Dt,
        {
          value: a,
          onChange: n,
          showTime: o
        }
      )
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      ref: D,
      id: l,
      "data-testid": y,
      className: Ye("avakio-dp", i),
      "data-admin-theme": j || void 0,
      children: /* @__PURE__ */ g(Ft, { open: T, onOpenChange: v, children: [
        /* @__PURE__ */ e(Bt, { asChild: !0, children: /* @__PURE__ */ g("button", { type: "button", className: "avakio-dp-trigger", children: [
          /* @__PURE__ */ g("div", { className: "avakio-dp-trigger-label", children: [
            /* @__PURE__ */ e(Ot, { size: 16 }),
            /* @__PURE__ */ e("span", { children: x })
          ] }),
          /* @__PURE__ */ e("div", { className: "avakio-dp-trigger-value", children: a ? W : /* @__PURE__ */ e("span", { className: "avakio-dp-placeholder", children: A }) })
        ] }) }),
        /* @__PURE__ */ g(
          Ht,
          {
            className: "avakio-dp-popover",
            align: "start",
            "data-admin-theme": j || void 0,
            children: [
              /* @__PURE__ */ e(
                Dt,
                {
                  value: a,
                  onChange: (I) => {
                    n(I), !o && I && v(!1);
                  },
                  showTime: o
                }
              ),
              /* @__PURE__ */ g("div", { className: "avakio-dp-footer", children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-dp-footer-action",
                    onClick: () => {
                      n(""), v(!1);
                    },
                    children: "Clear"
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-dp-footer-action avakio-dp-footer-action-primary",
                    onClick: () => v(!1),
                    children: "Done"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function Ba({
  id: a,
  name: n,
  value: i,
  checked: o,
  defaultChecked: l,
  indeterminate: y = !1,
  label: x,
  description: A,
  size: O = "md",
  disabled: T = !1,
  error: v,
  required: D = !1,
  className: j = "",
  onChange: te,
  padding: W,
  margin: I,
  testId: V,
  ...J
}) {
  const H = o !== void 0, [K, _] = q(l ?? !1), h = Ce(null), ae = H ? !!o : K;
  be(() => {
    h.current && (h.current.indeterminate = y && !ae);
  }, [y, ae]);
  const $ = Ie(() => y && !ae ? "indeterminate" : ae ? "checked" : "unchecked", [y, ae]), z = () => {
    if (T) return;
    H || _((he) => y ? !0 : !he), te?.(y ? !0 : !ae);
  }, S = (F) => {
    (F.key === " " || F.key === "Enter") && (F.preventDefault(), z());
  }, L = (F) => {
    F.preventDefault(), F.stopPropagation(), z();
  }, t = W ? typeof W == "number" ? `${W}px` : Array.isArray(W) ? `${W[0]}px ${W[1]}px ${W[2]}px ${W[3]}px` : W : void 0, P = I ? typeof I == "number" ? `${I}px` : Array.isArray(I) ? `${I[0]}px ${I[1]}px ${I[2]}px ${I[3]}px` : I : void 0, w = {
    ...t && { padding: t },
    ...P && { margin: P }
  };
  return /* @__PURE__ */ g(
    "label",
    {
      "data-testid": V,
      className: [
        "avakio-checkbox",
        `avakio-checkbox-${O}`,
        T ? "avakio-checkbox-disabled" : "",
        v ? "avakio-checkbox-error" : "",
        j
      ].filter(Boolean).join(" "),
      htmlFor: a,
      "data-status": $,
      style: w,
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            className: "avakio-checkbox-box",
            role: "checkbox",
            tabIndex: T ? -1 : 0,
            "aria-checked": $ === "indeterminate" ? "mixed" : ae,
            "aria-disabled": T,
            "aria-invalid": !!v,
            onKeyDown: S,
            onClick: z,
            children: [
              /* @__PURE__ */ e(
                "input",
                {
                  ref: h,
                  id: a,
                  name: n,
                  value: i,
                  type: "checkbox",
                  checked: ae,
                  onChange: () => {
                  },
                  disabled: T,
                  tabIndex: -1,
                  ...J
                }
              ),
              /* @__PURE__ */ e("span", { className: "avakio-checkbox-mark", onClick: L })
            ]
          }
        ),
        (x || A || v) && /* @__PURE__ */ g("div", { className: "avakio-checkbox-text", children: [
          /* @__PURE__ */ g("div", { className: "avakio-checkbox-label-row", children: [
            x && /* @__PURE__ */ e("span", { className: "avakio-checkbox-label", children: x }),
            D && /* @__PURE__ */ e("span", { className: "avakio-checkbox-required", children: "*" })
          ] }),
          A && /* @__PURE__ */ e("div", { className: "avakio-checkbox-description", children: A }),
          v && /* @__PURE__ */ e("div", { className: "avakio-checkbox-error-text", children: v })
        ] })
      ]
    }
  );
}
function Ha({
  label: a,
  icon: n,
  iconRight: i,
  variant: o = "primary",
  size: l = "md",
  block: y = !1,
  loading: x = !1,
  badge: A,
  disabled: O,
  className: T = "",
  children: v,
  autowidth: D = !1,
  tooltip: j,
  buttonType: te = "default",
  align: W = "center",
  image: I,
  hotkey: V,
  popup: J,
  value: H,
  name: K,
  id: _,
  testId: h,
  theme: ae,
  onClick: $,
  ...z
}) {
  const S = O || x, L = Ce(null);
  Pe.useEffect(() => {
    if (!V) return;
    const P = (w) => {
      const F = V.toLowerCase().split("+"), he = F.includes("ctrl") || F.includes("control"), le = F.includes("shift"), d = F.includes("alt"), f = F[F.length - 1];
      he === (w.ctrlKey || w.metaKey) && le === w.shiftKey && d === w.altKey && w.key.toLowerCase() === f && (w.preventDefault(), L.current?.click());
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [V]);
  const t = te === "icon" || te === "iconButton" ? "icon" : te === "iconTop" ? "icon-top" : "default";
  return /* @__PURE__ */ g(
    "button",
    {
      ref: L,
      id: _,
      "data-testid": h,
      "data-admin-theme": ae,
      className: [
        "avakio-button",
        `avakio-button-${o}`,
        `avakio-button-${l}`,
        `avakio-button-type-${t}`,
        `avakio-button-align-${W}`,
        y ? "avakio-button-block" : "",
        D ? "avakio-button-autowidth" : "",
        x ? "avakio-button-loading" : "",
        I ? "avakio-button-image" : "",
        T
      ].filter(Boolean).join(" "),
      disabled: S,
      title: j,
      value: H,
      name: K,
      onClick: $,
      ...z,
      children: [
        /* @__PURE__ */ g("span", { className: "avakio-button-inner", children: [
          x && /* @__PURE__ */ e("span", { className: "avakio-button-spinner", "aria-hidden": !0 }),
          I && /* @__PURE__ */ e("img", { src: I, alt: "", className: "avakio-button-image-el" }),
          n && /* @__PURE__ */ e("span", { className: "avakio-button-icon-left", children: n }),
          (v || a) && /* @__PURE__ */ e("span", { className: "avakio-button-label", children: v ?? a }),
          A !== void 0 && /* @__PURE__ */ e("span", { className: "avakio-button-badge", children: A }),
          i && /* @__PURE__ */ e("span", { className: "avakio-button-icon-right", children: i }),
          V && /* @__PURE__ */ e("span", { className: "avakio-button-hotkey", children: V })
        ] }),
        J && typeof J == "string" && /* @__PURE__ */ e("div", { className: "avakio-button-popup-ref", "data-popup": J })
      ]
    }
  );
}
const lt = (a) => {
  if (!a) return "";
  const n = a.trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(n))
    return n.startsWith("#") ? n : `#${n}`;
  if (/^#?[0-9a-fA-F]{3}$/.test(n)) {
    const i = n.replace("#", "");
    return `#${i[0]}${i[0]}${i[1]}${i[1]}${i[2]}${i[2]}`;
  }
  return "";
};
function ja({
  id: a,
  value: n,
  defaultValue: i = "#1ca1c1",
  onChange: o,
  label: l,
  description: y,
  error: x,
  disabled: A = !1,
  readOnly: O = !1,
  required: T = !1,
  presets: v = [],
  allowCustomInput: D = !0,
  showPreview: j = !0,
  className: te = "",
  testId: W
}) {
  const I = n !== void 0, [V, J] = q(lt(i) || "#1ca1c1"), H = Ce(null), K = I ? lt(n || "") || "#1ca1c1" : V;
  be(() => {
    !I && !V && J("#1ca1c1");
  }, [I, V]);
  const _ = Ie(() => v.length ? v : [
    { label: "Cyan", value: "#1ca1c1" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Indigo", value: "#6366f1" },
    { label: "Violet", value: "#8b5cf6" },
    { label: "Emerald", value: "#10b981" },
    { label: "Amber", value: "#f59e0b" },
    { label: "Orange", value: "#f57c00" },
    { label: "Red", value: "#ef4444" },
    { label: "Gray", value: "#9ca3af" },
    { label: "Dark", value: "#111827" }
  ], [v]), h = (z) => {
    const S = lt(z);
    S && (I || J(S), o?.(S));
  }, ae = (z) => {
    const S = z.target.value, L = lt(S);
    I || J(S), L && o?.(L);
  }, $ = (z) => {
    const S = z.target.value;
    h(S);
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": W,
      className: [
        "avakio-colorpicker",
        A ? "avakio-colorpicker-disabled" : "",
        x ? "avakio-colorpicker-error" : "",
        te
      ].filter(Boolean).join(" "),
      "data-color": K,
      children: [
        (l || y || x) && /* @__PURE__ */ g("div", { className: "avakio-colorpicker-header", children: [
          /* @__PURE__ */ g("div", { className: "avakio-colorpicker-label-row", children: [
            l && /* @__PURE__ */ e("span", { className: "avakio-colorpicker-label", children: l }),
            T && /* @__PURE__ */ e("span", { className: "avakio-colorpicker-required", children: "*" })
          ] }),
          y && /* @__PURE__ */ e("div", { className: "avakio-colorpicker-description", children: y }),
          x && /* @__PURE__ */ e("div", { className: "avakio-colorpicker-error-text", children: x })
        ] }),
        /* @__PURE__ */ g("div", { className: "avakio-colorpicker-body", children: [
          j && /* @__PURE__ */ e("div", { className: "avakio-colorpicker-preview", style: { backgroundColor: K }, "aria-label": "Color preview" }),
          /* @__PURE__ */ g("div", { className: "avakio-colorpicker-controls", children: [
            /* @__PURE__ */ e(
              "input",
              {
                ref: H,
                type: "color",
                className: "avakio-colorpicker-native",
                value: K,
                onChange: $,
                disabled: A || O,
                "aria-label": "Pick color"
              }
            ),
            D && /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                className: "avakio-colorpicker-hex",
                value: K,
                onChange: ae,
                disabled: A || O,
                maxLength: 7,
                "aria-label": "Hex value"
              }
            )
          ] })
        ] }),
        _.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-colorpicker-swatches", "aria-label": "Color presets", children: _.map((z) => /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            className: "avakio-colorpicker-swatch",
            style: { backgroundColor: z.value },
            onClick: () => h(z.value),
            disabled: A || O,
            "aria-label": z.label || z.value,
            children: [
              /* @__PURE__ */ e("span", { className: "avakio-colorpicker-swatch-inner" }),
              K.toLowerCase() === z.value.toLowerCase() && /* @__PURE__ */ e("span", { className: "avakio-colorpicker-swatch-active" })
            ]
          },
          z.value
        )) })
      ]
    }
  );
}
function Wa({
  id: a,
  value: n,
  options: i = [],
  onChange: o,
  onInputChange: l,
  placeholder: y = "Select or type...",
  label: x,
  labelAlign: A = "left",
  labelWidth: O = 100,
  disabled: T = !1,
  readonly: v = !1,
  filterMode: D = "contains",
  customFilter: j,
  template: te,
  width: W,
  maxHeight: I = 300,
  required: V = !1,
  error: J,
  className: H = "",
  testId: K
}) {
  const [_, h] = q(!1), [ae, $] = q(""), [z, S] = q(-1), [L, t] = q(null), P = Ce(null), w = Ce(null), F = Ce(null), he = i.map((p) => typeof p == "string" ? { id: p, value: p } : p);
  be(() => {
    if (n != null && n !== "") {
      const p = he.find(
        (U) => U.id === n || U.value === n
      );
      p && (t(p), $(p.value));
    } else
      t(null), $("");
  }, [n]);
  const le = he.filter((p) => {
    if (!ae) return !0;
    if (j)
      return j(p, ae);
    const U = ae.toLowerCase(), ue = p.value.toLowerCase();
    return D === "startsWith" ? ue.startsWith(U) : ue.includes(U);
  }), d = (p) => {
    const U = p.target.value;
    $(U), h(!0), S(-1), l?.(U);
  }, f = (p) => {
    t(p), $(p.value), h(!1), S(-1), o?.(p.id, p);
  }, k = (p) => {
    p.stopPropagation(), t(null), $(""), h(!1), o?.("", void 0), P.current?.focus();
  }, E = (p) => {
    if (!(T || v))
      switch (p.key) {
        case "ArrowDown":
          p.preventDefault(), _ ? S(
            (U) => U < le.length - 1 ? U + 1 : U
          ) : h(!0);
          break;
        case "ArrowUp":
          p.preventDefault(), _ && S((U) => U > 0 ? U - 1 : -1);
          break;
        case "Enter":
          p.preventDefault(), _ && z >= 0 && le[z] && f(le[z]);
          break;
        case "Escape":
          p.preventDefault(), h(!1), S(-1);
          break;
        case "Tab":
          h(!1);
          break;
      }
  };
  be(() => {
    if (z >= 0 && w.current) {
      const p = w.current.children[z];
      p && p.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [z]), be(() => {
    const p = (U) => {
      F.current && !F.current.contains(U.target) && (h(!1), S(-1));
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, []);
  const Z = (p) => te ? te(p) : p.value;
  return /* @__PURE__ */ g(
    "div",
    {
      ref: F,
      "data-testid": K,
      className: `avakio-combo-wrapper ${H}`,
      style: { width: W || "100%" },
      children: [
        x && /* @__PURE__ */ g(
          "label",
          {
            htmlFor: a,
            className: `avakio-combo-label avakio-combo-label-${A}`,
            style: { width: O },
            children: [
              x,
              V && /* @__PURE__ */ e("span", { className: "avakio-combo-required", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ g("div", { className: "avakio-combo-container", children: [
          /* @__PURE__ */ g(
            "div",
            {
              className: `avakio-combo-input-wrapper ${_ ? "open" : ""} ${J ? "error" : ""} ${T ? "disabled" : ""}`,
              children: [
                /* @__PURE__ */ e(it, { className: "avakio-combo-search-icon", size: 16 }),
                /* @__PURE__ */ e(
                  "input",
                  {
                    ref: P,
                    id: a,
                    type: "text",
                    className: "avakio-combo-input",
                    value: ae,
                    onChange: d,
                    onKeyDown: E,
                    onFocus: () => !v && h(!0),
                    placeholder: y,
                    disabled: T,
                    readOnly: v,
                    required: V
                  }
                ),
                ae && !T && !v && /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-combo-clear-btn",
                    onClick: k,
                    tabIndex: -1,
                    children: /* @__PURE__ */ e(Je, { size: 16 })
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-combo-toggle-btn",
                    onClick: () => !T && !v && h(!_),
                    disabled: T,
                    tabIndex: -1,
                    children: /* @__PURE__ */ e(tt, { size: 16, className: _ ? "rotate" : "" })
                  }
                )
              ]
            }
          ),
          _ && !T && !v && /* @__PURE__ */ e(
            "div",
            {
              className: "avakio-combo-dropdown",
              style: { maxHeight: I },
              children: /* @__PURE__ */ e("div", { ref: w, className: "avakio-combo-options", children: le.length > 0 ? le.map((p, U) => /* @__PURE__ */ e(
                "div",
                {
                  className: `avakio-combo-option ${z === U ? "highlighted" : ""} ${L?.id === p.id ? "selected" : ""}`,
                  onClick: () => f(p),
                  onMouseEnter: () => S(U),
                  children: Z(p)
                },
                p.id
              )) : /* @__PURE__ */ e("div", { className: "avakio-combo-no-options", children: "No options found" }) })
            }
          ),
          J && /* @__PURE__ */ e("div", { className: "avakio-combo-error-message", children: J })
        ] })
      ]
    }
  );
}
function Ka({
  id: a,
  value: n,
  defaultValue: i = 0,
  step: o = 1,
  min: l,
  max: y,
  label: x,
  labelPosition: A = "top",
  labelWidth: O = 100,
  description: T,
  error: v,
  required: D = !1,
  disabled: j = !1,
  readOnly: te = !1,
  size: W = "md",
  allowInput: I = !0,
  onChange: V,
  className: J = "",
  padding: H,
  margin: K,
  testId: _
}) {
  const h = n !== void 0, [ae, $] = q(n ?? i);
  be(() => {
    h && n !== void 0 && $(n);
  }, [h, n]);
  const z = (k) => {
    let E = k;
    return l !== void 0 && (E = Math.max(E, l)), y !== void 0 && (E = Math.min(E, y)), E;
  }, S = z(ae), L = (k) => {
    h || $(k), V?.(k);
  }, t = (k) => {
    if (j || te) return;
    const E = z(S + k * o);
    L(E);
  }, P = (k) => {
    if (j || te) return;
    const E = k.target.value;
    if (E === "") {
      h || $(NaN);
      return;
    }
    const Z = Number(E);
    Number.isNaN(Z) || L(z(Z));
  }, w = Number.isNaN(S) ? "" : S, F = l === void 0 || w === "" ? !0 : w > l, he = y === void 0 || w === "" ? !0 : w < y, le = H ? typeof H == "number" ? `${H}px` : Array.isArray(H) ? `${H[0]}px ${H[1]}px ${H[2]}px ${H[3]}px` : H : void 0, d = K ? typeof K == "number" ? `${K}px` : Array.isArray(K) ? `${K[0]}px ${K[1]}px ${K[2]}px ${K[3]}px` : K : void 0, f = {
    ...le && { padding: le },
    ...d && { margin: d }
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": _,
      className: [
        "avakio-counter",
        `avakio-counter-${W}`,
        `avakio-counter-label-${A}`,
        j ? "avakio-counter-disabled" : "",
        v ? "avakio-counter-error" : "",
        J
      ].filter(Boolean).join(" "),
      style: f,
      children: [
        (x || T || v) && A === "top" && /* @__PURE__ */ g("div", { className: "avakio-counter-header", children: [
          /* @__PURE__ */ g("div", { className: "avakio-counter-label-row", children: [
            x && /* @__PURE__ */ e("span", { className: "avakio-counter-label", children: x }),
            D && /* @__PURE__ */ e("span", { className: "avakio-counter-required", children: "*" })
          ] }),
          T && /* @__PURE__ */ e("div", { className: "avakio-counter-description", children: T }),
          v && /* @__PURE__ */ e("div", { className: "avakio-counter-error-text", children: v })
        ] }),
        /* @__PURE__ */ g("div", { className: "avakio-counter-content", children: [
          x && A === "left" && /* @__PURE__ */ g("div", { className: "avakio-counter-label-left", style: { width: O }, children: [
            /* @__PURE__ */ e("span", { className: "avakio-counter-label", children: x }),
            D && /* @__PURE__ */ e("span", { className: "avakio-counter-required", children: "*" })
          ] }),
          /* @__PURE__ */ g("div", { className: "avakio-counter-body", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "avakio-counter-btn",
                onClick: () => t(-1),
                disabled: j || te || !F,
                "aria-label": "Decrease",
                children: /* @__PURE__ */ e(zt, { size: 16 })
              }
            ),
            /* @__PURE__ */ e(
              "input",
              {
                id: a,
                type: "number",
                className: "avakio-counter-input",
                value: w,
                onChange: P,
                disabled: j || te || !I,
                readOnly: !I,
                min: l,
                max: y,
                step: o,
                "aria-live": "polite"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "avakio-counter-btn",
                onClick: () => t(1),
                disabled: j || te || !he,
                "aria-label": "Increase",
                children: /* @__PURE__ */ e(Pt, { size: 16 })
              }
            )
          ] }),
          A === "left" && (T || v) && /* @__PURE__ */ g("div", { className: "avakio-counter-footer", children: [
            T && /* @__PURE__ */ e("div", { className: "avakio-counter-description", children: T }),
            v && /* @__PURE__ */ e("div", { className: "avakio-counter-error-text", children: v })
          ] })
        ] })
      ]
    }
  );
}
const At = (a) => {
  if (!a) return "—";
  const n = new Date(a);
  return Number.isNaN(n.getTime()) ? a : n.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
}, Mt = (a, n) => {
  if (!a.start || !a.end) return a;
  const i = new Date(a.start), o = new Date(a.end);
  return i.getTime() > o.getTime() ? { start: a.end, end: a.start } : !n && i.getTime() === o.getTime() ? { start: a.start, end: null } : a;
};
function qa({
  value: a,
  defaultValue: n,
  onChange: i,
  presets: o,
  allowSingleDay: l = !0,
  showTime: y = !1,
  className: x,
  id: A,
  testId: O
}) {
  const T = a !== void 0, [v, D] = q(
    a || n || { start: null, end: null }
  ), [j, te] = q(!1), W = Ce(null), [I, V] = q(null);
  be(() => {
    const $ = W.current;
    if (!$) return;
    const z = $.closest("[data-admin-theme]");
    if (V(z?.getAttribute("data-admin-theme") ?? null), !z) return;
    const S = new MutationObserver(() => {
      V(z.getAttribute("data-admin-theme") ?? null);
    });
    return S.observe(z, { attributes: !0, attributeFilter: ["data-admin-theme"] }), () => S.disconnect();
  }, []);
  const J = Ie(
    () => Mt(T ? a : v, l),
    [T, a, v, l]
  ), H = ($) => {
    const z = Mt($, l);
    T || D(z), i?.(z);
  }, K = o || [
    {
      label: "Today",
      range: () => {
        const z = (/* @__PURE__ */ new Date()).toISOString();
        return { start: z, end: z };
      }
    },
    {
      label: "Last 7 days",
      range: () => {
        const $ = /* @__PURE__ */ new Date(), z = /* @__PURE__ */ new Date();
        return z.setDate($.getDate() - 6), { start: z.toISOString(), end: $.toISOString() };
      }
    },
    {
      label: "This month",
      range: () => {
        const $ = /* @__PURE__ */ new Date(), z = new Date($.getFullYear(), $.getMonth(), 1), S = new Date($.getFullYear(), $.getMonth() + 1, 0);
        return { start: z.toISOString(), end: S.toISOString() };
      }
    },
    {
      label: "Clear",
      range: () => ({ start: null, end: null })
    }
  ], _ = ($) => {
    H({ start: $, end: J?.end ?? null });
  }, h = ($) => {
    H({ start: J?.start ?? null, end: $ });
  }, ae = `${At(J?.start)} → ${At(J?.end)}`;
  return /* @__PURE__ */ e(
    "div",
    {
      ref: W,
      id: A,
      "data-testid": O,
      className: ["avakio-drp", x || ""].join(" "),
      "data-admin-theme": I || void 0,
      children: /* @__PURE__ */ g(Ft, { open: j, onOpenChange: te, children: [
        /* @__PURE__ */ e(Bt, { asChild: !0, children: /* @__PURE__ */ g("button", { type: "button", className: "avakio-drp-trigger", children: [
          /* @__PURE__ */ g("div", { className: "avakio-drp-trigger-label", children: [
            /* @__PURE__ */ e(Ot, { size: 16 }),
            /* @__PURE__ */ e("span", { children: "Date Range" })
          ] }),
          /* @__PURE__ */ e("div", { className: "avakio-drp-trigger-value", children: ae })
        ] }) }),
        /* @__PURE__ */ g(
          Ht,
          {
            className: "avakio-drp-popover",
            align: "center",
            "data-admin-theme": I || void 0,
            children: [
              /* @__PURE__ */ g("div", { className: "avakio-drp-panel", children: [
                /* @__PURE__ */ g("div", { className: "avakio-drp-col", children: [
                  /* @__PURE__ */ e("div", { className: "avakio-drp-col-header", children: "From" }),
                  /* @__PURE__ */ e("div", { "data-admin-theme": I || void 0, children: /* @__PURE__ */ e(gt, { value: J?.start || "", onChange: _, showTime: y, inline: !0 }) })
                ] }),
                /* @__PURE__ */ g("div", { className: "avakio-drp-col", children: [
                  /* @__PURE__ */ e("div", { className: "avakio-drp-col-header", children: "To" }),
                  /* @__PURE__ */ e("div", { "data-admin-theme": I || void 0, children: /* @__PURE__ */ e(gt, { value: J?.end || "", onChange: h, showTime: y, inline: !0 }) })
                ] })
              ] }),
              /* @__PURE__ */ e("div", { className: "avakio-drp-presets", children: K.map(($) => /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "avakio-drp-preset",
                  onClick: () => H($.range()),
                  children: $.label
                },
                $.label
              )) }),
              /* @__PURE__ */ g("div", { className: "avakio-drp-footer", children: [
                /* @__PURE__ */ e("button", { type: "button", className: "avakio-drp-action", onClick: () => H({ start: null, end: null }), children: "Clear" }),
                /* @__PURE__ */ e("button", { type: "button", className: "avakio-drp-action", onClick: () => te(!1), children: "Close" })
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function Ya({
  id: a,
  value: n,
  data: i = [],
  onChange: o,
  onInputChange: l,
  placeholder: y = "Select...",
  label: x,
  labelAlign: A = "left",
  labelWidth: O = 100,
  disabled: T = !1,
  readonly: v = !1,
  textValue: D,
  template: j,
  width: te,
  body: W = { autoConfig: !0, header: !0, borderless: !1 },
  required: I = !1,
  error: V,
  className: J = "",
  editable: H = !0,
  filterMode: K = "contains",
  testId: _
}) {
  const [h, ae] = q(!1), [$, z] = q(""), [S, L] = q(-1), [t, P] = q(null), w = Ce(null), F = Ce(null), he = Ce(null), le = W?.data || i, d = Pe.useMemo(() => {
    if (W?.columns)
      return W.columns;
    if (W?.autoConfig && le.length > 0) {
      const ne = le[0];
      return Object.keys(ne).filter((ie) => ie !== "id").map((ie) => ({
        id: ie,
        header: ie.charAt(0).toUpperCase() + ie.slice(1)
      }));
    }
    return [];
  }, [W?.columns, W?.autoConfig, le]), f = (ne) => {
    if (j) {
      const M = j(ne);
      return typeof M == "string" ? M : String(ne[d[0]?.id] || "");
    }
    if (D)
      return D.replace(/#(\w+)#/g, (M, m) => String(ne[m] || ""));
    const ie = d[0]?.id || Object.keys(ne).find((M) => M !== "id");
    return ie ? String(ne[ie]) : "";
  };
  be(() => {
    if (n != null && n !== "") {
      const ne = le.find((ie) => ie.id === n);
      ne && (P(ne), z(f(ne)));
    } else
      P(null), z("");
  }, [n, le]);
  const k = le.filter((ne) => {
    if (!H || !$) return !0;
    const ie = $.toLowerCase();
    return d.some((M) => {
      const m = String(ne[M.id] || "").toLowerCase();
      return K === "startsWith" ? m.startsWith(ie) : m.includes(ie);
    });
  });
  be(() => {
    const ne = (ie) => {
      he.current && !he.current.contains(ie.target) && (ae(!1), t && H && z(f(t)));
    };
    return h && document.addEventListener("mousedown", ne), () => {
      document.removeEventListener("mousedown", ne);
    };
  }, [h, t]), be(() => {
    const ne = (ie) => {
      if (h)
        switch (ie.key) {
          case "ArrowDown":
            ie.preventDefault(), L(
              (M) => M < k.length - 1 ? M + 1 : M
            );
            break;
          case "ArrowUp":
            ie.preventDefault(), L((M) => M > 0 ? M - 1 : 0);
            break;
          case "Enter":
            ie.preventDefault(), S >= 0 && S < k.length && E(k[S]);
            break;
          case "Escape":
            ie.preventDefault(), ae(!1), t && H && z(f(t));
            break;
        }
    };
    return h && document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [h, S, k, t]), be(() => {
    if (h && S >= 0 && F.current) {
      const ne = F.current.querySelector(
        `[data-row-index="${S}"]`
      );
      ne && ne.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [S, h]);
  const E = (ne) => {
    P(ne), z(f(ne)), ae(!1), L(-1), o?.(ne.id, ne);
  }, Z = (ne) => {
    const ie = ne.target.value;
    z(ie), l?.(ie), h || ae(!0), L(0);
  }, p = (ne) => {
    ne.stopPropagation(), P(null), z(""), o?.("", void 0), w.current?.focus();
  }, U = () => {
    !T && !v && (ae(!h), h || (L(0), w.current?.focus()));
  }, ue = W?.header !== !1, G = W?.borderless === !0, Y = W?.scroll === !0, ce = W?.yCount ? W.yCount * 40 : Y ? 300 : void 0;
  return /* @__PURE__ */ g(
    "div",
    {
      ref: he,
      "data-testid": _,
      className: `avakio-gridsuggest ${J}`,
      style: { width: te },
      "data-disabled": T,
      "data-readonly": v,
      "data-error": !!V,
      children: [
        x && /* @__PURE__ */ g(
          "label",
          {
            className: "avakio-gridsuggest-label",
            style: {
              width: A === "left" ? O : void 0,
              textAlign: A
            },
            children: [
              x,
              I && /* @__PURE__ */ e("span", { className: "avakio-gridsuggest-required", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ g("div", { className: "avakio-gridsuggest-wrapper", children: [
          /* @__PURE__ */ g("div", { className: "avakio-gridsuggest-input-wrapper", children: [
            /* @__PURE__ */ e(
              "input",
              {
                ref: w,
                type: "text",
                id: a,
                className: "avakio-gridsuggest-input",
                value: $,
                onChange: Z,
                onFocus: () => !T && !v && ae(!0),
                placeholder: y,
                disabled: T,
                readOnly: v || !H,
                "aria-haspopup": "grid",
                "aria-expanded": h,
                "aria-label": x || "Grid select input"
              }
            ),
            /* @__PURE__ */ g("div", { className: "avakio-gridsuggest-icons", children: [
              H && /* @__PURE__ */ e(it, { size: 16, className: "avakio-gridsuggest-search-icon" }),
              $ && !T && !v && /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "avakio-gridsuggest-clear",
                  onClick: p,
                  "aria-label": "Clear selection",
                  children: /* @__PURE__ */ e(Je, { size: 16 })
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  className: "avakio-gridsuggest-toggle",
                  onClick: U,
                  disabled: T,
                  "aria-label": "Toggle dropdown",
                  children: /* @__PURE__ */ e(tt, { size: 18, className: h ? "open" : "" })
                }
              )
            ] })
          ] }),
          h && /* @__PURE__ */ e(
            "div",
            {
              ref: F,
              className: `avakio-gridsuggest-dropdown ${G ? "borderless" : ""}`,
              style: { maxHeight: ce },
              role: "grid",
              children: k.length === 0 ? /* @__PURE__ */ e("div", { className: "avakio-gridsuggest-empty", children: "No data found" }) : /* @__PURE__ */ g("div", { className: "avakio-gridsuggest-table", children: [
                ue && /* @__PURE__ */ e("div", { className: "avakio-gridsuggest-header", children: d.map((ne) => /* @__PURE__ */ e(
                  "div",
                  {
                    className: "avakio-gridsuggest-header-cell",
                    style: { width: ne.width },
                    children: ne.header || ne.id
                  },
                  ne.id
                )) }),
                /* @__PURE__ */ e("div", { className: `avakio-gridsuggest-body ${Y ? "scrollable" : ""}`, children: k.map((ne, ie) => {
                  const M = t?.id === ne.id;
                  return /* @__PURE__ */ e(
                    "div",
                    {
                      "data-row-index": ie,
                      className: `avakio-gridsuggest-row ${M ? "selected" : ""} ${ie === S ? "highlighted" : ""}`,
                      onClick: () => E(ne),
                      role: "row",
                      "aria-selected": M,
                      children: d.map((r) => /* @__PURE__ */ e(
                        "div",
                        {
                          className: "avakio-gridsuggest-cell",
                          style: { width: r.width },
                          role: "gridcell",
                          children: r.template ? r.template(ne[r.id], ne) : ne[r.id]
                        },
                        r.id
                      ))
                    },
                    ne.id
                  );
                }) })
              ] })
            }
          )
        ] }),
        V && /* @__PURE__ */ e("div", { className: "avakio-gridsuggest-error", children: V })
      ]
    }
  );
}
function Ua({
  options: a,
  value: n = [],
  onChange: i,
  placeholder: o = "Select items...",
  className: l,
  showCount: y = !1,
  maxDisplayItems: x = 3,
  disabled: A = !1,
  id: O,
  testId: T
}) {
  const [v, D] = q(!1), [j, te] = q(""), W = Ce(null), I = Ce(null), V = Ie(() => {
    if (!j.trim()) return a;
    const L = j.toLowerCase();
    return a.filter(
      (t) => t.label.toLowerCase().includes(L) || t.value.toLowerCase().includes(L)
    );
  }, [a, j]), J = Ie(() => a.filter((L) => n.includes(L.value)), [a, n]);
  be(() => {
    const L = (t) => {
      W.current && !W.current.contains(t.target) && (D(!1), te(""));
    };
    return v && document.addEventListener("mousedown", L), () => {
      document.removeEventListener("mousedown", L);
    };
  }, [v]);
  const H = (L) => {
    n.includes(L) ? i(n.filter((t) => t !== L)) : i([...n, L]);
  }, K = (L, t) => {
    t.stopPropagation(), i(n.filter((P) => P !== L));
  }, _ = (L) => {
    L.stopPropagation(), i([]);
  }, h = () => {
    A || (D(!0), I.current?.focus());
  }, ae = (L) => {
    te(L.target.value), v || D(!0);
  }, $ = () => {
    if (V.length === 0) return;
    const L = V.map((P) => P.value);
    if (L.every((P) => n.includes(P)))
      i(n.filter((P) => !L.includes(P)));
    else {
      const P = Array.from(/* @__PURE__ */ new Set([...n, ...L]));
      i(P);
    }
  }, z = () => {
    if (J.length === 0)
      return /* @__PURE__ */ e("span", { className: "avakio-mc-placeholder", children: o });
    if (y)
      return /* @__PURE__ */ g("span", { className: "avakio-mc-count", children: [
        J.length,
        " ",
        J.length === 1 ? "item" : "items",
        " selected"
      ] });
    const L = J.slice(0, x), t = J.length - x;
    return /* @__PURE__ */ g("div", { className: "avakio-mc-chips", children: [
      L.map((P) => /* @__PURE__ */ g("span", { className: "avakio-mc-chip", children: [
        /* @__PURE__ */ e("span", { className: "avakio-mc-chip-label", children: P.label }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "avakio-mc-chip-remove",
            onClick: (w) => K(P.value, w),
            disabled: A,
            children: /* @__PURE__ */ e(Je, { className: "h-3 w-3" })
          }
        )
      ] }, P.value)),
      t > 0 && /* @__PURE__ */ g("span", { className: "avakio-mc-chip avakio-mc-chip-more", children: [
        "+",
        t,
        " more"
      ] })
    ] });
  }, S = V.length > 0 && V.every((L) => n.includes(L.value));
  return /* @__PURE__ */ g(
    "div",
    {
      ref: W,
      id: O,
      "data-testid": T,
      className: Ye("avakio-multicombo", A && "avakio-mc-disabled", l),
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            className: Ye(
              "avakio-mc-input-wrapper",
              v && "avakio-mc-input-wrapper-open"
            ),
            onClick: h,
            children: [
              /* @__PURE__ */ g("div", { className: "avakio-mc-input-content", children: [
                !v && z(),
                v && /* @__PURE__ */ e(
                  "input",
                  {
                    ref: I,
                    type: "text",
                    className: "avakio-mc-search-input",
                    value: j,
                    onChange: ae,
                    placeholder: J.length > 0 ? "Search..." : o,
                    disabled: A
                  }
                )
              ] }),
              /* @__PURE__ */ g("div", { className: "avakio-mc-actions", children: [
                n.length > 0 && !A && /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-mc-clear-btn",
                    onClick: _,
                    children: /* @__PURE__ */ e(Je, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-mc-toggle-btn",
                    onClick: (L) => {
                      L.stopPropagation(), A || (D(!v), v || I.current?.focus());
                    },
                    disabled: A,
                    children: /* @__PURE__ */ e(tt, { className: Ye("h-4 w-4", v && "avakio-mc-toggle-open") })
                  }
                )
              ] })
            ]
          }
        ),
        v && /* @__PURE__ */ g("div", { className: "avakio-mc-dropdown", children: [
          V.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-mc-select-all", children: /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              className: "avakio-mc-option",
              onClick: $,
              children: [
                /* @__PURE__ */ e("div", { className: Ye(
                  "avakio-mc-checkbox",
                  S && "avakio-mc-checkbox-checked"
                ), children: S && /* @__PURE__ */ e(pt, { className: "h-3 w-3" }) }),
                /* @__PURE__ */ e("span", { className: "avakio-mc-option-label avakio-mc-select-all-label", children: S ? "Deselect All" : "Select All" })
              ]
            }
          ) }),
          /* @__PURE__ */ e("div", { className: "avakio-mc-options", children: V.length > 0 ? V.map((L) => {
            const t = n.includes(L.value);
            return /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                className: "avakio-mc-option",
                onClick: () => H(L.value),
                children: [
                  /* @__PURE__ */ e("div", { className: Ye(
                    "avakio-mc-checkbox",
                    t && "avakio-mc-checkbox-checked"
                  ), children: t && /* @__PURE__ */ e(pt, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ e("span", { className: "avakio-mc-option-label", children: L.label })
                ]
              },
              L.value
            );
          }) : /* @__PURE__ */ e("div", { className: "avakio-mc-no-results", children: j ? "No matches found" : "No options available" }) }),
          n.length > 0 && /* @__PURE__ */ g("div", { className: "avakio-mc-footer", children: [
            n.length,
            " ",
            n.length === 1 ? "item" : "items",
            " selected"
          ] })
        ] })
      ]
    }
  );
}
function Ga({
  id: a,
  value: n,
  options: i = [],
  onChange: o,
  placeholder: l = "Select...",
  label: y,
  labelAlign: x = "left",
  labelWidth: A = 100,
  disabled: O = !1,
  readonly: T = !1,
  template: v,
  width: D,
  maxHeight: j = 300,
  yCount: te,
  required: W = !1,
  error: I,
  className: V = "",
  clearable: J = !0,
  padding: H,
  margin: K,
  testId: _
}) {
  const [h, ae] = q(!1), [$, z] = q(-1), [S, L] = q(null), t = Ce(null), P = Ce(null), w = Ce(null), F = i.map((E) => typeof E == "string" ? { id: E, value: E } : E);
  be(() => {
    if (n != null && n !== "") {
      const E = F.find(
        (Z) => Z.id === n || Z.value === n
      );
      E && L(E);
    } else
      L(null);
  }, [n]), be(() => {
    const E = (Z) => {
      t.current && !t.current.contains(Z.target) && ae(!1);
    };
    return h && document.addEventListener("mousedown", E), () => {
      document.removeEventListener("mousedown", E);
    };
  }, [h]), be(() => {
    const E = (Z) => {
      if (h)
        switch (Z.key) {
          case "ArrowDown":
            Z.preventDefault(), z(
              (p) => p < F.length - 1 ? p + 1 : p
            );
            break;
          case "ArrowUp":
            Z.preventDefault(), z((p) => p > 0 ? p - 1 : 0);
            break;
          case "Enter":
            Z.preventDefault(), $ >= 0 && $ < F.length && he(F[$]);
            break;
          case "Escape":
            Z.preventDefault(), ae(!1);
            break;
        }
    };
    return h && document.addEventListener("keydown", E), () => {
      document.removeEventListener("keydown", E);
    };
  }, [h, $, F]), be(() => {
    if (h && $ >= 0 && P.current) {
      const E = P.current.querySelector(
        `[data-index="${$}"]`
      );
      E && E.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [$, h]);
  const he = (E) => {
    L(E), ae(!1), z(-1), o?.(E.id, E);
  }, le = (E) => {
    E.stopPropagation(), L(null), o?.("", void 0);
  }, d = () => {
    if (!O && !T && (ae(!h), !h)) {
      const E = F.findIndex(
        (Z) => Z.id === S?.id
      );
      z(E >= 0 ? E : 0);
    }
  }, f = S ? S.value : "", k = te ? te * 40 : j;
  return /* @__PURE__ */ g(
    "div",
    {
      ref: t,
      "data-testid": _,
      className: `avakio-richselect ${V}`,
      style: {
        width: D,
        padding: Array.isArray(H) ? `${H[0]}px ${H[1]}px ${H[2]}px ${H[3]}px` : typeof H == "number" ? `${H}px` : H,
        margin: Array.isArray(K) ? `${K[0]}px ${K[1]}px ${K[2]}px ${K[3]}px` : typeof K == "number" ? `${K}px` : K
      },
      "data-disabled": O,
      "data-readonly": T,
      "data-error": !!I,
      children: [
        y && /* @__PURE__ */ g(
          "label",
          {
            className: "avakio-richselect-label",
            style: {
              width: x === "left" ? A : void 0,
              textAlign: x
            },
            children: [
              y,
              W && /* @__PURE__ */ e("span", { className: "avakio-richselect-required", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ g("div", { className: "avakio-richselect-wrapper", children: [
          /* @__PURE__ */ g(
            "button",
            {
              ref: w,
              type: "button",
              id: a,
              className: "avakio-richselect-button",
              onClick: d,
              disabled: O,
              "aria-haspopup": "listbox",
              "aria-expanded": h,
              "aria-label": y || "Select option",
              children: [
                /* @__PURE__ */ e("span", { className: `avakio-richselect-value ${f ? "" : "placeholder"}`, children: f || l }),
                /* @__PURE__ */ g("div", { className: "avakio-richselect-icons", children: [
                  J && S && !O && !T && /* @__PURE__ */ e(
                    "span",
                    {
                      role: "button",
                      tabIndex: -1,
                      className: "avakio-richselect-clear",
                      onClick: le,
                      "aria-label": "Clear selection",
                      children: /* @__PURE__ */ e(Je, { size: 16 })
                    }
                  ),
                  /* @__PURE__ */ e(
                    tt,
                    {
                      size: 18,
                      className: `avakio-richselect-toggle ${h ? "open" : ""}`
                    }
                  )
                ] })
              ]
            }
          ),
          h && /* @__PURE__ */ e(
            "div",
            {
              ref: P,
              className: "avakio-richselect-dropdown",
              style: { maxHeight: k },
              role: "listbox",
              children: F.length === 0 ? /* @__PURE__ */ e("div", { className: "avakio-richselect-empty", children: "No options available" }) : F.map((E, Z) => {
                const p = S?.id === E.id;
                return /* @__PURE__ */ e(
                  "div",
                  {
                    "data-index": Z,
                    className: `avakio-richselect-option ${p ? "selected" : ""} ${Z === $ ? "highlighted" : ""}`,
                    onClick: () => he(E),
                    role: "option",
                    "aria-selected": p,
                    children: v ? v(E) : E.value
                  },
                  E.id
                );
              })
            }
          )
        ] }),
        I && /* @__PURE__ */ e("div", { className: "avakio-richselect-error", children: I })
      ]
    }
  );
}
const qn = {
  getValue: (a) => a.current?.selectedOption?.id,
  getText: (a) => a.current?.selectedOption?.value
};
function at(a, n, i) {
  return Math.min(Math.max(a, n), i);
}
function Xa({
  value: a,
  defaultValue: n,
  onChange: i,
  min: o = 0,
  max: l = 100,
  step: y = 1,
  range: x = !1,
  disabled: A,
  label: O,
  description: T,
  required: v,
  error: D,
  showValue: j = !0,
  formatValue: te,
  marks: W,
  size: I = "md",
  id: V,
  testId: J,
  theme: H
}) {
  const K = a !== void 0, _ = (p, U, ue) => p === void 0 ? [U, ue] : Array.isArray(p) ? [at(p[0], o, l), at(p[1], o, l)] : [o, at(p, o, l)], h = (p, U) => p === void 0 ? U : Array.isArray(p) ? p[1] : at(p, o, l), [ae, $] = q(
    () => _(n, o, x ? l : o)
  ), [z, S] = q(
    () => h(n, o)
  ), L = K ? _(a, o, l) : ae, t = K ? h(a, o) : z, P = x ? (L[0] - o) / (l - o || 1) * 100 : 0, w = x ? (L[1] - o) / (l - o || 1) * 100 : (t - o) / (l - o || 1) * 100, F = Ie(() => {
    const p = x ? L[0] : t;
    return te ? te(p) : p.toString();
  }, [x, L, t, te]), he = Ie(() => x ? te ? te(L[1]) : L[1].toString() : F, [x, L, te, F]), le = Ie(() => !W || !W.length ? [] : W.filter((p) => p >= o && p <= l), [W, o, l]), d = ve((p) => {
    const U = at(p, o, l);
    K || S(U), i?.(U);
  }, [o, l, K, i]), f = ve((p, U) => {
    const ue = at(U, o, l);
    let G;
    p === 0 ? G = [Math.min(ue, L[1]), L[1]] : G = [L[0], Math.max(ue, L[0])], K || $(G), i?.(G);
  }, [o, l, L, K, i]), k = Ce(null), E = ve((p) => {
    if (A || !x || !k.current) return;
    const U = k.current.getBoundingClientRect(), ue = (p.clientX - U.left) / U.width, G = o + ue * (l - o), Y = Math.round(G / y) * y, ce = Math.abs(Y - L[0]), ne = Math.abs(Y - L[1]);
    ce <= ne ? f(0, Y) : f(1, Y);
  }, [A, x, o, l, y, L, f]), Z = x ? {
    "--slider-progress-start": `${P}%`,
    "--slider-progress-end": `${w}%`,
    "--slider-progress": `${w}%`
  } : {
    "--slider-progress": `${w}%`
  };
  return /* @__PURE__ */ g(
    "div",
    {
      id: V,
      "data-testid": J,
      "data-admin-theme": H,
      className: [
        "avakio-slider",
        `avakio-slider-${I}`,
        x && "avakio-slider-range",
        D && "avakio-slider-error",
        A && "avakio-slider-disabled"
      ].filter(Boolean).join(" "),
      style: Z,
      children: [
        (O || T) && /* @__PURE__ */ g("div", { className: "avakio-slider-header", children: [
          /* @__PURE__ */ g("div", { className: "avakio-slider-label-row", children: [
            O && /* @__PURE__ */ e("span", { className: "avakio-slider-label", children: O }),
            v && /* @__PURE__ */ e("span", { className: "avakio-slider-required", children: "*" }),
            j && /* @__PURE__ */ e("span", { className: "avakio-slider-value-chip", children: x ? `${F} - ${he}` : F })
          ] }),
          T && /* @__PURE__ */ e("div", { className: "avakio-slider-description", children: T })
        ] }),
        /* @__PURE__ */ g("div", { className: "avakio-slider-body", children: [
          x ? /* @__PURE__ */ g(et, { children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                className: "avakio-slider-input avakio-slider-input-low",
                min: o,
                max: l,
                step: y,
                value: L[0],
                disabled: A,
                onChange: (p) => f(0, Number(p.target.value)),
                "aria-label": "Range minimum"
              }
            ),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                className: "avakio-slider-input avakio-slider-input-high",
                min: o,
                max: l,
                step: y,
                value: L[1],
                disabled: A,
                onChange: (p) => f(1, Number(p.target.value)),
                "aria-label": "Range maximum"
              }
            )
          ] }) : /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              className: "avakio-slider-input",
              min: o,
              max: l,
              step: y,
              value: t,
              disabled: A,
              onChange: (p) => d(Number(p.target.value))
            }
          ),
          /* @__PURE__ */ g(
            "div",
            {
              ref: k,
              className: "avakio-slider-track",
              onClick: x ? E : void 0,
              children: [
                x ? /* @__PURE__ */ e(
                  "div",
                  {
                    className: "avakio-slider-progress avakio-slider-progress-range",
                    style: {
                      left: `${P}%`,
                      width: `${w - P}%`
                    }
                  }
                ) : /* @__PURE__ */ e("div", { className: "avakio-slider-progress" }),
                x ? /* @__PURE__ */ g(et, { children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: "avakio-slider-thumb avakio-slider-thumb-low",
                      style: { left: `${P}%` }
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: "avakio-slider-thumb avakio-slider-thumb-high",
                      style: { left: `${w}%` }
                    }
                  )
                ] }) : /* @__PURE__ */ e("div", { className: "avakio-slider-thumb", style: { left: `${w}%` } })
              ]
            }
          ),
          le.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-slider-marks", children: le.map((p) => {
            const U = (p - o) / (l - o || 1) * 100, ue = x ? p >= L[0] && p <= L[1] : p <= t;
            return /* @__PURE__ */ g(
              "div",
              {
                className: `avakio-slider-mark ${ue ? "avakio-slider-mark-active" : ""}`,
                style: { left: `${U}%` },
                children: [
                  /* @__PURE__ */ e("span", { className: "avakio-slider-mark-dot" }),
                  /* @__PURE__ */ e("span", { className: "avakio-slider-mark-label", children: p })
                ]
              },
              p
            );
          }) })
        ] }),
        D && /* @__PURE__ */ e("div", { className: "avakio-slider-error-text", children: D })
      ]
    }
  );
}
function Yn({
  items: a,
  onChange: n,
  theme: i,
  className: o,
  style: l,
  dense: y,
  showBorders: x,
  id: A,
  testId: O
}) {
  const [T, v] = q(a), [D, j] = q(null), [te, W] = q(null), [I, V] = q("bottom"), J = Ce(null), H = Ce({});
  be(() => {
    v(a);
  }, [a]), be(() => {
    D && (n?.(T, D), j(null));
  }, [D, n, T]), be(() => {
    if (!te) return;
    const t = (P) => {
      J.current && (J.current.contains(P.target) || W(null));
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [te]);
  const K = (t) => {
    const P = H.current[t];
    if (!P) return "bottom";
    const w = P.getBoundingClientRect(), F = window.innerHeight, he = 360, le = F - w.bottom, d = w.top;
    return le < he && d > le ? "top" : "bottom";
  }, _ = (t) => {
    if (t == null || t === "") return null;
    const P = String(t), w = P.includes("T") ? P : `${P}T00:00:00`, F = new Date(w);
    return Number.isNaN(F.getTime()) ? null : F;
  }, h = (t) => {
    if (t.value === void 0 || t.value === null || t.value === "")
      return t.placeholder || (t.type === "datetime" ? "Select date & time" : "Select date");
    if (t.type === "date" && typeof t.value == "string") {
      const P = _(t.value);
      return P ? P.toLocaleDateString(void 0, { dateStyle: "medium" }) : "Invalid date";
    }
    if (t.type === "datetime" && typeof t.value == "string") {
      const P = _(t.value);
      return P ? P.toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" }) : "Invalid date";
    }
    return String(t.value);
  }, ae = Ie(() => {
    const t = {};
    return T.forEach((P) => {
      const w = P.group || "__ungrouped";
      t[w] || (t[w] = []), t[w].push(P);
    }), t;
  }, [T]), $ = (t, P) => {
    v((w) => {
      const F = w.map((le) => le.id === t ? { ...le, value: P } : le), he = F.find((le) => le.id === t);
      return j(he), F;
    });
  }, z = (t) => {
    const P = {
      id: t.id,
      name: t.id,
      disabled: t.disabled,
      required: t.required,
      placeholder: t.placeholder
    };
    switch (t.type) {
      case "number":
        return /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            className: "av-prop-input",
            ...P,
            value: t.value === void 0 || t.value === null ? "" : t.value,
            onChange: (w) => $(t.id, w.target.value === "" ? "" : Number(w.target.value))
          }
        );
      case "select": {
        const w = (t.selectOptions ?? t.options ?? []).map((F) => {
          if (typeof F == "string" || F.id !== void 0) return F;
          const he = F;
          return { id: typeof he.value == "boolean" ? String(he.value) : he.value, value: he.label };
        });
        return /* @__PURE__ */ e(
          Ga,
          {
            id: t.id,
            value: typeof t.value == "string" || typeof t.value == "number" ? t.value : void 0,
            options: w,
            onChange: (F, he) => {
              t.selectOnChange?.(F, he, t), $(t.id, F ?? "");
            },
            placeholder: t.selectPlaceholder ?? t.placeholder,
            disabled: t.selectDisabled ?? t.disabled,
            readonly: t.selectReadOnly,
            template: t.selectTemplate,
            width: t.selectWidth,
            maxHeight: t.selectMaxHeight,
            yCount: t.selectYCount,
            required: t.selectRequired ?? t.required,
            error: t.selectError,
            className: t.selectClassName,
            clearable: t.selectClearable
          }
        );
      }
      case "checkbox": {
        const w = t.value === void 0 ? !1 : !!t.value;
        return /* @__PURE__ */ e(
          Ba,
          {
            id: t.id,
            name: t.id,
            checked: w,
            onChange: (F) => {
              t.checkboxOnChange?.(F, t), $(t.id, F);
            },
            label: t.checkboxLabel ?? t.placeholder ?? t.label,
            description: t.checkboxDescription ?? t.description,
            disabled: t.disabled,
            required: t.required
          }
        );
      }
      case "combo":
        return /* @__PURE__ */ e(
          Wa,
          {
            id: t.id,
            value: typeof t.value == "string" || typeof t.value == "number" ? t.value : void 0,
            options: t.comboOptions ?? t.options ?? [],
            onChange: (w, F) => {
              t.comboOnChange?.(w, F, t), $(t.id, w ?? "");
            },
            onInputChange: (w) => t.comboOnInputChange?.(w, t),
            placeholder: t.comboPlaceholder ?? t.placeholder,
            label: t.comboLabel,
            labelAlign: t.comboLabelAlign,
            labelWidth: t.comboLabelWidth,
            disabled: t.comboDisabled ?? t.disabled,
            readonly: t.comboReadOnly,
            filterMode: t.comboFilterMode,
            customFilter: t.comboCustomFilter,
            template: t.comboTemplate,
            width: t.comboWidth,
            maxHeight: t.comboMaxHeight,
            required: t.comboRequired ?? t.required,
            error: t.comboError,
            className: t.comboClassName
          }
        );
      case "colorpicker":
        return /* @__PURE__ */ e(
          ja,
          {
            id: t.id,
            value: typeof t.value == "string" ? t.value : void 0,
            defaultValue: t.colorDefaultValue,
            label: t.colorLabel,
            description: t.colorDescription,
            error: t.colorError,
            disabled: t.colorDisabled ?? t.disabled,
            readOnly: t.colorReadOnly,
            required: t.colorRequired ?? t.required,
            presets: t.colorPresets,
            allowCustomInput: t.colorAllowCustomInput,
            showPreview: t.colorShowPreview,
            className: t.colorClassName,
            onChange: (w) => {
              t.colorOnChange?.(w, t), $(t.id, w);
            }
          }
        );
      case "counter":
        return /* @__PURE__ */ e(
          Ka,
          {
            id: t.id,
            value: typeof t.value == "number" ? t.value : void 0,
            defaultValue: t.counterDefaultValue,
            step: t.counterStep,
            min: t.counterMin,
            max: t.counterMax,
            label: t.counterLabel ?? t.label,
            description: t.counterDescription ?? t.description,
            error: t.counterError,
            required: t.counterRequired ?? t.required,
            disabled: t.counterDisabled ?? t.disabled,
            readOnly: t.counterReadOnly,
            size: t.counterSize,
            allowInput: t.counterAllowInput,
            className: t.counterClassName,
            onChange: (w) => {
              t.counterOnChange?.(w, t), $(t.id, w);
            }
          }
        );
      case "slider":
        return /* @__PURE__ */ e(
          Xa,
          {
            value: typeof t.value == "number" ? t.value : void 0,
            defaultValue: t.sliderDefaultValue,
            min: t.sliderMin,
            max: t.sliderMax,
            step: t.sliderStep,
            disabled: t.sliderDisabled ?? t.disabled,
            label: t.sliderLabel ?? t.label,
            description: t.sliderDescription ?? t.description,
            required: t.sliderRequired ?? t.required,
            error: t.sliderError,
            showValue: t.sliderShowValue,
            formatValue: t.sliderFormatValue,
            marks: t.sliderMarks,
            size: t.sliderSize,
            onChange: (w) => {
              const F = typeof w == "number" ? w : w[0];
              t.sliderOnChange?.(F, t), $(t.id, F);
            }
          }
        );
      case "date":
        return /* @__PURE__ */ g("div", { className: "av-prop-datewrap", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "av-prop-datebtn",
              ref: (w) => {
                H.current[t.id] = w;
              },
              onClick: () => {
                if (te === t.id) {
                  W(null);
                  return;
                }
                const w = K(t.id);
                V(w), W(t.id);
              },
              children: h(t)
            }
          ),
          te === t.id && /* @__PURE__ */ e("div", { className: `av-prop-datepop ${I === "top" ? "is-top" : ""}`, children: /* @__PURE__ */ e(
            gt,
            {
              value: t.value ?? "",
              onChange: (w) => {
                t.dateOnChange?.(w, t), $(t.id, w), W(null);
              },
              showTime: t.dateShowTime ?? !1,
              className: t.dateClassName ?? "av-prop-datepicker"
            }
          ) })
        ] });
      case "daterangepicker":
        return /* @__PURE__ */ e(
          qa,
          {
            value: t.value && typeof t.value == "object" ? t.value : void 0,
            defaultValue: t.daterangeDefaultValue,
            presets: t.daterangePresets,
            allowSingleDay: t.daterangeAllowSingleDay,
            showTime: t.daterangeShowTime,
            className: t.daterangeClassName,
            onChange: (w) => {
              t.daterangeOnChange?.(w, t), $(t.id, w);
            }
          }
        );
      case "gridsuggest":
        return /* @__PURE__ */ e(
          Ya,
          {
            id: t.id,
            value: typeof t.value == "string" || typeof t.value == "number" ? t.value : void 0,
            data: t.gridsuggestData ?? t.options ?? [],
            onChange: (w, F) => {
              t.gridsuggestOnChange?.(w, F, t), $(t.id, w ?? "");
            },
            onInputChange: (w) => t.gridsuggestOnInputChange?.(w, t),
            placeholder: t.gridsuggestPlaceholder ?? t.placeholder,
            label: t.gridsuggestLabel,
            labelAlign: t.gridsuggestLabelAlign,
            labelWidth: t.gridsuggestLabelWidth,
            disabled: t.gridsuggestDisabled ?? t.disabled,
            readonly: t.gridsuggestReadOnly,
            textValue: t.gridsuggestTextValue,
            template: t.gridsuggestTemplate,
            width: t.gridsuggestWidth,
            body: t.gridsuggestBody,
            required: t.gridsuggestRequired ?? t.required,
            error: t.gridsuggestError,
            className: t.gridsuggestClassName,
            editable: t.gridsuggestEditable,
            filterMode: t.gridsuggestFilterMode
          }
        );
      case "multicombo":
        return /* @__PURE__ */ e(
          Ua,
          {
            options: t.multicomboOptions ?? [],
            value: Array.isArray(t.multicomboValue ?? t.value) ? t.multicomboValue ?? t.value : [],
            onChange: (w) => {
              t.multicomboOnChange?.(w, t), $(t.id, w);
            },
            placeholder: t.multicomboPlaceholder ?? t.placeholder,
            className: t.multicomboClassName,
            showCount: t.multicomboShowCount,
            maxDisplayItems: t.multicomboMaxDisplayItems,
            disabled: t.multicomboDisabled ?? t.disabled
          }
        );
      case "datetime":
        return /* @__PURE__ */ g("div", { className: "av-prop-datewrap", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "av-prop-datebtn",
              ref: (w) => {
                H.current[t.id] = w;
              },
              onClick: () => {
                if (te === t.id) {
                  W(null);
                  return;
                }
                const w = K(t.id);
                V(w), W(t.id);
              },
              children: h(t)
            }
          ),
          te === t.id && /* @__PURE__ */ e("div", { className: `av-prop-datepop ${I === "top" ? "is-top" : ""}`, children: /* @__PURE__ */ e(
            gt,
            {
              value: t.value ?? "",
              onChange: (w) => {
                t.dateOnChange?.(w, t), $(t.id, w), W(null);
              },
              showTime: t.dateShowTime ?? !0,
              className: t.dateClassName ?? "av-prop-datepicker"
            }
          ) })
        ] });
      case "button":
        return /* @__PURE__ */ e(
          Ha,
          {
            label: t.buttonLabel || t.placeholder || "Action",
            onClick: () => {
              t.disabled || (t.buttonOnClick?.(t), $(t.id, !0));
            },
            disabled: t.disabled,
            variant: t.buttonVariant,
            size: t.buttonSize,
            badge: t.buttonBadge,
            icon: t.buttonIcon,
            iconRight: t.buttonIconRight,
            block: t.buttonBlock
          }
        );
      case "textarea":
        return /* @__PURE__ */ e(
          "textarea",
          {
            className: "av-prop-input av-prop-textarea",
            ...P,
            value: t.value ?? "",
            onChange: (w) => $(t.id, w.target.value)
          }
        );
      default:
        return /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            className: "av-prop-input",
            ...P,
            value: t.value ?? "",
            onChange: (w) => $(t.id, w.target.value)
          }
        );
    }
  }, S = [
    "avakio-property",
    y ? "is-dense" : "",
    x ? "has-borders" : "",
    o || ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ e("div", { ref: J, id: A, "data-testid": O, className: S, style: l, ...i ? { "data-admin-theme": i } : void 0, children: /* @__PURE__ */ e("div", { className: "av-prop-table", children: Object.entries(ae).map(([t, P]) => /* @__PURE__ */ g(Pe.Fragment, { children: [
    t !== "__ungrouped" && /* @__PURE__ */ e("div", { className: "av-prop-group", children: t }),
    P.map((w) => /* @__PURE__ */ g("div", { className: "av-prop-row", children: [
      /* @__PURE__ */ g("div", { className: "av-prop-label", children: [
        /* @__PURE__ */ e("label", { htmlFor: w.id, children: w.label }),
        w.description && /* @__PURE__ */ e("div", { className: "av-prop-desc", children: w.description })
      ] }),
      /* @__PURE__ */ e("div", { className: "av-prop-control", children: z(w) })
    ] }, w.id))
  ] }, t)) }) });
}
function _t(a, n) {
  return a.getFullYear() === n.getFullYear() && a.getMonth() === n.getMonth() && a.getDate() === n.getDate();
}
function ct(a) {
  const n = a.getFullYear(), i = String(a.getMonth() + 1).padStart(2, "0"), o = String(a.getDate()).padStart(2, "0");
  return `${n}-${i}-${o}`;
}
function st(a) {
  const [n, i, o] = a.split("-").map(Number);
  return new Date(n, i - 1, o);
}
function Ja({
  value: a,
  onChange: n,
  mode: i = "single",
  minDate: o,
  maxDate: l,
  disabledDates: y = [],
  markers: x = [],
  showWeekNumbers: A = !1,
  monthsToShow: O = 1,
  weekStart: T = 0,
  className: v = "",
  onMonthChange: D,
  id: j,
  testId: te
}) {
  const W = () => {
    if (a) {
      const d = Array.isArray(a) ? a[0] : a;
      if (d && d.trim())
        return st(d);
    }
    return /* @__PURE__ */ new Date();
  }, [I, V] = q(W), J = Math.max(1, Math.min(3, O));
  be(() => {
    if (a) {
      const d = Array.isArray(a) ? a[0] : a;
      if (d && d.trim()) {
        const f = st(d);
        (f.getFullYear() !== I.getFullYear() || f.getMonth() !== I.getMonth()) && V(f);
      }
    }
  }, [a]);
  const H = Ie(() => a ? (Array.isArray(a) ? a : [a]).filter((f) => f && f.trim()).map(st) : [], [a]), K = Ie(() => new Set(y), [y]), _ = Ie(() => {
    const d = /* @__PURE__ */ new Map();
    return x.forEach((f) => {
      const k = f.date.includes("T") ? f.date.split("T")[0] : f.date;
      d.has(k) || d.set(k, []), d.get(k).push(f);
    }), d;
  }, [x]), h = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ], ae = T === 0 ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], $ = (d) => {
    const f = d.getFullYear(), k = d.getMonth(), E = new Date(f, k, 1), Z = new Date(f, k + 1, 0);
    let p = E.getDay();
    T === 1 && (p = p === 0 ? 6 : p - 1);
    const U = Z.getDate(), ue = new Date(f, k, 0).getDate(), G = [];
    for (let ce = p - 1; ce >= 0; ce--)
      G.push({
        date: new Date(f, k - 1, ue - ce),
        isCurrentMonth: !1
      });
    for (let ce = 1; ce <= U; ce++) {
      const ne = new Date(f, k, ce);
      G.push({
        date: ne,
        isCurrentMonth: !0,
        weekNumber: A ? z(ne) : void 0
      });
    }
    const Y = 42 - G.length;
    for (let ce = 1; ce <= Y; ce++)
      G.push({
        date: new Date(f, k + 1, ce),
        isCurrentMonth: !1
      });
    return G;
  }, z = (d) => {
    const f = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())), k = f.getUTCDay() || 7;
    f.setUTCDate(f.getUTCDate() + 4 - k);
    const E = new Date(Date.UTC(f.getUTCFullYear(), 0, 1));
    return Math.ceil(((f.getTime() - E.getTime()) / 864e5 + 1) / 7);
  }, S = (d) => {
    const f = ct(d);
    if (K.has(f)) return !0;
    if (o) {
      const k = st(o);
      if (d.getFullYear() < k.getFullYear() || d.getFullYear() === k.getFullYear() && d.getMonth() < k.getMonth() || d.getFullYear() === k.getFullYear() && d.getMonth() === k.getMonth() && d.getDate() < k.getDate())
        return !0;
    }
    if (l) {
      const k = st(l);
      if (d.getFullYear() > k.getFullYear() || d.getFullYear() === k.getFullYear() && d.getMonth() > k.getMonth() || d.getFullYear() === k.getFullYear() && d.getMonth() === k.getMonth() && d.getDate() > k.getDate())
        return !0;
    }
    return !1;
  }, L = (d) => H.some((f) => _t(f, d)), t = (d) => {
    if (i !== "range" || H.length !== 2) return !1;
    const [f, k] = H.sort((E, Z) => E.getTime() - Z.getTime());
    return d > f && d < k;
  }, P = (d) => {
    if (S(d)) return;
    const f = ct(d);
    if (i === "single")
      n?.((typeof a == "string" ? a : "") === f ? "" : f);
    else if (i === "multiple") {
      const k = Array.isArray(a) ? a : a ? [a] : [], Z = k.includes(f) ? k.filter((p) => p !== f) : [...k, f];
      n?.(Z);
    } else if (i === "range") {
      const k = Array.isArray(a) ? a : a ? [a] : [];
      if (k.length === 0 || k.length === 2)
        n?.([f]);
      else if (k.length === 1)
        if (k[0] === f)
          n?.([]);
        else {
          const E = [k[0], f].sort();
          n?.(E);
        }
    }
  }, w = () => {
    const d = new Date(I.getFullYear(), I.getMonth() - 1, 1);
    V(d), D?.(d);
  }, F = () => {
    const d = new Date(I.getFullYear(), I.getMonth() + 1, 1);
    V(d), D?.(d);
  }, he = () => {
    const d = /* @__PURE__ */ new Date();
    V(d), D?.(d);
    const f = ct(d);
    if (i === "single")
      n?.(f);
    else if (i === "multiple") {
      const k = Array.isArray(a) ? a : a ? [a] : [];
      k.includes(f) || n?.([...k, f]);
    } else i === "range" && n?.([f]);
  }, le = (d) => {
    const f = new Date(I.getFullYear(), I.getMonth() + d, 1), k = $(f), E = /* @__PURE__ */ new Date();
    return /* @__PURE__ */ g("div", { className: "avakio-cal-month", children: [
      /* @__PURE__ */ g("div", { className: "avakio-cal-header", children: [
        d === 0 && J === 1 && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "avakio-cal-nav-btn",
            onClick: w,
            children: /* @__PURE__ */ e(Ze, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ g("div", { className: "avakio-cal-title", children: [
          h[f.getMonth()],
          " ",
          f.getFullYear()
        ] }),
        d === O - 1 && J === 1 && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "avakio-cal-nav-btn",
            onClick: F,
            children: /* @__PURE__ */ e(Ge, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ g("div", { className: `avakio-cal-weekdays ${A ? "avakio-cal-with-week-nums" : ""}`, children: [
        A && /* @__PURE__ */ e("div", { className: "avakio-cal-weekday avakio-cal-week-num-header", children: "#" }),
        ae.map((Z) => /* @__PURE__ */ e("div", { className: "avakio-cal-weekday", children: Z }, Z))
      ] }),
      /* @__PURE__ */ e("div", { className: `avakio-cal-grid ${A ? "avakio-cal-with-week-nums" : ""}`, children: k.map((Z, p) => {
        const U = L(Z.date), ue = _t(Z.date, E), G = S(Z.date), Y = t(Z.date), ce = ct(Z.date), ne = _.get(ce) || [], ie = A && p % 7 === 0, M = `${ce}-${p}`, m = ie ? Z.weekNumber ?? z(Z.date) : void 0;
        return /* @__PURE__ */ g(Pe.Fragment, { children: [
          ie && /* @__PURE__ */ e("div", { className: "avakio-cal-week-num", children: m }),
          /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => P(Z.date),
              disabled: G,
              className: `avakio-cal-day ${Z.isCurrentMonth ? "" : "avakio-cal-day-outside"} ${U ? "avakio-cal-day-selected" : ""} ${ue ? "avakio-cal-day-today" : ""} ${G ? "avakio-cal-day-disabled" : ""} ${Y ? "avakio-cal-day-in-range" : ""}`,
              children: [
                /* @__PURE__ */ e("span", { className: "avakio-cal-day-number", children: Z.date.getDate() }),
                ne.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-cal-markers", children: ne.slice(0, 3).map((r, R) => /* @__PURE__ */ e(
                  "span",
                  {
                    className: "avakio-cal-marker",
                    style: { backgroundColor: r.color || "#3b82f6" },
                    title: r.text
                  },
                  `marker-${M}-${R}`
                )) })
              ]
            }
          )
        ] }, M);
      }) })
    ] }, d);
  };
  return /* @__PURE__ */ g("div", { id: j, "data-testid": te, className: `avakio-calendar ${v}`, children: [
    J > 1 && /* @__PURE__ */ g("div", { className: "avakio-cal-multi-nav", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "avakio-cal-nav-btn",
          onClick: w,
          children: /* @__PURE__ */ e(Ze, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "avakio-cal-today-btn",
          onClick: he,
          children: "Today"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "avakio-cal-nav-btn",
          onClick: F,
          children: /* @__PURE__ */ e(Ge, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: `avakio-cal-months avakio-cal-months-${J}`, children: Array.from({ length: J }, (d, f) => le(f)) }),
    J === 1 && /* @__PURE__ */ e("div", { className: "avakio-cal-footer", children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "avakio-cal-today-btn",
        onClick: he,
        children: "Today"
      }
    ) })
  ] });
}
function dt(a) {
  const n = new Date(a), i = (n.getDay() + 6) % 7;
  return n.setDate(n.getDate() - i), n.setHours(0, 0, 0, 0), n;
}
function Xe(a, n) {
  const i = new Date(a);
  return i.setDate(i.getDate() + n), i;
}
function ut(a) {
  const n = a.getFullYear(), i = String(a.getMonth() + 1).padStart(2, "0"), o = String(a.getDate()).padStart(2, "0");
  return `${n}-${i}-${o}`;
}
function It(a) {
  const [n, i, o] = a.split("-").map(Number);
  return new Date(n, i - 1, o);
}
function Qe(a) {
  return a.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
function yt(a) {
  return a.toLocaleDateString(void 0, { weekday: "short", month: "short", day: "numeric" });
}
function Un({
  events: a = [],
  defaultView: n = "month",
  defaultDate: i,
  theme: o,
  userId: l,
  dataUrl: y,
  eventsUrl: x,
  loadRemoteOnNavigate: A,
  fetchOptions: O,
  transformEvent: T,
  buildEventsQuery: v,
  mutationUrl: D,
  buildMutationUrl: j,
  mutationMethod: te = "post",
  onNavigate: W,
  onViewChange: I,
  onEventClick: V,
  onEventCreate: J,
  className: H,
  id: K,
  testId: _
}) {
  const [h, ae] = q(n), [$, z] = q(
    i ? new Date(i) : new Date(2020, 9, 1)
  ), [S, L] = q(ut(i ? new Date(i) : /* @__PURE__ */ new Date())), [t, P] = q(!1), [w, F] = q([]), [he, le] = q(!1), [d, f] = q(null), [k, E] = q(!1), [Z, p] = q(null), U = x || y, ue = (N, se) => {
    if (N === "month") {
      const u = dt(new Date(se.getFullYear(), se.getMonth(), 1)), oe = Xe(u, 42);
      return { start: u, end: oe };
    }
    if (N === "week") {
      const u = dt(se), oe = Xe(u, 7);
      return { start: u, end: oe };
    }
    const ke = new Date(se);
    ke.setHours(0, 0, 0, 0);
    const xe = Xe(ke, 1);
    return { start: ke, end: xe };
  };
  be(() => {
    if (!U || !A && k) return;
    let N = !1;
    le(!0), f(null);
    const { start: se, end: ke } = ue(h, $), xe = v ? v({ start: se, end: ke, view: h, userId: l }) : `?start=${se.toISOString()}&end=${ke.toISOString()}${l ? `&userId=${l}` : ""}`, u = U + xe, oe = (s) => {
      if (T) return T(s);
      const C = s.start_date && s.end_date, c = C ? new Date(s.start_date) : new Date(s.start || s.startDate || s.date), X = C ? new Date(s.end_date) : new Date(s.end || s.endDate || s.finish || s.finishDate || c);
      return {
        id: String(s.id ?? s._id ?? `${c?.toISOString() || "evt"}-${Math.random()}`),
        title: s.title || s.text || "Event",
        start: c?.toISOString(),
        end: X?.toISOString(),
        color: s.color
      };
    };
    return fetch(u, O).then(async (s) => {
      if (!s.ok) throw new Error(`Request failed: ${s.status}`);
      const C = await s.json(), X = (Array.isArray(C) ? C : Array.isArray(C.data) ? C.data : Array.isArray(C.events) ? C.events : []).map(oe).filter((b) => b.start && b.end);
      N || (F(X), E(!0));
    }).catch((s) => {
      N || f(s.message);
    }).finally(() => {
      N || le(!1);
    }), () => {
      N = !0;
    };
  }, [U, A, h, $, l, O, T, v, k]), be(() => {
    const N = () => typeof window > "u" ? !1 : window.innerWidth <= 768;
    P(N());
    const se = () => P(N());
    return window.addEventListener("resize", se), () => window.removeEventListener("resize", se);
  }, []), be(() => {
    L(ut($));
  }, [$]);
  const G = Ie(() => {
    const N = new Date($.getFullYear(), $.getMonth(), 1), se = dt(N), ke = [];
    for (let xe = 0; xe < 42; xe++) ke.push(Xe(se, xe));
    return ke;
  }, [$]), Y = Ie(() => {
    const N = dt($);
    return Array.from({ length: 7 }, (se, ke) => Xe(N, ke));
  }, [$]), ce = Ie(() => [$], [$]), ne = Ie(() => [...w, ...a].map((se) => ({ ...se, _start: new Date(se.start), _end: new Date(se.end) })), [a, w]), ie = Ie(() => It(S), [S]), M = Ie(() => h !== "month" ? [] : [...ne].filter((N) => N._start.getMonth() === $.getMonth() && N._start.getFullYear() === $.getFullYear()).sort((N, se) => N._start.getTime() - se._start.getTime()), [h, ne, $]), m = Ie(() => {
    if (h === "month") {
      const N = G[0], se = Xe(G[G.length - 1], 1);
      return ne.filter((ke) => ke._start < se && ke._end >= N);
    }
    if (h === "week") {
      const N = Y[0], se = Xe(Y[Y.length - 1], 1);
      return ne.filter((ke) => ke._start < se && ke._end >= N);
    }
    return ne.filter((N) => {
      const se = ce[0];
      return N._start.toDateString() === se.toDateString();
    });
  }, [h, G, Y, ce, ne]), r = (N) => {
    let se = new Date($);
    h === "month" && (se = new Date($.getFullYear(), $.getMonth() + N, 1)), h === "week" && (se = Xe($, N * 7)), h === "day" && (se = Xe($, N)), z(se), W?.(se.toISOString(), h);
  }, R = (N) => {
    ae(N), I?.(N);
  }, ee = () => {
    const N = new Date($), se = Xe(N, 0);
    N.setHours(9, 0, 0, 0), se.setHours(10, 0, 0, 0);
    const ke = {
      id: `${Date.now()}`,
      title: "New event",
      start: N.toISOString(),
      end: se.toISOString()
    };
    (async () => {
      if (!D) return J?.(ke);
      const u = j ? j(ke, "create") : D;
      try {
        le(!0), f(null);
        const oe = await fetch(u, {
          method: te,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ke)
        });
        if (!oe.ok) throw new Error(`Failed to save event: ${oe.status}`);
        const s = await oe.json(), C = T ? T(s) : s;
        F((c) => [...c, C]), J?.(C);
      } catch (oe) {
        f(oe.message || "Failed to save event");
      } finally {
        le(!1);
      }
    })();
  }, de = (N) => m.filter((se) => se._start.toDateString() === N.toDateString()), me = (N) => m.filter((se) => se._start.toDateString() === N), Ne = (N) => m.filter((se) => ut(se._start) === N), Ae = Ie(
    () => m.map((N) => ({
      date: ut(N._start),
      color: N.color,
      text: N.title
    })),
    [m]
  ), Se = Ie(() => Ne(S), [S, m]), _e = (N) => /* @__PURE__ */ g(
    "div",
    {
      className: "avakio-sch-event",
      style: { background: N.color || "var(--sch-primary)" },
      onClick: () => V?.(N),
      children: [
        /* @__PURE__ */ e("div", { className: "avakio-sch-event-title", children: N.title }),
        /* @__PURE__ */ g("div", { className: "avakio-sch-event-time", children: [
          Qe(N._start),
          " – ",
          Qe(N._end)
        ] })
      ]
    },
    N.id
  ), Ve = (N) => {
    const se = de(N).sort((ke, xe) => ke._start.getTime() - xe._start.getTime());
    return se.length ? se.map((ke) => _e(ke)) : /* @__PURE__ */ e("div", { className: "avakio-sch-mobile-empty", children: "No events" });
  };
  return /* @__PURE__ */ g("div", { id: K, "data-testid": _, className: ["avakio-scheduler", H || ""].join(" "), children: [
    /* @__PURE__ */ g("div", { className: "avakio-sch-toolbar", children: [
      /* @__PURE__ */ g("div", { className: "avakio-sch-nav", children: [
        /* @__PURE__ */ e("button", { onClick: () => r(-1), className: "avakio-sch-btn", children: "Prev" }),
        /* @__PURE__ */ e("button", { onClick: () => z(/* @__PURE__ */ new Date()), className: "avakio-sch-btn", children: "Today" }),
        /* @__PURE__ */ e("button", { onClick: () => r(1), className: "avakio-sch-btn", children: "Next" })
      ] }),
      /* @__PURE__ */ e("div", { className: "avakio-sch-title", children: $.toLocaleString(void 0, { month: "long", year: "numeric", day: h === "day" ? "numeric" : void 0 }) }),
      /* @__PURE__ */ g("div", { className: "avakio-sch-views", children: [
        /* @__PURE__ */ e("button", { onClick: () => R("month"), className: `avakio-sch-btn ${h === "month" ? "is-active" : ""}`, children: "Month" }),
        /* @__PURE__ */ e("button", { onClick: () => R("week"), className: `avakio-sch-btn ${h === "week" ? "is-active" : ""}`, children: "Week" }),
        /* @__PURE__ */ e("button", { onClick: () => R("day"), className: `avakio-sch-btn ${h === "day" ? "is-active" : ""}`, children: "Day" }),
        /* @__PURE__ */ e("button", { onClick: ee, className: "avakio-sch-btn", children: "New" })
      ] }),
      he && /* @__PURE__ */ e("div", { className: "avakio-sch-status", children: "Loading remote events…" }),
      d && /* @__PURE__ */ e("div", { className: "avakio-sch-status is-error", children: d })
    ] }),
    h === "month" && t && /* @__PURE__ */ g("div", { className: "avakio-sch-month-mobile", children: [
      /* @__PURE__ */ e(
        Ja,
        {
          value: S,
          onChange: (N) => {
            const se = Array.isArray(N) ? N[0] : N;
            se && (L(se), z(It(se)));
          },
          onMonthChange: (N) => z(N),
          markers: Ae,
          weekStart: 1
        }
      ),
      /* @__PURE__ */ g("div", { className: "avakio-sch-mobile-events", children: [
        /* @__PURE__ */ g("div", { className: "avakio-sch-mobile-events-header", children: [
          yt(ie),
          " — ",
          Se.length,
          " event",
          Se.length === 1 ? "" : "s"
        ] }),
        /* @__PURE__ */ g("div", { className: "avakio-sch-mobile-list", children: [
          Se.length === 0 && /* @__PURE__ */ e("div", { className: "avakio-sch-mobile-empty", children: "No events for this date." }),
          Se.slice().sort((N, se) => N._start.getTime() - se._start.getTime()).map((N) => /* @__PURE__ */ g(
            "div",
            {
              className: "avakio-sch-mobile-item",
              onClick: () => V?.(N),
              children: [
                /* @__PURE__ */ e("span", { className: "avakio-sch-dot", style: { background: N.color || "var(--sch-primary)" } }),
                /* @__PURE__ */ g("div", { className: "avakio-sch-mobile-meta", children: [
                  /* @__PURE__ */ e("div", { className: "avakio-sch-mobile-title", children: N.title }),
                  /* @__PURE__ */ g("div", { className: "avakio-sch-mobile-time", children: [
                    Qe(N._start),
                    " – ",
                    Qe(N._end)
                  ] })
                ] })
              ]
            },
            N.id
          ))
        ] })
      ] })
    ] }),
    h === "month" && !t && /* @__PURE__ */ g("div", { className: "avakio-sch-month", children: [
      /* @__PURE__ */ e("div", { className: "avakio-sch-weekdays", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((N) => /* @__PURE__ */ e("div", { className: "avakio-sch-weekday", children: N }, N)) }),
      /* @__PURE__ */ e("div", { className: "avakio-sch-grid", children: G.map((N) => /* @__PURE__ */ g("div", { className: `avakio-sch-cell ${N.getMonth() === $.getMonth() ? "" : "is-out"}`, children: [
        /* @__PURE__ */ g("div", { className: "avakio-sch-cell-date", children: [
          /* @__PURE__ */ e("span", { children: N.getDate() }),
          de(N).length > 1 && /* @__PURE__ */ g(
            "button",
            {
              className: "avakio-sch-more-btn",
              onClick: (se) => p({
                dateKey: N.toDateString(),
                anchorRect: se.currentTarget.getBoundingClientRect()
              }),
              title: `${de(N).length - 1} more`,
              children: [
                de(N).length - 1,
                " more"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "avakio-sch-cell-events", children: de(N).slice(0, 1).map((se) => _e(se)) })
      ] }, N.toISOString())) })
    ] }),
    h === "month" && !t && M.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-sch-month-agenda", children: M.map((N) => /* @__PURE__ */ g(
      "div",
      {
        className: "avakio-sch-agenda-item",
        onClick: () => V?.(N),
        children: [
          /* @__PURE__ */ g("div", { className: "avakio-sch-agenda-time", children: [
            /* @__PURE__ */ e("div", { children: Qe(N._start) }),
            /* @__PURE__ */ e("div", { className: "avakio-sch-agenda-time-end", children: Qe(N._end) })
          ] }),
          /* @__PURE__ */ e("span", { className: "avakio-sch-dot", style: { background: N.color || "var(--sch-primary)" } }),
          /* @__PURE__ */ g("div", { className: "avakio-sch-agenda-meta", children: [
            /* @__PURE__ */ e("div", { className: "avakio-sch-agenda-title", children: N.title }),
            /* @__PURE__ */ e("div", { className: "avakio-sch-agenda-date", children: N._start.toLocaleDateString(void 0, { weekday: "short", month: "short", day: "numeric" }) })
          ] })
        ]
      },
      N.id
    )) }),
    Z && /* @__PURE__ */ g(
      Ut,
      {
        open: !0,
        anchorRect: Z.anchorRect || void 0,
        offset: { y: 6 },
        theme: o,
        closeOnOutside: !0,
        closeOnEsc: !0,
        onClose: () => p(null),
        children: [
          /* @__PURE__ */ e("h4", { children: "Other events" }),
          /* @__PURE__ */ e("div", { className: "avakio-sch-more-list", children: me(Z.dateKey).slice(1).map((N) => /* @__PURE__ */ g(
            "div",
            {
              className: "avakio-sch-more-item",
              onClick: () => V?.(N),
              children: [
                /* @__PURE__ */ e("span", { className: "avakio-sch-dot", style: { background: N.color || "var(--sch-primary)" } }),
                /* @__PURE__ */ g("div", { className: "avakio-sch-more-meta", children: [
                  /* @__PURE__ */ e("div", { className: "avakio-sch-more-title", children: N.title }),
                  /* @__PURE__ */ g("div", { className: "avakio-sch-more-time", children: [
                    Qe(N._start),
                    " – ",
                    Qe(N._end)
                  ] })
                ] })
              ]
            },
            N.id
          )) })
        ]
      }
    ),
    h === "week" && /* @__PURE__ */ e("div", { className: "avakio-sch-week", children: /* @__PURE__ */ e("div", { className: "avakio-sch-week-row", children: Y.map((N) => /* @__PURE__ */ g("div", { className: "avakio-sch-daycol", children: [
      /* @__PURE__ */ e("div", { className: "avakio-sch-day-header", children: yt(N) }),
      /* @__PURE__ */ e("div", { className: "avakio-sch-day-events", children: Ve(N) })
    ] }, N.toISOString())) }) }),
    h === "day" && /* @__PURE__ */ g("div", { className: "avakio-sch-day", children: [
      /* @__PURE__ */ e("div", { className: "avakio-sch-day-header", children: yt(ce[0]) }),
      /* @__PURE__ */ e("div", { className: "avakio-sch-day-events", children: Ve(ce[0]) })
    ] })
  ] });
}
function Gn({
  data: a,
  collapsed: n = !1,
  position: i = "left",
  collapsedWidth: o = 41,
  width: l = 250,
  activeTitle: y = !0,
  titleHeight: x = 40,
  multipleOpen: A = !1,
  onSelect: O,
  onToggle: T,
  className: v = "",
  mobileBreakpoint: D = 768,
  tabletBreakpoint: j = 1024,
  autoCloseMobile: te = !0,
  showOverlay: W = !0,
  onOverlayClick: I,
  showMobileDongle: V = !0,
  dongleIcon: J,
  id: H,
  testId: K
}) {
  const [_, h] = q(n), [ae, $] = q({}), [z, S] = q(null), [L, t] = q(null), [P, w] = q(!1), [F, he] = q(!1);
  Pe.useEffect(() => {
    const p = () => {
      const U = window.innerWidth, ue = U < D, G = U >= D && U < j;
      w(ue), he(G), h(!!(ue || G));
    };
    return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p);
  }, [D, j]), Pe.useEffect(() => {
    h(n);
  }, [n]), Pe.useEffect(() => (P && !_ ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
    document.body.style.overflow = "";
  }), [P, _]), ve(() => {
    const p = !_;
    h(p), T && T(p);
  }, [_, T]);
  const le = ve(
    (p, U) => {
      !U || !y || $((ue) => A ? { ...ue, [p]: !ue[p] } : { [p]: !ue[p] });
    },
    [A, y]
  ), d = ve(
    (p, U, ue = 0, G) => {
      if (_ && U) {
        h(!1);
        return;
      }
      t(p.id), O && O(p), (P || F) && te && (ue > 0 || !U) ? (F && ue > 0 && G && t(G), h(!0)) : U && !_ && le(p.id, U);
    },
    [le, O, P, F, te, _]
  ), f = ve(() => {
    I ? I() : h(!0);
  }, [I]), k = (p) => p ? /* @__PURE__ */ e("span", { className: "avakio-sidebar-icon", children: p }) : null, E = (p, U, ue) => !p || ue === 0 ? null : /* @__PURE__ */ e("span", { className: `avakio-sidebar-arrow ${U ? "open" : ""}`, children: /* @__PURE__ */ e("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M4 3l4 3-4 3V3z" }) }) }), Z = (p, U = 0, ue) => {
    const G = !!(p.data && p.data.length > 0), Y = ae[p.id] || !1, ce = L === p.id, ne = z === p.id;
    return /* @__PURE__ */ g("div", { className: "avakio-sidebar-item-wrapper", children: [
      /* @__PURE__ */ g(
        "div",
        {
          className: [
            "avakio-sidebar-item",
            `level-${U}`,
            ce ? "selected" : "",
            G ? "has-children" : ""
          ].filter(Boolean).join(" "),
          onClick: () => d(p, G, U, ue),
          onMouseEnter: () => S(p.id),
          onMouseLeave: () => S(null),
          style: {
            paddingLeft: U === 0 ? void 0 : `${16 + U * 20}px`,
            minHeight: U === 0 ? `${x}px` : void 0
          },
          children: [
            E(G, Y, U),
            k(p.icon),
            !_ && /* @__PURE__ */ e("span", { className: "avakio-sidebar-value", children: p.value })
          ]
        }
      ),
      _ && ne && U === 0 && /* @__PURE__ */ g(
        "div",
        {
          className: `avakio-sidebar-popup ${i === "right" ? "popup-left" : "popup-right"}`,
          style: { minHeight: `${x}px` },
          children: [
            /* @__PURE__ */ e("div", { className: "avakio-sidebar-popup-title", children: p.value }),
            G && /* @__PURE__ */ e("div", { className: "avakio-sidebar-popup-children", children: p.data?.map((ie) => /* @__PURE__ */ g(
              "div",
              {
                className: `avakio-sidebar-popup-item ${L === ie.id ? "selected" : ""}`,
                onClick: (M) => {
                  M.stopPropagation(), d(ie, !1, 1, p.id);
                },
                children: [
                  k(ie.icon),
                  /* @__PURE__ */ e("span", { className: "avakio-sidebar-value", children: ie.value })
                ]
              },
              ie.id
            )) })
          ]
        }
      ),
      !_ && G && Y && /* @__PURE__ */ e("div", { className: "avakio-sidebar-children", children: p.data?.map((ie) => Z(ie, U + 1, U === 0 ? p.id : ue)) })
    ] }, p.id);
  };
  return /* @__PURE__ */ g(et, { children: [
    P && !_ && W && /* @__PURE__ */ e(
      "div",
      {
        className: "avakio-sidebar-overlay",
        onClick: f,
        "aria-hidden": "true"
      }
    ),
    P && _ && V && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: `avakio-sidebar-mobile-dongle position-${i}`,
        onClick: () => h(!1),
        "aria-label": "Open sidebar",
        children: J || /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z" }) })
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        id: H,
        "data-testid": K,
        className: [
          "avakio-sidebar",
          _ ? "collapsed" : "expanded",
          `position-${i}`,
          P ? "mobile" : "desktop",
          v
        ].filter(Boolean).join(" "),
        style: {
          width: _ ? `${o}px` : `${l}px`
        },
        children: /* @__PURE__ */ e("div", { className: "avakio-sidebar-content", children: a.map((p) => Z(p)) })
      }
    )
  ] });
}
function Xn({
  onClick: a,
  className: n = "",
  icon: i,
  isCollapsed: o = !1
}) {
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      className: `avakio-sidebar-toggle-button ${o ? "collapsed" : "expanded"} ${n}`,
      onClick: a,
      "aria-label": o ? "Expand sidebar" : "Collapse sidebar",
      children: i || /* @__PURE__ */ e("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ e("path", { d: "M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z" }) })
    }
  );
}
const Za = (a) => {
  const n = typeof a == "string" ? new Date(a) : a, i = /* @__PURE__ */ new Date(), o = i.getTime() - n.getTime(), l = Math.floor(o / 6e4), y = Math.floor(o / 36e5), x = Math.floor(o / 864e5);
  return l < 1 ? "Just now" : l < 60 ? `${l}m ago` : y < 24 ? `${y}h ago` : x < 7 ? `${x}d ago` : n.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: n.getFullYear() !== i.getFullYear() ? "numeric" : void 0
  });
}, Et = () => `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, Qa = He(
  ({
    id: a,
    testId: n,
    theme: i,
    data: o = [],
    users: l = [],
    currentUser: y,
    mode: x = "default",
    readonly: A = !1,
    sendAction: O = "enter",
    placeholder: T = "Write a comment...",
    moreButtonLabel: v = "Load more comments",
    hasMore: D = !1,
    mentions: j = !1,
    keepButtonVisible: te = !1,
    borderless: W = !1,
    css: I,
    className: V = "",
    width: J,
    height: H,
    disabled: K = !1,
    onAdd: _,
    onDelete: h,
    onEdit: ae,
    onLoadMore: $,
    onUserMentioned: z,
    dateFormatter: S = Za,
    renderAvatar: L
  }, t) => {
    const P = Ce(null), w = Ce(null), F = Ce(null), [he, le] = q(o), [d, f] = q(K), [k, E] = q(""), [Z, p] = q(null), [U, ue] = q(""), [G, Y] = q(null), [ce, ne] = q(!1), [ie, M] = q(""), [m, r] = q(y);
    be(() => {
      le(o);
    }, [o]), be(() => {
      f(K);
    }, [K]), be(() => {
      r(y);
    }, [y]);
    const R = Ie(() => {
      const s = [...he].sort((C, c) => {
        const X = new Date(C.date).getTime(), b = new Date(c.date).getTime();
        return x === "chat" ? b - X : X - b;
      });
      return x === "chat" ? s.reverse() : s;
    }, [he, x]), ee = ve((s) => {
      if (s)
        return l.find((C) => C.id === s);
    }, [l]), de = Ie(() => {
      if (!ie) return l;
      const s = ie.toLowerCase();
      return l.filter((C) => C.value.toLowerCase().includes(s));
    }, [l, ie]), me = ve(() => {
      if (!k.trim() || d || A) return;
      const s = {
        id: Et(),
        user_id: m,
        date: /* @__PURE__ */ new Date(),
        text: k.trim()
      };
      if (le((C) => [...C, s]), E(""), _?.(s), j) {
        const C = /@"([^"]+)"/g;
        let c;
        for (; (c = C.exec(s.text)) !== null; ) {
          const X = l.find((b) => b.value === c[1]);
          X && z?.(X.id, s);
        }
      }
      setTimeout(() => {
        F.current && (F.current.scrollTop = F.current.scrollHeight);
      }, 100);
    }, [k, d, A, m, j, l, x, _, z]), Ne = (s) => {
      (O === "enter" && s.key === "Enter" && !s.shiftKey || O === "shift+enter" && s.key === "Enter" && s.shiftKey) && (s.preventDefault(), me()), j && s.key === "@" && (ne(!0), M(""));
    }, Ae = (s) => {
      const C = s.target.value;
      if (E(C), j && ce) {
        const c = C.lastIndexOf("@");
        c !== -1 && M(C.slice(c + 1));
      }
    }, Se = (s) => {
      const C = k.lastIndexOf("@");
      if (C !== -1) {
        const c = k.slice(0, C) + `@"${s.value}" `;
        E(c);
      }
      ne(!1), M(""), w.current?.focus();
    }, _e = (s) => {
      le((C) => C.filter((c) => c.id !== s)), Y(null), h?.(s);
    }, Ve = (s) => {
      p(s.id), ue(s.text), Y(null);
    }, N = (s) => {
      if (!U.trim()) return;
      le((c) => c.map(
        (X) => X.id === s ? { ...X, text: U.trim() } : X
      ));
      const C = he.find((c) => c.id === s);
      C && ae?.({ ...C, text: U.trim() }), p(null), ue("");
    }, se = () => {
      p(null), ue("");
    }, ke = (s) => {
      if (s?.image)
        return /* @__PURE__ */ e("img", { src: s.image, alt: s.value, className: "avakio-comment-avatar-img" });
      const C = s?.value ? s.value.split(" ").map((c) => c[0]).join("").toUpperCase().slice(0, 2) : "?";
      return /* @__PURE__ */ e("span", { className: "avakio-comment-avatar-initials", children: C });
    }, xe = (s) => j ? s.split(/(@"[^"]+")/).filter(Boolean).map((c, X) => {
      if (c.startsWith('@"') && c.endsWith('"')) {
        const b = c.slice(2, -1);
        return /* @__PURE__ */ g("span", { className: "avakio-comment-mention", children: [
          "@",
          b
        ] }, X);
      }
      return c;
    }) : s;
    We(t, () => ({
      getNode: () => P.current,
      getComments: () => he,
      add: (s) => {
        const C = {
          ...s,
          id: Et()
        };
        le((c) => [...c, C]), _?.(C);
      },
      remove: (s) => {
        le((C) => C.filter((c) => c.id !== s)), h?.(s);
      },
      edit: (s) => {
        const C = he.find((c) => c.id === s);
        C && Ve(C);
      },
      getUsers: () => l,
      setCurrentUser: (s) => r(s),
      focus: () => w.current?.focus(),
      isEnabled: () => !d,
      enable: () => f(!1),
      disable: () => f(!0),
      clear: () => le([])
    }), [he, l, d, _, h]);
    const u = [
      "avakio-comment",
      i && `avakio-comment-theme-${i}`,
      x === "chat" && "avakio-comment-mode-chat",
      W && "avakio-comment-borderless",
      d && "avakio-comment-disabled",
      A && "avakio-comment-readonly",
      V
    ].filter(Boolean).join(" "), oe = {
      ...I && typeof I == "object" && !Array.isArray(I) ? I : {},
      width: typeof J == "number" ? `${J}px` : J,
      height: typeof H == "number" ? `${H}px` : H
    };
    return /* @__PURE__ */ g(
      "div",
      {
        ref: P,
        id: a,
        "data-testid": n,
        "data-admin-theme": i,
        className: u,
        style: oe,
        children: [
          /* @__PURE__ */ g("div", { ref: F, className: "avakio-comment-list", children: [
            x === "chat" && D && /* @__PURE__ */ e(
              "button",
              {
                className: "avakio-comment-more-btn",
                onClick: $,
                disabled: d,
                children: v
              }
            ),
            R.map((s) => {
              const C = ee(s.user_id), c = m !== void 0 && s.user_id === m, X = Z === s.id;
              return /* @__PURE__ */ g("div", { className: "avakio-comment-item", children: [
                /* @__PURE__ */ g("div", { className: "avakio-comment-avatar", children: [
                  L ? L(C) : ke(C),
                  C?.status && C.status !== "none" && /* @__PURE__ */ e("span", { className: `avakio-comment-status avakio-comment-status-${C.status}` })
                ] }),
                /* @__PURE__ */ g("div", { className: "avakio-comment-content", children: [
                  /* @__PURE__ */ g("div", { className: "avakio-comment-header", children: [
                    /* @__PURE__ */ e("span", { className: "avakio-comment-author", children: C?.value || "Anonymous" }),
                    /* @__PURE__ */ e("span", { className: "avakio-comment-date", children: S(s.date) }),
                    c && !A && !X && /* @__PURE__ */ g("div", { className: "avakio-comment-menu-wrapper", children: [
                      /* @__PURE__ */ e(
                        "button",
                        {
                          className: "avakio-comment-menu-btn",
                          onClick: () => Y(G === s.id ? null : s.id),
                          children: /* @__PURE__ */ e(ka, { size: 16 })
                        }
                      ),
                      G === s.id && /* @__PURE__ */ g("div", { className: "avakio-comment-menu", children: [
                        /* @__PURE__ */ g("button", { onClick: () => Ve(s), children: [
                          /* @__PURE__ */ e(Ea, { size: 14 }),
                          "Edit"
                        ] }),
                        /* @__PURE__ */ g("button", { onClick: () => _e(s.id), children: [
                          /* @__PURE__ */ e(za, { size: 14 }),
                          "Delete"
                        ] })
                      ] })
                    ] })
                  ] }),
                  X ? /* @__PURE__ */ g("div", { className: "avakio-comment-edit", children: [
                    /* @__PURE__ */ e(
                      "textarea",
                      {
                        value: U,
                        onChange: (b) => ue(b.target.value),
                        className: "avakio-comment-edit-input",
                        autoFocus: !0
                      }
                    ),
                    /* @__PURE__ */ g("div", { className: "avakio-comment-edit-actions", children: [
                      /* @__PURE__ */ e(
                        "button",
                        {
                          className: "avakio-comment-edit-save",
                          onClick: () => N(s.id),
                          children: /* @__PURE__ */ e(pt, { size: 14 })
                        }
                      ),
                      /* @__PURE__ */ e(
                        "button",
                        {
                          className: "avakio-comment-edit-cancel",
                          onClick: se,
                          children: /* @__PURE__ */ e(Je, { size: 14 })
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ e("div", { className: "avakio-comment-text", children: xe(s.text) })
                ] })
              ] }, s.id);
            }),
            x === "default" && D && /* @__PURE__ */ e(
              "button",
              {
                className: "avakio-comment-more-btn",
                onClick: $,
                disabled: d,
                children: v
              }
            ),
            R.length === 0 && /* @__PURE__ */ e("div", { className: "avakio-comment-empty", children: "No comments yet. Be the first to comment!" })
          ] }),
          !A && /* @__PURE__ */ g("div", { className: "avakio-comment-input-area", children: [
            /* @__PURE__ */ g("div", { className: "avakio-comment-input-wrapper", children: [
              /* @__PURE__ */ e(
                "textarea",
                {
                  ref: w,
                  value: k,
                  onChange: Ae,
                  onKeyDown: Ne,
                  placeholder: T,
                  className: "avakio-comment-input",
                  disabled: d,
                  rows: 1
                }
              ),
              ce && de.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-comment-mentions", children: de.map((s) => /* @__PURE__ */ g(
                "button",
                {
                  className: "avakio-comment-mention-item",
                  onClick: () => Se(s),
                  children: [
                    /* @__PURE__ */ e("div", { className: "avakio-comment-mention-avatar", children: ke(s) }),
                    /* @__PURE__ */ e("span", { children: s.value })
                  ]
                },
                s.id
              )) })
            ] }),
            (te || k.trim()) && /* @__PURE__ */ e(
              "button",
              {
                className: "avakio-comment-send-btn",
                onClick: me,
                disabled: d || !k.trim(),
                children: /* @__PURE__ */ e(Ra, { size: 18 })
              }
            )
          ] })
        ]
      }
    );
  }
);
Qa.displayName = "AvakioComment";
const ot = Pe.createContext(null), en = ({ children: a, value: n, defaultValue: i, onValueChange: o, disabled: l }) => {
  const [y, x] = q(i || ""), [A, O] = q(!1), T = n !== void 0 ? n : y, v = (D) => {
    n === void 0 && x(D), o?.(D), O(!1);
  };
  return /* @__PURE__ */ e(ot.Provider, { value: { value: T, onValueChange: v, open: A, setOpen: O }, children: /* @__PURE__ */ e("div", { style: { position: "relative", display: "inline-block" }, children: a }) });
}, tn = ({ children: a, className: n, ...i }) => {
  const o = Pe.useContext(ot);
  if (!o) throw new Error("SelectTrigger must be used within Select");
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      className: n,
      onClick: () => o.setOpen(!o.open),
      ...i,
      children: a
    }
  );
}, an = ({ placeholder: a, ...n }) => {
  const i = Pe.useContext(ot);
  if (!i) throw new Error("SelectValue must be used within Select");
  return /* @__PURE__ */ e("span", { ...n, children: i.value || a });
}, nn = ({ children: a, className: n, ...i }) => {
  const o = Pe.useContext(ot), l = Ce(null);
  if (!o) throw new Error("SelectContent must be used within Select");
  return be(() => {
    const y = (x) => {
      l.current && !l.current.contains(x.target) && o.setOpen(!1);
    };
    return o.open && document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [o.open]), o.open ? /* @__PURE__ */ e(
    "div",
    {
      ref: l,
      className: n,
      style: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 50,
        minWidth: "8rem",
        background: "var(--view-background-color, white)",
        border: "1px solid var(--view-border-color, #e5e7eb)",
        borderRadius: "6px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        marginTop: "4px",
        overflow: "hidden"
      },
      ...i,
      children: a
    }
  ) : null;
}, ht = ({ children: a, value: n, className: i, ...o }) => {
  const l = Pe.useContext(ot);
  if (!l) throw new Error("SelectItem must be used within Select");
  const y = l.value === n;
  return /* @__PURE__ */ e(
    "div",
    {
      className: i,
      style: {
        padding: "8px 12px",
        cursor: "pointer",
        background: y ? "var(--view-hover-color, #f3f4f6)" : "transparent",
        fontSize: "14px"
      },
      onClick: () => l.onValueChange(n),
      onMouseEnter: (x) => {
        x.target.style.background = "var(--view-hover-color, #f3f4f6)";
      },
      onMouseLeave: (x) => {
        x.target.style.background = y ? "var(--view-hover-color, #f3f4f6)" : "transparent";
      },
      ...o,
      children: a
    }
  );
};
function Jn({
  id: a = "avakio-datatable",
  data: n,
  spans: i,
  columns: o,
  height: l = "auto",
  width: y = "100%",
  select: x = !1,
  multiselect: A = !1,
  rowHeight: O = 40,
  headerHeight: T = 44,
  fixedRowNumber: v = 0,
  hover: D = !0,
  resizable: j = !0,
  sortable: te = !0,
  filterable: W = !0,
  paging: I = !1,
  pageSize: V = 20,
  autoConfig: J = !1,
  scroll: H = "xy",
  css: K = "",
  serverSide: _ = !1,
  onRowClick: h,
  onRowDoubleClick: ae,
  onSelectChange: $,
  onSort: z,
  onFilter: S,
  loading: L = !1,
  emptyText: t = "No data available",
  totalCount: P,
  currentPage: w = 1,
  onPageChange: F,
  onPageSizeChange: he,
  testId: le
}) {
  const [d, f] = q(/* @__PURE__ */ new Set()), [k, E] = q(null), [Z, p] = q("asc"), U = Ie(() => {
    const c = /* @__PURE__ */ new Map();
    return !i || i.length === 0 || i.forEach(([X, b, Q, re, ye, B]) => {
      const pe = String(X), $e = `${pe}-${b}`;
      c.set($e, { skip: !1, colspan: Q, rowspan: re, value: ye, cssClass: B });
      const De = o.findIndex((Te) => Te.id === b);
      if (De !== -1)
        for (let Te = 1; Te < Q; Te++) {
          const je = o[De + Te];
          je && c.set(`${pe}-${je.id}`, { skip: !0 });
        }
      const Ee = n.map((Te) => String(Te.id || Te.Id)), Re = Ee.indexOf(pe);
      if (Re !== -1)
        for (let Te = 1; Te < re; Te++) {
          const je = Re + Te;
          if (je < Ee.length) {
            const Ue = Ee[je];
            c.set(`${Ue}-${b}`, { skip: !0 });
            for (let fe = 1; fe < Q; fe++) {
              const ge = o[De + fe];
              ge && c.set(`${Ue}-${ge.id}`, { skip: !0 });
            }
          }
        }
    }), c;
  }, [i, o, n]), [ue, G] = q({}), [Y, ce] = q({}), [ne, ie] = q(w), [M, m] = q(V), [r, R] = q(null), [ee, de] = q(0), [me, Ne] = q(0);
  be(() => {
    ie(w);
  }, [w]);
  const Ae = Ie(() => {
    if (_) return n;
    let c = [...n];
    return Object.entries(ue).forEach(([X, b]) => {
      if (!b || Array.isArray(b) && b.length === 0) return;
      const Q = o.find((re) => re.id === X);
      c = c.filter((re) => {
        const ye = re[X];
        if (Q?.filterType === "multicombo" && Array.isArray(b) && b.length > 0) {
          const B = String(ye || "").toLowerCase();
          return b.some((pe) => B.includes(pe.toLowerCase()));
        }
        if (Q?.filterType === "combo" && b) {
          const B = String(ye || "").toLowerCase(), pe = String(b).toLowerCase();
          return B.includes(pe);
        }
        if (Q?.filterType === "date" && ye) {
          const B = String(ye).split("T")[0], pe = String(b).split("T")[0];
          return B === pe;
        }
        return typeof b == "string" && b.trim() ? String(ye || "").toLowerCase().includes(b.toLowerCase()) : !0;
      });
    }), c;
  }, [n, ue, o, _]), Se = Ie(() => _ || !k ? Ae : [...Ae].sort((c, X) => {
    const b = c[k], Q = X[k];
    if (b == null) return 1;
    if (Q == null) return -1;
    let re = 0;
    return typeof b == "number" && typeof Q == "number" ? re = b - Q : re = String(b).localeCompare(String(Q)), Z === "asc" ? re : -re;
  }), [Ae, k, Z, _]), _e = Ie(() => {
    if (_) return n;
    if (!I) return Se;
    const c = (ne - 1) * M;
    return Se.slice(c, c + M);
  }, [Se, I, ne, M, _, n]), Ve = Math.ceil((P || Se.length) / M), N = ve((c) => {
    if (!te) return;
    const X = k === c && Z === "asc" ? "desc" : "asc";
    E(c), p(X), z && z(c, X);
  }, [te, k, Z, z]), se = ve((c, X) => {
    const b = { ...ue, [c]: X };
    G(b), ie(1), S && S(b);
  }, [ue, S]), ke = ve((c, X, b) => {
    x && (A && (b.ctrlKey || b.metaKey) ? f((Q) => {
      const re = new Set(Q);
      return re.has(X) ? re.delete(X) : re.add(X), re;
    }) : f(/* @__PURE__ */ new Set([X]))), h && h(c, X);
  }, [x, A, h]), xe = ve((c, X) => {
    ae && ae(c, X);
  }, [ae]), u = ve((c, X) => {
    if (!j) return;
    X.preventDefault(), X.stopPropagation();
    const b = o.find((re) => re.id === c), Q = Y[c] || (typeof b?.width == "number" ? b.width : 150);
    R(c), de(X.clientX), Ne(Q);
  }, [j, o, Y]);
  be(() => {
    if (!r) return;
    const c = (b) => {
      const Q = b.clientX - ee, re = Math.max(50, me + Q);
      ce((ye) => ({ ...ye, [r]: re }));
    }, X = () => {
      R(null);
    };
    return document.addEventListener("mousemove", c), document.addEventListener("mouseup", X), () => {
      document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", X);
    };
  }, [r, ee, me]), be(() => {
    if ($) {
      const c = Array.from(d).map((X) => _e[X]).filter(Boolean);
      $(c);
    }
  }, [d, _e, $]);
  const oe = (c) => {
    const X = Y[c.id];
    return X ? `${X}px` : c.width ? typeof c.width == "number" ? `${c.width}px` : c.width : "auto";
  }, s = (c, X) => {
    if (c.template)
      return c.template(X);
    const b = X[c.id];
    return c.format ? c.format(b) : b != null ? String(b) : "";
  }, C = o.filter((c) => !c.hidden);
  return /* @__PURE__ */ g(
    "div",
    {
      id: a,
      "data-testid": le,
      className: `avakio-datatable ${K}`,
      style: {
        height: typeof l == "number" ? `${l}px` : l,
        width: typeof y == "number" ? `${y}px` : y
      },
      children: [
        /* @__PURE__ */ g("div", { className: "avakio-datatable-header", style: { minHeight: `${T}px` }, children: [
          /* @__PURE__ */ e("div", { className: "avakio-datatable-header-row", children: C.map((c) => /* @__PURE__ */ g(
            "div",
            {
              className: `avakio-datatable-header-cell ${c.headerCssClass || ""} ${k === c.id ? "sorted" : ""}`,
              style: {
                width: oe(c),
                minWidth: c.minWidth ? `${c.minWidth}px` : void 0,
                maxWidth: c.maxWidth ? `${c.maxWidth}px` : void 0,
                textAlign: c.align || "left"
              },
              children: [
                /* @__PURE__ */ g(
                  "div",
                  {
                    className: "avakio-datatable-header-content",
                    onClick: () => te && c.sort !== !1 && N(c.id),
                    children: [
                      /* @__PURE__ */ e("span", { className: "avakio-datatable-header-text", children: c.header }),
                      te && c.sort !== !1 && /* @__PURE__ */ e("span", { className: "avakio-datatable-sort-icon", children: k === c.id ? Z === "asc" ? /* @__PURE__ */ e(ia, { className: "h-4 w-4" }) : /* @__PURE__ */ e(tt, { className: "h-4 w-4" }) : /* @__PURE__ */ e(ha, { className: "h-4 w-4 opacity-40" }) })
                    ]
                  }
                ),
                j && c.resizable !== !1 && /* @__PURE__ */ e(
                  "div",
                  {
                    className: "avakio-datatable-resize-handle",
                    onMouseDown: (X) => u(c.id, X)
                  }
                )
              ]
            },
            c.id
          )) }),
          W && /* @__PURE__ */ e("div", { className: "avakio-datatable-filter-row", children: C.map((c) => /* @__PURE__ */ e(
            "div",
            {
              className: "avakio-datatable-filter-cell",
              style: {
                width: oe(c),
                minWidth: c.minWidth ? `${c.minWidth}px` : void 0,
                maxWidth: c.maxWidth ? `${c.maxWidth}px` : void 0
              },
              children: c.filterable !== !1 && /* @__PURE__ */ e(et, { children: c.filterComponent ? c.filterComponent(ue[c.id], (X) => se(c.id, X)) : /* @__PURE__ */ g("div", { className: "avakio-datatable-filter-input-wrapper", children: [
                /* @__PURE__ */ e(it, { className: "h-3 w-3 text-muted-foreground" }),
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "text",
                    className: "avakio-datatable-filter-input",
                    placeholder: "Filter...",
                    value: ue[c.id] || "",
                    onChange: (X) => se(c.id, X.target.value)
                  }
                ),
                ue[c.id] && /* @__PURE__ */ e(
                  "button",
                  {
                    className: "avakio-datatable-filter-clear",
                    onClick: () => se(c.id, ""),
                    children: /* @__PURE__ */ e(Je, { className: "h-3 w-3" })
                  }
                )
              ] }) })
            },
            c.id
          )) })
        ] }),
        /* @__PURE__ */ e(
          "div",
          {
            className: `avakio-datatable-body ${H ? `scroll-${H}` : ""} scrollbar-visible`,
            style: {
              height: typeof l == "number" ? `${l - T - (I ? 50 : 0)}px` : "auto"
            },
            children: L ? /* @__PURE__ */ g("div", { className: "avakio-datatable-loading", children: [
              /* @__PURE__ */ e("div", { className: "avakio-datatable-spinner" }),
              /* @__PURE__ */ e("p", { children: "Loading data..." })
            ] }) : _e.length === 0 ? /* @__PURE__ */ e("div", { className: "avakio-datatable-empty", children: /* @__PURE__ */ e("p", { children: t }) }) : /* @__PURE__ */ e("div", { className: "avakio-datatable-rows", children: _e.map((c, X) => {
              const b = c.id !== void 0 ? `row-${c.id}` : X, Q = String(c.id || c.Id);
              return /* @__PURE__ */ e(
                "div",
                {
                  className: `avakio-datatable-row ${d.has(X) ? "selected" : ""} ${D ? "hover" : ""}`,
                  style: { height: `${O}px` },
                  onClick: (re) => ke(c, X, re),
                  onDoubleClick: () => xe(c, X),
                  children: C.map((re) => {
                    const ye = `${Q}-${re.id}`, B = U.get(ye);
                    if (B && B.skip)
                      return null;
                    const pe = [
                      "avakio-datatable-cell",
                      re.cssClass || "",
                      B?.cssClass || ""
                    ].filter(Boolean).join(" ");
                    return /* @__PURE__ */ e(
                      "div",
                      {
                        className: pe,
                        style: {
                          width: oe(re),
                          minWidth: re.minWidth ? `${re.minWidth}px` : void 0,
                          maxWidth: re.maxWidth ? `${re.maxWidth}px` : void 0,
                          textAlign: re.align || "left"
                        },
                        ...B?.colspan && B.colspan > 1 ? { "data-colspan": B.colspan } : {},
                        ...B?.rowspan && B.rowspan > 1 ? { "data-rowspan": B.rowspan } : {},
                        children: B?.value !== void 0 ? B.value : s(re, c)
                      },
                      re.id
                    );
                  })
                },
                b
              );
            }) })
          }
        ),
        I && !L && _e.length > 0 && /* @__PURE__ */ g("div", { className: "avakio-datatable-footer", children: [
          /* @__PURE__ */ g("div", { className: "avakio-datatable-footer-info", children: [
            "Showing ",
            (ne - 1) * M + 1,
            " to",
            " ",
            Math.min(ne * M, P || Se.length),
            " of",
            " ",
            P || Se.length,
            " records"
          ] }),
          /* @__PURE__ */ g("div", { className: "avakio-datatable-pagination", children: [
            /* @__PURE__ */ g(
              en,
              {
                value: String(M),
                onValueChange: (c) => {
                  const X = Number(c);
                  m(X), ie(1), _ && he && he(X);
                },
                children: [
                  /* @__PURE__ */ e(tn, { className: "avakio-datatable-page-size-select", children: /* @__PURE__ */ e(an, {}) }),
                  /* @__PURE__ */ g(nn, { children: [
                    /* @__PURE__ */ e(ht, { value: "10", children: "10 / page" }),
                    /* @__PURE__ */ e(ht, { value: "20", children: "20 / page" }),
                    /* @__PURE__ */ e(ht, { value: "50", children: "50 / page" }),
                    /* @__PURE__ */ e(ht, { value: "100", children: "100 / page" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ g("div", { className: "avakio-datatable-pagination-controls", children: [
              /* @__PURE__ */ e(
                kt,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    const c = Math.max(1, ne - 1);
                    ie(c), F?.(c);
                  },
                  disabled: ne === 1,
                  children: /* @__PURE__ */ e(Ze, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ g("span", { className: "avakio-datatable-page-info", children: [
                "Page ",
                ne,
                " of ",
                Ve
              ] }),
              /* @__PURE__ */ e(
                kt,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    const c = Math.min(Ve, ne + 1);
                    ie(c), F?.(c);
                  },
                  disabled: ne === Ve,
                  children: /* @__PURE__ */ e(Ge, { className: "h-4 w-4" })
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Zn({
  items: a,
  theme: n,
  onItemClick: i,
  className: o,
  style: l,
  dense: y,
  orientation: x = "vertical",
  variant: A = "default"
}) {
  const O = ["avakio-timeline", y ? "is-dense" : "", o || ""].filter(Boolean);
  x === "horizontal" && O.push("is-horizontal"), x === "vertical" && A === "split" && O.push("is-vertical-split"), x === "horizontal" && A === "colorband" && O.push("is-horizontal-colorband");
  const T = /* @__PURE__ */ e(
    "div",
    {
      className: O.join(" ").trim(),
      "data-admin-theme": n,
      style: l,
      children: a.map((D, j) => {
        const te = j === a.length - 1, W = D.status ? `av-tl-dot-${D.status}` : "", I = A === "split", V = I ? void 0 : D.date || D.meta || D.time, J = !0, H = !!i, K = () => i?.(D), _ = (h) => {
          i && (h.key === "Enter" || h.key === " ") && (h.preventDefault(), i(D));
        };
        return /* @__PURE__ */ g(
          "div",
          {
            className: ["av-tl-row", H ? "is-clickable" : ""].join(" ").trim(),
            onClick: K,
            role: H ? "button" : void 0,
            tabIndex: H ? 0 : void 0,
            onKeyDown: _,
            children: [
              /* @__PURE__ */ e("div", { className: "av-tl-date", children: V }),
              /* @__PURE__ */ g("div", { className: ["av-tl-marker", te ? "is-last" : ""].join(" ").trim(), children: [
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: ["av-tl-dot", W].join(" ").trim(),
                    style: D.color ? { background: D.color, boxShadow: `0 0 0 3px ${D.color}1a` } : void 0,
                    children: A === "split" ? D.id : void 0
                  }
                ),
                !te && J && /* @__PURE__ */ e("span", { className: "av-tl-line" })
              ] }),
              /* @__PURE__ */ g("div", { className: "av-tl-card", children: [
                /* @__PURE__ */ g("div", { className: "av-tl-card-head", children: [
                  I && D.date && /* @__PURE__ */ e("div", { className: "av-tl-date-inline", children: D.date }),
                  /* @__PURE__ */ e("div", { className: "av-tl-title", children: D.title })
                ] }),
                D.subtitle && /* @__PURE__ */ e("div", { className: "av-tl-subtitle", children: D.subtitle }),
                D.description && /* @__PURE__ */ e("div", { className: "av-tl-desc", children: D.description })
              ] })
            ]
          },
          D.id
        );
      })
    }
  ), v = /* @__PURE__ */ e(
    "div",
    {
      className: O.join(" ").trim(),
      "data-admin-theme": n,
      style: l,
      children: /* @__PURE__ */ e("div", { className: "av-tl-h-track", children: a.map((D, j) => {
        const te = j === 0, W = j === a.length - 1, I = D.status ? `av-tl-dot-${D.status}` : "", V = A === "colorband", J = V ? void 0 : D.date || D.meta || D.time, H = !!i, K = () => i?.(D), _ = (ae) => {
          i && (ae.key === "Enter" || ae.key === " ") && (ae.preventDefault(), i(D));
        }, h = V ? j % 2 === 0 ? "is-top" : "is-bottom" : "";
        return /* @__PURE__ */ g(
          "div",
          {
            className: ["av-tl-h-item", te ? "is-first" : "", W ? "is-last" : "", H ? "is-clickable" : "", h].join(" ").trim(),
            onClick: K,
            role: H ? "button" : void 0,
            tabIndex: H ? 0 : void 0,
            onKeyDown: _,
            children: [
              !V && /* @__PURE__ */ e("div", { className: "av-tl-h-date", children: J }),
              /* @__PURE__ */ e("div", { className: ["av-tl-h-dotwrap", te ? "is-first" : "", W ? "is-last" : ""].join(" ").trim(), children: /* @__PURE__ */ e("span", { className: ["av-tl-dot", I].join(" ").trim(), style: D.color ? { background: D.color, boxShadow: `0 0 0 3px ${D.color}1a` } : void 0 }) }),
              /* @__PURE__ */ g("div", { className: "av-tl-h-card", children: [
                V && D.date && /* @__PURE__ */ e("div", { className: "av-tl-h-date-inline", children: D.date }),
                /* @__PURE__ */ e("div", { className: "av-tl-h-title", children: D.title }),
                D.description && /* @__PURE__ */ e("div", { className: "av-tl-h-desc", children: D.description })
              ] })
            ]
          },
          D.id
        );
      }) })
    }
  );
  return x === "horizontal" ? v : T;
}
function jt(a, n, i = null, o = 0) {
  a.forEach((l) => {
    n.set(l.id, { node: l, parentId: i, depth: o }), l.data && l.data.length > 0 && jt(l.data, n, l.id, o + 1);
  });
}
function ft(a) {
  const n = [];
  return a.data && a.data.forEach((i) => {
    n.push(i.id), n.push(...ft(i));
  }), n;
}
function vt(a) {
  const n = [];
  return a.forEach((i) => {
    n.push(i.id), i.data && n.push(...vt(i.data));
  }), n;
}
const sn = He(
  ({
    id: a,
    testId: n,
    data: i,
    select: o = !0,
    checkbox: l = !1,
    threeState: y = !1,
    showIcons: x = !0,
    showToggle: A = !0,
    showLines: O = !1,
    navigation: T = !0,
    drag: v = !1,
    editable: D = !1,
    theme: j,
    filterMode: te,
    itemHeight: W = 32,
    width: I,
    height: V,
    className: J = "",
    style: H,
    onSelect: K,
    onSelectChange: _,
    onClick: h,
    onDblClick: ae,
    onOpen: $,
    onClose: z,
    onCheck: S,
    onEdit: L,
    onContext: t
  }, P) => {
    const w = Ce(null), F = Nt(), he = a || `avakio-tree-${F}`, [le, d] = q(/* @__PURE__ */ new Set()), [f, k] = q(() => {
      const u = /* @__PURE__ */ new Set(), oe = (s) => {
        s.forEach((C) => {
          C.open && u.add(C.id), C.data && oe(C.data);
        });
      };
      return oe(i), u;
    }), [E, Z] = q(() => {
      const u = /* @__PURE__ */ new Set(), oe = (s) => {
        s.forEach((C) => {
          C.checked === !0 && u.add(C.id), C.data && oe(C.data);
        });
      };
      return oe(i), u;
    }), [p, U] = q(null), [ue, G] = q(null), [Y, ce] = q(""), [ne, ie] = q(null), [, M] = q({}), m = Ce(/* @__PURE__ */ new Map());
    be(() => {
      m.current.clear(), jt(i, m.current);
    }, [i]);
    const r = ve(
      (u) => {
        if (!y)
          return E.has(u);
        const oe = m.current.get(u);
        if (!oe) return !1;
        const { node: s } = oe;
        if (!s.data || s.data.length === 0)
          return E.has(u);
        const C = ft(s), c = C.filter((X) => E.has(X)).length;
        return c === 0 ? !1 : c === C.length ? !0 : "indeterminate";
      },
      [E, y]
    ), R = ve(
      (u) => {
        const oe = m.current.get(u);
        if (!oe) return;
        const C = r(u) !== !0;
        Z((c) => {
          const X = new Set(c);
          if (y) {
            const { node: b } = oe, Q = ft(b);
            C ? (X.add(u), Q.forEach((ye) => X.add(ye))) : (X.delete(u), Q.forEach((ye) => X.delete(ye)));
            let re = oe.parentId;
            for (; re !== null; ) {
              const ye = m.current.get(re);
              if (!ye) break;
              const B = ye.node;
              if (B.data) {
                const pe = B.data.map((De) => De.id), $e = pe.every((De) => X.has(De));
                pe.some((De) => X.has(De)), $e ? X.add(re) : X.delete(re);
              }
              re = ye.parentId;
            }
          } else
            C ? X.add(u) : X.delete(u);
          return X;
        }), S?.(u, C, oe.node);
      },
      [y, r, S]
    ), ee = ve(
      (u, oe) => {
        const s = m.current.get(u);
        !s || s.node.disabled || (o === "multi" && oe?.ctrlKey ? d((C) => {
          const c = new Set(C);
          return c.has(u) ? c.delete(u) : c.add(u), _?.(Array.from(c)), c;
        }) : o && (d(/* @__PURE__ */ new Set([u])), K?.(u, s.node), _?.([u])), U(u));
      },
      [o, K, _]
    ), de = ve(
      (u, oe) => {
        oe?.stopPropagation();
        const s = m.current.get(u);
        !s || !s.node.data || k((C) => {
          const c = new Set(C);
          return c.has(u) ? (c.delete(u), z?.(u, s.node)) : (c.add(u), $?.(u, s.node)), c;
        });
      },
      [$, z]
    ), me = ve(
      (u, oe) => {
        const s = m.current.get(u);
        s && (ee(u, oe), h?.(u, s.node, oe));
      },
      [ee, h]
    ), Ne = ve(
      (u, oe) => {
        const s = m.current.get(u);
        s && (D && !s.node.disabled ? (G(u), ce(s.node.value)) : s.node.data && de(u, oe), ae?.(u, s.node, oe));
      },
      [D, de, ae]
    ), Ae = ve(
      (u) => {
        const oe = m.current.get(u);
        oe && Y !== oe.node.value && L?.(u, Y, oe.node), G(null), ce("");
      },
      [Y, L]
    ), Se = ve(
      (u, oe) => {
        const s = m.current.get(u);
        s && t && (oe.preventDefault(), t(u, s.node, oe));
      },
      [t]
    ), _e = ve(
      (u) => {
        if (!T || p === null) return;
        const s = vt(i).filter((c) => {
          const X = m.current.get(c);
          if (!X) return !1;
          let b = X.parentId;
          for (; b !== null; ) {
            if (!f.has(b)) return !1;
            const Q = m.current.get(b);
            if (!Q) return !1;
            b = Q.parentId;
          }
          return !0;
        }), C = s.indexOf(p);
        switch (u.key) {
          case "ArrowDown":
            u.preventDefault(), C < s.length - 1 && U(s[C + 1]);
            break;
          case "ArrowUp":
            u.preventDefault(), C > 0 && U(s[C - 1]);
            break;
          case "ArrowRight": {
            u.preventDefault();
            const c = m.current.get(p);
            c?.node.data && (f.has(p) ? c.node.data.length > 0 && U(c.node.data[0].id) : de(p));
            break;
          }
          case "ArrowLeft": {
            u.preventDefault();
            const c = m.current.get(p);
            c && (f.has(p) && c.node.data ? de(p) : c.parentId !== null && U(c.parentId));
            break;
          }
          case "Enter":
          case " ":
            u.preventDefault(), l ? R(p) : ee(p);
            break;
          case "Home":
            u.preventDefault(), s.length > 0 && U(s[0]);
            break;
          case "End":
            u.preventDefault(), s.length > 0 && U(s[s.length - 1]);
            break;
        }
      },
      [T, p, i, f, l, de, R, ee]
    );
    We(P, () => ({
      getSelectedId: () => le.size > 0 ? Array.from(le)[0] : null,
      getSelectedIds: () => Array.from(le),
      select: (u) => ee(u),
      unselect: (u) => {
        d(u ? (oe) => {
          const s = new Set(oe);
          return s.delete(u), s;
        } : /* @__PURE__ */ new Set());
      },
      open: (u) => {
        k((s) => new Set(s).add(u));
        const oe = m.current.get(u);
        oe && $?.(u, oe.node);
      },
      close: (u) => {
        k((s) => {
          const C = new Set(s);
          return C.delete(u), C;
        });
        const oe = m.current.get(u);
        oe && z?.(u, oe.node);
      },
      openAll: () => {
        const u = vt(i).filter((oe) => {
          const s = m.current.get(oe);
          return s?.node.data && s.node.data.length > 0;
        });
        k(new Set(u));
      },
      closeAll: () => k(/* @__PURE__ */ new Set()),
      checkItem: (u) => {
        E.has(u) || R(u);
      },
      uncheckItem: (u) => {
        E.has(u) && R(u);
      },
      checkAll: () => {
        const u = vt(i);
        Z(new Set(u));
      },
      uncheckAll: () => Z(/* @__PURE__ */ new Set()),
      getChecked: () => Array.from(E),
      isChecked: (u) => r(u),
      isBranchOpen: (u) => f.has(u),
      isBranch: (u) => {
        const oe = m.current.get(u);
        return oe?.node.data !== void 0 && oe.node.data.length > 0;
      },
      getItem: (u) => m.current.get(u)?.node,
      getParentId: (u) => m.current.get(u)?.parentId ?? null,
      filter: (u) => ie(() => u),
      clearFilter: () => ie(null),
      refresh: () => M({}),
      focus: () => w.current?.focus(),
      getNode: () => w.current,
      showItem: (u) => {
        let oe = m.current.get(u)?.parentId ?? null;
        const s = [];
        for (; oe !== null; )
          s.push(oe), oe = m.current.get(oe)?.parentId ?? null;
        k((C) => {
          const c = new Set(C);
          return s.forEach((X) => c.add(X)), c;
        }), setTimeout(() => {
          w.current?.querySelector(`[data-node-id="${u}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 50);
      }
    }));
    const Ve = (u, oe = 0) => {
      const s = u.data && u.data.length > 0, C = f.has(u.id), c = le.has(u.id), X = p === u.id, b = ue === u.id, Q = l ? r(u.id) : !1;
      if (ne && !ne(u) && !u.data?.some((B) => ne(B) || ft(B).some((pe) => {
        const $e = m.current.get(pe);
        return $e && ne($e.node);
      })))
        return null;
      const re = [
        "avakio-tree-node",
        c && "avakio-tree-node--selected",
        X && "avakio-tree-node--focused",
        u.disabled && "avakio-tree-node--disabled",
        s && "avakio-tree-node--branch",
        u.css
      ].filter(Boolean).join(" "), ye = oe * 20;
      return /* @__PURE__ */ g("div", { className: "avakio-tree-node-wrapper", children: [
        /* @__PURE__ */ g(
          "div",
          {
            className: re,
            "data-node-id": u.id,
            style: {
              paddingLeft: ye + 8,
              height: W
            },
            onClick: (B) => me(u.id, B),
            onDoubleClick: (B) => Ne(u.id, B),
            onContextMenu: (B) => Se(u.id, B),
            title: u.tooltip,
            role: "treeitem",
            "aria-selected": c,
            "aria-expanded": s ? C : void 0,
            tabIndex: X ? 0 : -1,
            children: [
              A && /* @__PURE__ */ e(
                "span",
                {
                  className: `avakio-tree-toggle ${s ? "avakio-tree-toggle--visible" : ""}`,
                  onClick: (B) => s && de(u.id, B),
                  children: s ? C ? /* @__PURE__ */ e(tt, { size: 16 }) : /* @__PURE__ */ e(Ge, { size: 16 }) : null
                }
              ),
              l && /* @__PURE__ */ g(
                "span",
                {
                  className: `avakio-tree-checkbox ${Q === !0 ? "avakio-tree-checkbox--checked" : ""} ${Q === "indeterminate" ? "avakio-tree-checkbox--indeterminate" : ""}`,
                  onClick: (B) => {
                    B.stopPropagation(), u.disabled || R(u.id);
                  },
                  children: [
                    Q === !0 && /* @__PURE__ */ e(pt, { size: 12 }),
                    Q === "indeterminate" && /* @__PURE__ */ e(zt, { size: 12 })
                  ]
                }
              ),
              x && /* @__PURE__ */ e("span", { className: "avakio-tree-icon", children: u.icon ? C && u.openIcon ? u.openIcon : u.icon : s ? C ? /* @__PURE__ */ e(Ca, { size: 16 }) : /* @__PURE__ */ e(Da, { size: 16 }) : /* @__PURE__ */ e(Na, { size: 16 }) }),
              b ? /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  className: "avakio-tree-edit-input",
                  value: Y,
                  onChange: (B) => ce(B.target.value),
                  onBlur: () => Ae(u.id),
                  onKeyDown: (B) => {
                    B.key === "Enter" && Ae(u.id), B.key === "Escape" && (G(null), ce(""));
                  },
                  autoFocus: !0,
                  onClick: (B) => B.stopPropagation()
                }
              ) : /* @__PURE__ */ e("span", { className: "avakio-tree-label", children: u.value })
            ]
          }
        ),
        s && C && /* @__PURE__ */ e("div", { className: `avakio-tree-children ${O ? "avakio-tree-children--lines" : ""}`, children: u.data.map((B) => Ve(B, oe + 1)) })
      ] }, u.id);
    }, [N, se] = q(j || "material");
    be(() => {
      if (!j) {
        const u = document.documentElement.getAttribute("data-admin-theme");
        u && se(u);
        const oe = new MutationObserver(() => {
          const s = document.documentElement.getAttribute("data-admin-theme");
          s && se(s);
        });
        return oe.observe(document.documentElement, {
          attributes: !0,
          attributeFilter: ["data-admin-theme"]
        }), () => oe.disconnect();
      }
    }, [j]);
    const xe = [
      "avakio-tree",
      `avakio-tree--${j || N}`,
      O && "avakio-tree--lines",
      J
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ e(
      "div",
      {
        ref: w,
        id: he,
        "data-testid": n,
        className: xe,
        style: {
          width: I,
          height: V,
          ...H
        },
        role: "tree",
        tabIndex: 0,
        onKeyDown: _e,
        onFocus: () => {
          p === null && i.length > 0 && U(i[0].id);
        },
        children: i.map((u) => Ve(u, 0))
      }
    );
  }
);
sn.displayName = "AvakioTree";
const Be = (a) => {
  if (a !== void 0)
    return typeof a == "number" ? `${a}px` : a;
}, rn = He((a, n) => {
  const {
    id: i,
    testId: o,
    theme: l = "material",
    cells: y,
    width: x,
    height: A,
    minWidth: O,
    minHeight: T,
    maxWidth: v,
    maxHeight: D,
    borderless: j = !1,
    css: te,
    hidden: W = !1,
    disabled: I = !1,
    visibleBatch: V,
    background: J,
    padding: H,
    onCellClick: K,
    onResize: _
  } = a, [h, ae] = q(y), [$, z] = q(W), [S, L] = q(I), [t, P] = q(V), w = Ce(null), F = Ce(null);
  be(() => {
    ae(y);
  }, [y]), be(() => {
    if (!(!w.current || !_))
      return F.current = new ResizeObserver((f) => {
        for (const k of f) {
          const { width: E, height: Z } = k.contentRect;
          _(E, Z);
        }
      }), F.current.observe(w.current), () => {
        F.current?.disconnect();
      };
  }, [_]);
  const he = ve((f) => {
    S || f.disabled || K?.(f.id, f);
  }, [S, K]), le = ve((f) => f.hidden ? !1 : !t || !f.batch ? !0 : f.batch === t, [t]);
  We(n, () => ({
    addView: (f, k) => {
      ae((E) => {
        if (k !== void 0 && k >= 0 && k <= E.length) {
          const Z = [...E];
          return Z.splice(k, 0, f), Z;
        }
        return [...E, f];
      });
    },
    removeView: (f) => {
      ae((k) => typeof f == "number" ? k.filter((E, Z) => Z !== f) : k.filter((E) => E.id !== f));
    },
    getChildViews: () => h,
    getNode: () => w.current,
    show: () => z(!1),
    hide: () => z(!0),
    isVisible: () => !$,
    enable: () => L(!1),
    disable: () => L(!0),
    isEnabled: () => !S,
    resize: () => {
      if (w.current && _) {
        const { width: f, height: k } = w.current.getBoundingClientRect();
        _(f, k);
      }
    },
    showBatch: (f) => P(f),
    index: (f) => h.findIndex((k) => k.id === f),
    reconstruct: (f) => ae(f)
  }), [h, $, S, _]);
  const d = {
    width: Be(x),
    height: Be(A),
    minWidth: Be(O),
    minHeight: Be(T),
    maxWidth: Be(v),
    maxHeight: Be(D),
    background: J,
    padding: Be(H)
  };
  return $ ? null : /* @__PURE__ */ e(
    "div",
    {
      ref: w,
      id: i,
      "data-testid": o,
      className: `avakio-absolute-layout avakio-absolute-layout-theme-${l} ${j ? "borderless" : ""} ${S ? "disabled" : ""} ${te || ""}`,
      style: d,
      children: h.map((f, k) => {
        if (!le(f)) return null;
        const E = f.relative ? {
          position: "relative",
          width: Be(f.width) || "100%",
          height: Be(f.height) || "100%",
          minWidth: Be(f.minWidth),
          minHeight: Be(f.minHeight),
          maxWidth: Be(f.maxWidth),
          maxHeight: Be(f.maxHeight),
          zIndex: f.zIndex
        } : {
          position: "absolute",
          top: Be(f.top),
          left: Be(f.left),
          bottom: Be(f.bottom),
          right: Be(f.right),
          width: Be(f.width),
          height: Be(f.height),
          minWidth: Be(f.minWidth),
          minHeight: Be(f.minHeight),
          maxWidth: Be(f.maxWidth),
          maxHeight: Be(f.maxHeight),
          zIndex: f.zIndex
        };
        return /* @__PURE__ */ e(
          "div",
          {
            className: `avakio-absolute-layout-cell ${f.relative ? "relative" : "absolute"} ${f.disabled ? "disabled" : ""} ${f.css || ""}`,
            style: E,
            onClick: () => he(f),
            "data-cell-id": f.id,
            "data-batch": f.batch,
            children: f.content
          },
          f.id || k
        );
      })
    }
  );
});
rn.displayName = "AvakioAbsoluteLayout";
const Wt = He(
  ({
    id: a,
    testId: n,
    gridColumns: i = 2,
    gridRows: o = 2,
    cellWidth: l,
    cellHeight: y,
    cells: x = [],
    theme: A = "material",
    cellMargin: O = 10,
    margin: T,
    padding: v = 10,
    paddingX: D,
    paddingY: j,
    width: te,
    height: W,
    minWidth: I,
    minHeight: V,
    borderless: J = !1,
    cellBorderless: H = !1,
    className: K = "",
    css: _,
    hidden: h = !1,
    disabled: ae = !1,
    autoplace: $ = !1,
    factory: z,
    onChange: S,
    onCellClick: L,
    isDraggable: t = !1,
    onDragStart: P,
    onDragEnd: w
  }, F) => {
    const he = Ce(null), [le, d] = q(x), [f, k] = q(h), [E, Z] = q({ width: 0, height: 0 }), p = Ce(le), [U, ue] = q(null), [G, Y] = q({ x: 0, y: 0 }), [ce, ne] = q({ x: 0, y: 0 });
    be(() => {
      p.current = le;
    }, [le]), be(() => {
      d(x);
    }, [x]), be(() => {
      if (!he.current) return;
      const N = he.current.clientWidth, se = he.current.clientHeight;
      (N > 0 || se > 0) && Z({ width: N, height: se });
      let ke = null, xe = null;
      const u = new ResizeObserver((oe) => {
        for (const s of oe) {
          const C = s.target;
          xe = { width: C.clientWidth, height: C.clientHeight }, ke === null && (ke = requestAnimationFrame(() => {
            xe && (Z(xe), xe = null), ke = null;
          }));
        }
      });
      return u.observe(he.current), () => {
        u.disconnect(), ke !== null && cancelAnimationFrame(ke);
      };
    }, []);
    const ie = Ie(() => {
      if (l) return l;
      const N = Array.isArray(v) ? v : [v, v, v, v], ke = (D !== void 0 ? D : N[1]) * 2, xe = O * (i - 1), u = E.width - ke - xe;
      return Math.max(u / i, 50);
    }, [l, E.width, i, O, v, D]), M = Ie(() => {
      if (y)
        return le.reduce((Q, re) => (Q[re.id] = re.height || y, Q), {});
      const N = Array.isArray(v) ? v : [v, v, v, v], ke = (j !== void 0 ? j : N[0]) * 2, xe = O * (o - 1), u = E.height - ke - xe;
      let oe = 0, s = 0;
      const C = {};
      for (let Q = 0; Q < o; Q++) {
        const ye = le.filter((B) => B.y === Q && !B.hidden).find((B) => B.height !== void 0);
        ye && ye.height ? (C[Q] = ye.height, oe += ye.height) : (C[Q] = "flex", s++);
      }
      const c = u - oe, X = s > 0 ? Math.max(c / s, 50) : 50, b = {};
      return le.forEach((Q) => {
        if (Q.height)
          b[Q.id] = Q.height;
        else {
          const re = Q.dy || 1;
          let ye = 0;
          for (let B = 0; B < re; B++) {
            const pe = C[Q.y + B];
            ye += pe === "flex" ? X : pe, B > 0 && (ye += O);
          }
          b[Q.id] = ye;
        }
      }), b;
    }, [le, y, E.height, o, O, v, j]), m = Ie(() => {
      const N = Array.isArray(v) ? v : [v, v, v, v], ke = (j !== void 0 ? j : N[0]) * 2, xe = E.height - ke - O * (o - 1);
      let u = 0, oe = 0;
      const s = [];
      for (let b = 0; b < o; b++) {
        const re = le.filter((ye) => ye.y === b && !ye.hidden).find((ye) => ye.height !== void 0);
        re && re.height ? (s[b] = re.height, u += re.height) : y ? s[b] = y : (s[b] = "flex", oe++);
      }
      const C = xe - u, c = oe > 0 ? Math.max(C / oe, 50) : y || 50, X = [0];
      for (let b = 0; b < o; b++) {
        const Q = s[b] === "flex" ? c : s[b];
        X[b + 1] = X[b] + Q + O;
      }
      return X;
    }, [le, y, E.height, o, O, v, j]), r = ve((N) => {
      const se = N.dx || 1, ke = Array.isArray(v) ? v : [v, v, v, v], xe = D !== void 0 ? D : ke[1], u = j !== void 0 ? j : ke[0], oe = xe + N.x * (ie + O), s = u + m[N.y], C = se * ie + (se - 1) * O, c = M[N.id] || 50;
      return {
        position: "absolute",
        left: `${oe}px`,
        top: `${s}px`,
        width: `${C}px`,
        height: `${c}px`,
        ...N.css
      };
    }, [ie, M, m, O, v, D, j]), R = ve((N) => {
      if (z)
        return z(N);
      if (N.content)
        return N.content;
      if (typeof N.template == "function")
        return N.template(N);
      if (typeof N.template == "string") {
        let se = N.template;
        return N.data && Object.entries(N.data).forEach(([ke, xe]) => {
          se = se.replace(new RegExp(`#${ke}#`, "g"), String(xe));
        }), /* @__PURE__ */ e("div", { dangerouslySetInnerHTML: { __html: se } });
      }
      return null;
    }, [z]), ee = ve((N, se) => {
      const ke = Array.isArray(v) ? v : [v, v, v, v], xe = D !== void 0 ? D : ke[1], u = j !== void 0 ? j : ke[0], oe = N - xe, s = ie + O;
      let C = Math.round(oe / s);
      C = Math.max(0, Math.min(C, i - 1));
      const c = se - u;
      let X = 0;
      for (let b = 0; b < m.length - 1; b++) {
        const Q = m[b] + (m[b + 1] - m[b] - O) / 2;
        c > Q && (X = b + 1);
      }
      return X = Math.max(0, Math.min(X, o - 1)), { x: C, y: X };
    }, [ie, O, i, o, v, D, j, m]);
    ve((N, se, ke) => p.current.some((xe) => {
      if (xe.id === ke) return !1;
      const u = xe.dx || 1, oe = xe.dy || 1;
      return N >= xe.x && N < xe.x + u && se >= xe.y && se < xe.y + oe;
    }), []);
    const de = ve((N, se) => {
      if (!t || ae || se.disabled || se.draggable === !1) return;
      N.preventDefault(), N.stopPropagation();
      const ke = "touches" in N ? N.touches[0].clientX : N.clientX, xe = "touches" in N ? N.touches[0].clientY : N.clientY, u = he.current?.getBoundingClientRect();
      if (!u) return;
      const oe = r(se), s = parseFloat(String(oe.left)), C = parseFloat(String(oe.top));
      Y({
        x: ke - u.left - s,
        y: xe - u.top - C
      }), ne({
        x: ke - u.left - (ke - u.left - s),
        y: xe - u.top - (xe - u.top - C)
      }), ue(se.id), P?.(se);
    }, [t, ae, r, P]), me = ve((N) => {
      if (!U || !he.current) return;
      const se = "touches" in N ? N.touches[0].clientX : N.clientX, ke = "touches" in N ? N.touches[0].clientY : N.clientY, xe = he.current.getBoundingClientRect();
      ne({
        x: se - xe.left - G.x,
        y: ke - xe.top - G.y
      });
    }, [U, G]), Ne = ve(() => {
      if (!U) return;
      const N = p.current.find((s) => s.id === U);
      if (!N) {
        ue(null);
        return;
      }
      const se = ee(ce.x, ce.y), ke = N.dx || 1, xe = N.dy || 1;
      let u = !0;
      for (let s = 0; s < ke && u; s++)
        for (let C = 0; C < xe && u; C++) {
          const c = se.x + s, X = se.y + C;
          (c >= i || X >= o) && (u = !1);
        }
      const oe = se.x !== N.x || se.y !== N.y;
      if (u && oe) {
        const s = i === 1, C = p.current.every((c) => (c.dx || 1) === 1 && (c.dy || 1) === 1);
        if (s && C) {
          const c = N.y, X = se.y;
          d((b) => {
            const Q = b.map((re) => {
              if (re.id === U)
                return { ...re, y: X };
              if (c < X) {
                if (re.y > c && re.y <= X)
                  return { ...re, y: re.y - 1 };
              } else if (re.y >= X && re.y < c)
                return { ...re, y: re.y + 1 };
              return re;
            });
            return S?.(Q), Q;
          });
        } else {
          const c = p.current.find((X) => {
            if (X.id === U) return !1;
            const b = X.dx || 1, Q = X.dy || 1;
            return se.x >= X.x && se.x < X.x + b && se.y >= X.y && se.y < X.y + Q;
          });
          d((X) => {
            const b = X.map((Q) => Q.id === U ? { ...Q, x: se.x, y: se.y } : c && Q.id === c.id ? { ...Q, x: N.x, y: N.y } : Q);
            return S?.(b), b;
          });
        }
        w?.(N, se);
      }
      ue(null);
    }, [U, ce, ee, i, o, S, w]);
    be(() => {
      if (!t || !U) return;
      const N = (ke) => me(ke), se = () => Ne();
      return document.addEventListener("mousemove", N), document.addEventListener("mouseup", se), document.addEventListener("touchmove", N, { passive: !1 }), document.addEventListener("touchend", se), () => {
        document.removeEventListener("mousemove", N), document.removeEventListener("mouseup", se), document.removeEventListener("touchmove", N), document.removeEventListener("touchend", se);
      };
    }, [t, U, me, Ne]);
    const Ae = ve(() => {
      const N = /* @__PURE__ */ new Set();
      p.current.forEach((se) => {
        const ke = se.dx || 1, xe = se.dy || 1;
        for (let u = 0; u < ke; u++)
          for (let oe = 0; oe < xe; oe++)
            N.add(`${se.x + u},${se.y + oe}`);
      });
      for (let se = 0; se < o; se++)
        for (let ke = 0; ke < i; ke++)
          if (!N.has(`${ke},${se}`))
            return { x: ke, y: se };
      return { x: 0, y: o };
    }, [i, o]);
    We(F, () => ({
      addView: (N, se) => {
        const ke = $ && (N.x === void 0 || N.y === void 0) ? { ...N, ...Ae() } : N;
        d((xe) => {
          const u = se !== void 0 ? [...xe.slice(0, se), ke, ...xe.slice(se)] : [...xe, ke];
          return S?.(u), u;
        });
      },
      removeView: (N) => {
        d((se) => {
          const ke = se.filter((xe) => xe.id !== N);
          return S?.(ke), ke;
        });
      },
      moveView: (N, se) => {
        d((ke) => {
          const xe = ke.map((u) => u.id === N ? {
            ...u,
            x: se.x ?? u.x,
            y: se.y ?? u.y,
            dx: se.dx ?? u.dx,
            dy: se.dy ?? u.dy
          } : u);
          return S?.(xe), xe;
        });
      },
      clearAll: () => {
        d([]), S?.([]);
      },
      getCells: () => p.current,
      getCell: (N) => p.current.find((se) => se.id === N),
      serialize: () => p.current.map(({ id: N, x: se, y: ke, dx: xe, dy: u, data: oe }) => ({
        id: N,
        x: se,
        y: ke,
        dx: xe || 1,
        dy: u || 1,
        data: oe
      })),
      restore: (N) => {
        d(N), S?.(N);
      },
      reconstruct: () => {
        d([...p.current]);
      },
      show: () => k(!1),
      hide: () => k(!0),
      getNode: () => he.current
    }));
    const Se = [
      "avakio-grid",
      `avakio-grid-theme-${A}`,
      J ? "avakio-grid-borderless" : "",
      H ? "avakio-grid-cell-borderless" : "",
      f ? "avakio-grid-hidden" : "",
      ae ? "avakio-grid-disabled" : "",
      t ? "avakio-grid-draggable" : "",
      U ? "avakio-grid-dragging" : "",
      K
    ].filter(Boolean).join(" "), Ve = {
      position: "relative",
      width: (() => {
        if (te !== void 0) {
          if (typeof te == "number") return `${te}px`;
          if (te === "100%" && T !== void 0) {
            const N = typeof T == "number" ? T * 2 : 0;
            return N > 0 ? `calc(100% - ${N}px)` : "100%";
          }
          return te;
        }
      })(),
      height: typeof W == "number" ? `${W}px` : W,
      minWidth: typeof I == "number" ? `${I}px` : I,
      minHeight: typeof V == "number" ? `${V}px` : V,
      margin: T !== void 0 ? typeof T == "number" ? `${T}px` : T : void 0,
      ..._ && typeof _ == "object" && !Array.isArray(_) ? _ : {}
    };
    return /* @__PURE__ */ e(
      "div",
      {
        ref: he,
        id: a,
        "data-testid": n,
        className: Se,
        style: Ve,
        children: le.map((N) => {
          if (N.hidden) return null;
          const se = U === N.id, ke = [
            "avakio-grid-cell",
            N.cssClass || "",
            N.disabled ? "avakio-grid-cell-disabled" : "",
            t && !N.disabled && N.draggable !== !1 ? "avakio-grid-cell-draggable" : "",
            se ? "avakio-grid-cell-dragging" : ""
          ].filter(Boolean).join(" "), xe = se ? { ...r(N), left: `${ce.x}px`, top: `${ce.y}px`, zIndex: 1e3 } : r(N);
          return /* @__PURE__ */ e(
            "div",
            {
              id: N.id,
              className: ke,
              style: xe,
              onClick: () => !se && L?.(N),
              onMouseDown: (u) => de(u, N),
              onTouchStart: (u) => de(u, N),
              "data-cell-id": N.id,
              children: /* @__PURE__ */ e("div", { className: "avakio-grid-cell-content", children: R(N) })
            },
            N.id
          );
        })
      }
    );
  }
);
Wt.displayName = "AvakioGrid";
function Qn({
  rows: a,
  cols: n,
  children: i,
  theme: o = "material",
  className: l = "",
  css: y,
  width: x,
  height: A,
  minWidth: O,
  minHeight: T,
  maxWidth: v,
  maxHeight: D,
  borderless: j = !1,
  type: te = "space",
  padding: W,
  paddingX: I,
  paddingY: V,
  margin: J,
  gravity: H,
  hidden: K = !1,
  disabled: _ = !1,
  responsive: h = !1,
  id: ae,
  testId: $,
  gap: z,
  align: S = "stretch",
  justify: L = "start",
  onResize: t,
  autoResize: P = !1
}) {
  const w = Ce(null), [F, he] = q(!1), le = !!a || !n && !a, d = a || n || [], f = ve(() => {
    if (!h || !w.current) return;
    w.current.offsetWidth < 768 && !le ? he(!0) : he(!1), t && t();
  }, [h, le, t]);
  be(() => {
    if (!h && !P) return;
    f();
    const p = () => {
      f();
    };
    return window.addEventListener("resize", p), () => {
      window.removeEventListener("resize", p);
    };
  }, [h, P, f]), be(() => {
    if (!P || !w.current) return;
    const p = new ResizeObserver(() => {
      f();
    });
    return p.observe(w.current), () => {
      p.disconnect();
    };
  }, [P, f]);
  const k = [
    "avakio-layout",
    `avakio-layout-theme-${o}`,
    `avakio-layout-type-${te}`,
    le || F ? "avakio-layout-rows" : "avakio-layout-cols",
    j ? "avakio-layout-borderless" : "",
    _ ? "avakio-layout-disabled" : "",
    K ? "avakio-layout-hidden" : "",
    h ? "avakio-layout-responsive" : "",
    F ? "avakio-layout-responsive-active" : "",
    l
  ].filter(Boolean).join(" "), E = {
    width: typeof x == "number" ? `${x}px` : x,
    height: typeof A == "number" ? `${A}px` : A,
    minWidth: typeof O == "number" ? `${O}px` : O,
    minHeight: typeof T == "number" ? `${T}px` : T,
    maxWidth: typeof v == "number" ? `${v}px` : v,
    maxHeight: typeof D == "number" ? `${D}px` : D,
    margin: typeof J == "number" ? `${J}px` : J,
    gap: typeof z == "number" ? `${z}px` : z,
    alignItems: S,
    justifyContent: L,
    flex: H,
    ...y && typeof y == "object" && !Array.isArray(y) ? y : {}
  };
  W !== void 0 ? E.padding = Array.isArray(W) ? `${W[0]}px ${W[1]}px ${W[2]}px ${W[3]}px` : typeof W == "number" ? `${W}px` : W : (I !== void 0 && (E.paddingLeft = typeof I == "number" ? `${I}px` : I, E.paddingRight = typeof I == "number" ? `${I}px` : I), V !== void 0 && (E.paddingTop = typeof V == "number" ? `${V}px` : V, E.paddingBottom = typeof V == "number" ? `${V}px` : V));
  const Z = (p) => {
    if (!Pe.isValidElement(p)) return !1;
    const U = p.props;
    if (U.gravity) return !0;
    if (U.css && typeof U.css == "object") {
      const ue = U.css;
      if (ue.flex === 1 || ue.flex === "1") return !0;
    }
    return !1;
  };
  return /* @__PURE__ */ e(
    "div",
    {
      ref: w,
      id: ae,
      "data-testid": $,
      className: k,
      style: E,
      children: d.length > 0 ? d.map((p, U) => {
        const ue = ["avakio-layout-item"];
        return Z(p) && ue.push("avakio-layout-item-flex"), /* @__PURE__ */ e("div", { className: ue.join(" "), children: p }, U);
      }) : i
    }
  );
}
function es({
  direction: a,
  theme: n = "material",
  onResizeStart: i,
  onResize: o,
  onResizeEnd: l,
  className: y = "",
  css: x,
  id: A,
  testId: O
}) {
  const T = Ce(null), v = Ce(0), [D, j] = q(!1);
  be(() => {
    if (!D) return;
    const I = (J) => {
      J.preventDefault();
      const H = a === "horizontal" ? J.clientY : J.clientX, K = H - v.current;
      o && o(K), v.current = H;
    }, V = () => {
      j(!1), document.body.style.cursor = "", document.body.style.userSelect = "", l && l();
    };
    return document.addEventListener("mousemove", I), document.addEventListener("mouseup", V), () => {
      document.removeEventListener("mousemove", I), document.removeEventListener("mouseup", V);
    };
  }, [D, a, o, l]);
  const te = (I) => {
    I.preventDefault(), v.current = a === "horizontal" ? I.clientY : I.clientX, j(!0), document.body.style.cursor = a === "horizontal" ? "row-resize" : "col-resize", document.body.style.userSelect = "none", i && i();
  }, W = [
    "avakio-resizer",
    `avakio-resizer-${a}`,
    `avakio-resizer-theme-${n}`,
    D ? "avakio-resizer-dragging" : "",
    y
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ e(
    "div",
    {
      ref: T,
      id: A,
      "data-testid": O,
      className: W,
      "data-admin-theme": n,
      onMouseDown: te,
      style: x,
      role: "separator",
      "aria-orientation": a === "horizontal" ? "horizontal" : "vertical",
      "aria-label": "Resizer",
      children: /* @__PURE__ */ e("div", { className: "avakio-resizer-handle" })
    }
  );
}
function ts({
  data: a,
  value: n = [],
  onChange: i,
  labelLeft: o = "Available",
  labelRight: l = "Selected",
  labelBottomLeft: y,
  labelBottomRight: x,
  showButtons: A = !0,
  searchable: O = !0,
  draggable: T = !0,
  disabled: v = !1,
  listHeight: D = 300,
  id: j,
  testId: te,
  className: W
}) {
  const [I, V] = q(""), [J, H] = q(""), [K, _] = q([]), [h, ae] = q([]), [$, z] = q(null), [S, L] = q(null), t = Ce(null), P = Ce(null), w = Ie(() => new Set(n), [n]), F = Ie(
    () => a.filter((m) => !w.has(m.id)),
    [a, w]
  ), he = Ie(
    () => a.filter((m) => w.has(m.id)),
    [a, w]
  ), le = Ie(() => {
    if (!I.trim()) return F;
    const m = I.toLowerCase();
    return F.filter((r) => r.value.toLowerCase().includes(m));
  }, [F, I]), d = Ie(() => {
    if (!J.trim()) return he;
    const m = J.toLowerCase();
    return he.filter((r) => r.value.toLowerCase().includes(m));
  }, [he, J]), f = ve((m) => {
    const r = m.filter((R) => {
      const ee = a.find((de) => de.id === R);
      return ee && !ee.disabled && !w.has(R);
    });
    r.length > 0 && (i([...n, ...r]), _([]));
  }, [a, w, n, i]), k = ve((m) => {
    const r = new Set(m.filter((R) => {
      const ee = a.find((de) => de.id === R);
      return ee && !ee.disabled;
    }));
    r.size > 0 && (i(n.filter((R) => !r.has(R))), ae([]));
  }, [a, n, i]), E = ve(() => {
    const m = F.filter((r) => !r.disabled).map((r) => r.id);
    i([...n, ...m]), _([]);
  }, [F, n, i]), Z = ve(() => {
    const m = he.filter((r) => r.disabled).map((r) => r.id);
    i(m), ae([]);
  }, [he, i]), p = ve((m, r, R) => {
    const ee = a.find((Ne) => Ne.id === m);
    if (!ee || ee.disabled || v) return;
    const de = r === "left" ? _ : ae, me = r === "left" ? K : h;
    if (R.ctrlKey || R.metaKey)
      de(
        (Ne) => Ne.includes(m) ? Ne.filter((Ae) => Ae !== m) : [...Ne, m]
      );
    else if (R.shiftKey && me.length > 0) {
      const Ne = r === "left" ? le : d, Ae = me[me.length - 1], Se = Ne.findIndex((Ve) => Ve.id === Ae), _e = Ne.findIndex((Ve) => Ve.id === m);
      if (Se !== -1 && _e !== -1) {
        const Ve = Math.min(Se, _e), N = Math.max(Se, _e), se = Ne.slice(Ve, N + 1).filter((ke) => !ke.disabled).map((ke) => ke.id);
        de(se);
      }
    } else
      de([m]);
  }, [a, v, K, h, le, d]), U = ve((m, r) => {
    v || (r === "left" ? f([m]) : k([m]));
  }, [v, f, k]), ue = ve((m, r) => {
    !T || v || (m.dataTransfer.setData("text/plain", r), m.dataTransfer.effectAllowed = "move", z(r));
  }, [T, v]), G = ve(() => {
    z(null), L(null);
  }, []), Y = ve((m, r) => {
    !T || v || (m.preventDefault(), m.dataTransfer.dropEffect = "move", L(r));
  }, [T, v]), ce = ve(() => {
    L(null);
  }, []), ne = ve((m, r) => {
    if (!T || v) return;
    m.preventDefault();
    const R = m.dataTransfer.getData("text/plain");
    if (R) {
      const ee = w.has(R);
      r === "right" && !ee ? f([R]) : r === "left" && ee && k([R]);
    }
    z(null), L(null);
  }, [T, v, w, f, k]), ie = (m, r) => {
    const ee = (r === "left" ? K : h).includes(m.id), de = $ === m.id;
    return /* @__PURE__ */ g(
      "div",
      {
        className: Ye(
          "avakio-doublelist-item",
          ee && "avakio-doublelist-item-selected",
          m.disabled && "avakio-doublelist-item-disabled",
          de && "avakio-doublelist-item-dragging"
        ),
        onClick: (me) => p(m.id, r, me),
        onDoubleClick: () => U(m.id, r),
        draggable: T && !m.disabled && !v,
        onDragStart: (me) => ue(me, m.id),
        onDragEnd: G,
        "data-item-id": m.id,
        children: [
          T && !m.disabled && !v && /* @__PURE__ */ e(Ma, { size: 14, className: "avakio-doublelist-drag-handle" }),
          /* @__PURE__ */ e("span", { className: "avakio-doublelist-item-text", children: m.value })
        ]
      },
      m.id
    );
  }, M = { height: typeof D == "number" ? `${D}px` : D };
  return /* @__PURE__ */ g(
    "div",
    {
      id: j,
      "data-testid": te,
      className: Ye(
        "avakio-doublelist",
        v && "avakio-doublelist-disabled",
        W
      ),
      children: [
        /* @__PURE__ */ g("div", { className: "avakio-doublelist-panel", children: [
          o && /* @__PURE__ */ g("div", { className: "avakio-doublelist-label avakio-doublelist-label-top", children: [
            o,
            /* @__PURE__ */ g("span", { className: "avakio-doublelist-count", children: [
              "(",
              le.length,
              ")"
            ] })
          ] }),
          O && /* @__PURE__ */ g("div", { className: "avakio-doublelist-search", children: [
            /* @__PURE__ */ e(it, { size: 14, className: "avakio-doublelist-search-icon" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search...",
                value: I,
                onChange: (m) => V(m.target.value),
                disabled: v,
                className: "avakio-doublelist-search-input"
              }
            )
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              ref: t,
              className: Ye(
                "avakio-doublelist-list",
                S === "left" && "avakio-doublelist-list-dragover"
              ),
              style: M,
              onDragOver: (m) => Y(m, "left"),
              onDragLeave: ce,
              onDrop: (m) => ne(m, "left"),
              children: le.length === 0 ? /* @__PURE__ */ e("div", { className: "avakio-doublelist-empty", children: I ? "No matches found" : "No items available" }) : le.map((m) => ie(m, "left"))
            }
          ),
          y && /* @__PURE__ */ e("div", { className: "avakio-doublelist-label avakio-doublelist-label-bottom", children: y })
        ] }),
        A && /* @__PURE__ */ g("div", { className: "avakio-doublelist-buttons", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-doublelist-btn",
              onClick: () => f(K),
              disabled: v || K.length === 0,
              title: "Move selected to right",
              children: /* @__PURE__ */ e(Ge, { size: 18 })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-doublelist-btn",
              onClick: E,
              disabled: v || F.filter((m) => !m.disabled).length === 0,
              title: "Move all to right",
              children: /* @__PURE__ */ e(da, { size: 18 })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-doublelist-btn",
              onClick: () => k(h),
              disabled: v || h.length === 0,
              title: "Move selected to left",
              children: /* @__PURE__ */ e(Ze, { size: 18 })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-doublelist-btn",
              onClick: Z,
              disabled: v || he.filter((m) => !m.disabled).length === 0,
              title: "Move all to left",
              children: /* @__PURE__ */ e(la, { size: 18 })
            }
          )
        ] }),
        /* @__PURE__ */ g("div", { className: "avakio-doublelist-panel", children: [
          l && /* @__PURE__ */ g("div", { className: "avakio-doublelist-label avakio-doublelist-label-top", children: [
            l,
            /* @__PURE__ */ g("span", { className: "avakio-doublelist-count", children: [
              "(",
              d.length,
              ")"
            ] })
          ] }),
          O && /* @__PURE__ */ g("div", { className: "avakio-doublelist-search", children: [
            /* @__PURE__ */ e(it, { size: 14, className: "avakio-doublelist-search-icon" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: "Search...",
                value: J,
                onChange: (m) => H(m.target.value),
                disabled: v,
                className: "avakio-doublelist-search-input"
              }
            )
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              ref: P,
              className: Ye(
                "avakio-doublelist-list",
                S === "right" && "avakio-doublelist-list-dragover"
              ),
              style: M,
              onDragOver: (m) => Y(m, "right"),
              onDragLeave: ce,
              onDrop: (m) => ne(m, "right"),
              children: d.length === 0 ? /* @__PURE__ */ e("div", { className: "avakio-doublelist-empty", children: J ? "No matches found" : "No items selected" }) : d.map((m) => ie(m, "right"))
            }
          ),
          x && /* @__PURE__ */ e("div", { className: "avakio-doublelist-label avakio-doublelist-label-bottom", children: x })
        ] })
      ]
    }
  );
}
const on = He(
  ({
    id: a,
    testId: n,
    label: i,
    children: o,
    borderless: l = !1,
    theme: y,
    disabled: x = !1,
    width: A,
    height: O,
    paddingX: T = 18,
    paddingY: v = 16,
    css: D,
    className: j = "",
    collapsible: te = !1,
    defaultCollapsed: W = !1,
    collapsed: I,
    onCollapse: V,
    icon: J
  }, H) => {
    const K = Ce(null), _ = Ce(null), [h, ae] = q(x), $ = I !== void 0, [z, S] = q(W), L = $ ? I : z;
    be(() => {
      ae(x);
    }, [x]);
    const t = () => {
      if (!te) return;
      const he = !L;
      $ || S(he), V?.(he);
    };
    We(H, () => ({
      getNode: () => K.current,
      getBody: () => _.current,
      isEnabled: () => !h,
      enable: () => ae(!1),
      disable: () => ae(!0),
      collapse: () => {
        te && ($ || S(!0), V?.(!0));
      },
      expand: () => {
        te && ($ || S(!1), V?.(!1));
      },
      isCollapsed: () => L,
      toggle: () => t()
    }), [h, L, $, te, V]);
    const P = [
      "avakio-fieldset",
      y && `avakio-fieldset-theme-${y}`,
      l && "avakio-fieldset-borderless",
      h && "avakio-fieldset-disabled",
      te && "avakio-fieldset-collapsible",
      L && "avakio-fieldset-collapsed",
      j
    ].filter(Boolean).join(" "), w = {
      ...D && typeof D == "object" && !Array.isArray(D) ? D : {},
      width: typeof A == "number" ? `${A}px` : A,
      height: typeof O == "number" ? `${O}px` : O
    }, F = {
      paddingLeft: `${T}px`,
      paddingRight: `${T}px`,
      paddingTop: `${v}px`,
      paddingBottom: `${v}px`
    };
    return /* @__PURE__ */ g(
      "fieldset",
      {
        ref: K,
        id: a,
        "data-testid": n,
        "data-admin-theme": y,
        className: P,
        style: w,
        disabled: h,
        children: [
          i && /* @__PURE__ */ g(
            "legend",
            {
              className: `avakio-fieldset-legend ${te ? "avakio-fieldset-legend-clickable" : ""}`,
              onClick: te ? t : void 0,
              children: [
                te && /* @__PURE__ */ e("span", { className: "avakio-fieldset-collapse-icon", children: /* @__PURE__ */ e(
                  "svg",
                  {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: `avakio-fieldset-chevron ${L ? "avakio-fieldset-chevron-collapsed" : ""}`,
                    children: /* @__PURE__ */ e(
                      "path",
                      {
                        d: "M3 4.5L6 7.5L9 4.5",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                ) }),
                J && /* @__PURE__ */ e("span", { className: "avakio-fieldset-icon", children: J }),
                /* @__PURE__ */ e("span", { className: "avakio-fieldset-label-text", children: i })
              ]
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              ref: _,
              className: "avakio-fieldset-body",
              style: F,
              children: o
            }
          )
        ]
      }
    );
  }
);
on.displayName = "AvakioFieldset";
const ln = He(
  ({
    id: a,
    testId: n,
    label: i = "",
    html: o,
    align: l = "left",
    width: y,
    height: x,
    theme: A = "material",
    className: O = "",
    css: T = {},
    tooltip: v,
    disabled: D = !1,
    hidden: j = !1,
    onClick: te,
    autowidth: W = !1,
    fontSize: I,
    fontWeight: V,
    color: J,
    backgroundColor: H,
    padding: K,
    margin: _,
    border: h,
    borderRadius: ae
  }, $) => {
    const z = Ce(null), [S, L] = Pe.useState(i), [t, P] = Pe.useState(o), [w, F] = Pe.useState(!j), [he, le] = Pe.useState(D);
    We($, () => ({
      getValue: () => S,
      setValue: (E) => {
        L(E), P(void 0);
      },
      setHTML: (E) => {
        P(E);
      },
      getNode: () => z.current,
      hide: () => F(!1),
      show: () => F(!0),
      isVisible: () => w,
      disable: () => le(!0),
      enable: () => le(!1),
      isEnabled: () => !he
    }));
    const d = [
      "avakio-label",
      `avakio-label-theme-${A}`,
      `avakio-label-align-${l}`,
      he && "avakio-label-disabled",
      W && "avakio-label-autowidth",
      O
    ].filter(Boolean).join(" "), f = {
      ...T && typeof T == "object" && !Array.isArray(T) ? T : {},
      width: W ? "auto" : y,
      height: x,
      fontSize: I,
      fontWeight: V,
      color: J,
      backgroundColor: H,
      padding: Array.isArray(K) ? `${K[0]}px ${K[1]}px ${K[2]}px ${K[3]}px` : typeof K == "number" ? `${K}px` : K,
      margin: Array.isArray(_) ? `${_[0]}px ${_[1]}px ${_[2]}px ${_[3]}px` : typeof _ == "number" ? `${_}px` : _,
      border: h,
      borderRadius: ae,
      display: w ? void 0 : "none"
    };
    return /* @__PURE__ */ e(
      "div",
      {
        ref: z,
        id: a,
        "data-testid": n,
        className: d,
        style: f,
        title: v,
        onClick: (E) => {
          !he && te && te(E);
        },
        children: t ? /* @__PURE__ */ e("div", { dangerouslySetInnerHTML: { __html: t } }) : /* @__PURE__ */ e("span", { children: S })
      }
    );
  }
);
ln.displayName = "AvakioLabel";
let cn = 0;
const nt = () => `multitext-field-${++cn}`, dn = He(
  ({
    id: a,
    testId: n,
    name: i,
    value: o,
    defaultValue: l,
    label: y,
    labelWidth: x = 100,
    labelAlign: A = "left",
    labelPosition: O = "left",
    placeholder: T,
    required: v = !1,
    error: D,
    invalidMessage: j,
    bottomLabel: te,
    theme: W = "material",
    disabled: I = !1,
    readonly: V = !1,
    className: J = "",
    css: H,
    width: K,
    height: _,
    minWidth: h,
    maxWidth: ae,
    inputAlign: $ = "left",
    inputWidth: z,
    icon: S,
    iconWidth: L = 28,
    maxFields: t,
    separator: P = ", ",
    subConfig: w,
    showNumbers: F = !1,
    addButtonLabel: he,
    addButtonTooltip: le = "Add field",
    validate: d,
    validateEvent: f = "blur",
    maxLength: k,
    pattern: E,
    autoComplete: Z,
    onChange: p,
    onSectionAdd: U,
    onSectionRemove: ue,
    onFocus: G,
    onBlur: Y,
    onEnter: ce
  }, ne) => {
    const ie = ve((B) => {
      if (!B)
        return [{ id: nt(), value: "", isPrimary: !0 }];
      const pe = Array.isArray(B) ? B : B.split(P).map(($e) => $e.trim()).filter(($e) => $e);
      return pe.length === 0 ? [{ id: nt(), value: "", isPrimary: !0 }] : pe.map(($e, De) => ({
        id: nt(),
        value: $e,
        isPrimary: De === 0
      }));
    }, [P]), [M, m] = q(
      () => ie(o ?? l)
    ), [r, R] = q(I), [ee, de] = q(!0), [me, Ne] = q(!1), [Ae, Se] = q(D || j || ""), [_e, Ve] = q(0), N = Ce(null), se = Ce(/* @__PURE__ */ new Map());
    be(() => {
      o !== void 0 && m(ie(o));
    }, [o, ie]), be(() => {
      R(I);
    }, [I]), be(() => {
      D ? (Ne(!0), Se(D)) : j && Se(j);
    }, [D, j]);
    const ke = ve(() => M.map((B) => B.value).filter((B) => B).join(P), [M, P]), xe = ve(() => M.map((B) => B.value), [M]), u = ve(() => {
      if (v && M.every((B) => !B.value.trim()))
        return Ne(!0), Se(j || "This field is required"), !1;
      if (d) {
        const B = M.map(($e) => $e.value), pe = d(B);
        if (typeof pe == "string")
          return Ne(!0), Se(pe), !1;
        if (pe === !1)
          return Ne(!0), Se(j || "Invalid value"), !1;
      }
      return Ne(!1), Se(""), !0;
    }, [M, v, d, j]), oe = ve((B, pe) => {
      m(($e) => {
        const De = $e.map(
          (Ee) => Ee.id === B ? { ...Ee, value: pe } : Ee
        );
        return setTimeout(() => {
          const Ee = De.map((Te) => Te.value), Re = Ee.filter((Te) => Te).join(P);
          p?.(Ee, Re), f === "change" && u();
        }, 0), De;
      });
    }, [P, p, f, u]), s = ve((B = "") => {
      if (t && M.length >= t)
        return "";
      const pe = nt(), $e = {
        id: pe,
        value: B,
        isPrimary: !1
      };
      return m((De) => [...De, $e]), setTimeout(() => {
        se.current.get(pe)?.focus();
      }, 50), U?.(pe, M.length), setTimeout(() => {
        const De = [...M.map((Re) => Re.value), B], Ee = De.filter((Re) => Re).join(P);
        p?.(De, Ee);
      }, 0), pe;
    }, [M, t, P, p, U]), C = ve((B) => {
      m((pe) => {
        const $e = B || pe.filter((Re) => !Re.isPrimary).pop()?.id;
        if (!$e) return pe;
        const De = pe.find((Re) => Re.id === $e);
        if (!De || De.isPrimary) return pe;
        const Ee = pe.filter((Re) => Re.id !== $e);
        return ue?.($e, De.value), setTimeout(() => {
          const Re = Ee.map((je) => je.value), Te = Re.filter((je) => je).join(P);
          p?.(Re, Te);
        }, 0), Ee;
      });
    }, [P, p, ue]), c = ve((B, pe) => {
      if (pe.key === "Enter") {
        const $e = M.find((De) => De.id === B);
        $e && ce?.(B, $e.value);
      }
    }, [M, ce]), X = ve((B, pe) => {
      G?.(B, pe);
    }, [G]), b = ve((B, pe) => {
      Y?.(B, pe), f === "blur" && u();
    }, [Y, f, u]);
    We(ne, () => ({
      getValue: () => ke(),
      getValues: () => xe(),
      setValue: (B) => {
        m(ie(B));
      },
      getValueHere: () => M[0]?.value || "",
      setValueHere: (B) => {
        m((pe) => {
          const $e = [...pe];
          return $e[0] && ($e[0] = { ...$e[0], value: B }), $e;
        });
      },
      addSection: (B) => s(B || ""),
      removeSection: (B) => C(B),
      getFieldIds: () => M.map((B) => B.id),
      getField: (B) => M.find((pe) => pe.id === B),
      getFieldCount: () => M.length,
      clearAdditional: () => {
        m((B) => {
          const pe = B.find(($e) => $e.isPrimary);
          return pe ? [pe] : [{ id: nt(), value: "", isPrimary: !0 }];
        });
      },
      clear: () => {
        m([{ id: nt(), value: "", isPrimary: !0 }]);
      },
      focus: () => {
        const B = M.find((pe) => pe.isPrimary);
        B && se.current.get(B.id)?.focus();
      },
      focusField: (B) => {
        se.current.get(B)?.focus();
      },
      blur: () => {
        se.current.forEach((B) => B.blur());
      },
      refresh: () => Ve((B) => B + 1),
      enable: () => R(!1),
      disable: () => R(!0),
      isEnabled: () => !r,
      hide: () => de(!1),
      show: () => de(!0),
      isVisible: () => ee,
      validate: () => u(),
      getNode: () => N.current
    }), [M, ke, xe, ie, s, C, r, ee, u]);
    const Q = [
      "avakio-multitext",
      `avakio-multitext--${W}`,
      `avakio-multitext--label-${O}`,
      r && "avakio-multitext--disabled",
      V && "avakio-multitext--readonly",
      me && "avakio-multitext--invalid",
      !ee && "avakio-multitext--hidden",
      J
    ].filter(Boolean).join(" "), re = {
      ...H && typeof H == "object" && !Array.isArray(H) ? H : {},
      width: K ? typeof K == "number" ? `${K}px` : K : void 0,
      height: _ ? typeof _ == "number" ? `${_}px` : _ : void 0,
      minWidth: h ? typeof h == "number" ? `${h}px` : h : void 0,
      maxWidth: ae ? typeof ae == "number" ? `${ae}px` : ae : void 0
    }, ye = !t || M.length < t;
    return ee ? /* @__PURE__ */ g(
      "div",
      {
        ref: N,
        id: a,
        "data-testid": n,
        className: Q,
        style: re,
        "data-admin-theme": W,
        children: [
          y && /* @__PURE__ */ g(
            "label",
            {
              className: "avakio-multitext__label",
              style: {
                width: O === "left" ? `${x}px` : void 0,
                textAlign: A
              },
              children: [
                y,
                v && /* @__PURE__ */ e("span", { className: "avakio-multitext__required", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ g("div", { className: "avakio-multitext__fields", children: [
            M.map((B, pe) => /* @__PURE__ */ g("div", { className: "avakio-multitext__field-row", children: [
              F && /* @__PURE__ */ g("span", { className: "avakio-multitext__field-number", children: [
                pe + 1,
                "."
              ] }),
              /* @__PURE__ */ g("div", { className: "avakio-multitext__input-wrapper", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    ref: ($e) => {
                      $e ? se.current.set(B.id, $e) : se.current.delete(B.id);
                    },
                    type: "text",
                    name: i ? `${i}[${pe}]` : void 0,
                    value: B.value,
                    placeholder: B.isPrimary ? T : w?.placeholder || T,
                    disabled: r || B.disabled || (B.isPrimary ? !1 : w?.disabled),
                    readOnly: V,
                    maxLength: B.isPrimary ? k : w?.maxLength || k,
                    pattern: B.isPrimary ? E : w?.pattern || E,
                    autoComplete: Z,
                    className: "avakio-multitext__input",
                    style: {
                      textAlign: $,
                      width: z ? `${z}px` : void 0
                    },
                    onChange: ($e) => oe(B.id, $e.target.value),
                    onKeyPress: ($e) => c(B.id, $e),
                    onFocus: ($e) => X(B.id, $e),
                    onBlur: ($e) => b(B.id, $e),
                    "aria-invalid": me,
                    "aria-describedby": me ? `${a}-error` : void 0
                  }
                ),
                B.isPrimary && !V && ye && /* @__PURE__ */ g(
                  "button",
                  {
                    type: "button",
                    className: "avakio-multitext__add-btn",
                    onClick: () => s(),
                    disabled: r,
                    title: le,
                    style: { width: L ? `${L}px` : void 0 },
                    "aria-label": he || "Add field",
                    children: [
                      S || /* @__PURE__ */ e(Pt, { size: 16 }),
                      he && /* @__PURE__ */ e("span", { className: "avakio-multitext__add-btn-label", children: he })
                    ]
                  }
                ),
                !B.isPrimary && !V && /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-multitext__remove-btn",
                    onClick: () => C(B.id),
                    disabled: r,
                    title: "Remove field",
                    "aria-label": "Remove field",
                    children: /* @__PURE__ */ e(Je, { size: 16 })
                  }
                )
              ] })
            ] }, B.id)),
            te && /* @__PURE__ */ e("div", { className: "avakio-multitext__bottom-label", children: te }),
            me && Ae && /* @__PURE__ */ e("div", { id: `${a}-error`, className: "avakio-multitext__error", role: "alert", children: Ae })
          ] })
        ]
      },
      _e
    ) : null;
  }
);
dn.displayName = "AvakioMultitext";
function un(a) {
  return a.map((n, i) => typeof n == "string" ? { id: n, value: n } : n);
}
const hn = He(
  ({
    id: a,
    testId: n,
    name: i,
    value: o,
    defaultValue: l = null,
    options: y,
    label: x,
    labelWidth: A = 80,
    labelAlign: O = "left",
    labelPosition: T = "left",
    vertical: v = !1,
    size: D = "md",
    theme: j,
    disabled: te = !1,
    required: W = !1,
    invalid: I = !1,
    invalidMessage: V,
    bottomLabel: J,
    customRadio: H = !0,
    optionHeight: K,
    className: _ = "",
    css: h,
    width: ae,
    height: $,
    onChange: z,
    onClick: S,
    onFocus: L,
    onBlur: t
  }, P) => {
    const w = Ce(null), F = Ce(/* @__PURE__ */ new Map()), he = Nt(), le = i || `avakio-radio-${he}`, d = o !== void 0, [f, k] = q(l), [E, Z] = q(te), [p, U] = q(/* @__PURE__ */ new Map()), [, ue] = q({}), G = d ? o : f, Y = un(y);
    be(() => {
      Z(te);
    }, [te]);
    const ce = (r) => {
      const R = p.get(r.id);
      return {
        disabled: R?.disabled ?? r.disabled ?? !1,
        hidden: R?.hidden ?? r.hidden ?? !1
      };
    };
    We(P, () => ({
      getValue: () => (d ? o : f) ?? null,
      setValue: (r) => {
        d || k(r), r !== null && z?.(r);
      },
      focus: () => {
        const r = Y.find((R) => !ce(R).disabled && !ce(R).hidden);
        r && F.current.get(r.id)?.focus();
      },
      blur: () => {
        document.activeElement instanceof HTMLElement && document.activeElement.blur();
      },
      enable: () => Z(!1),
      disable: () => Z(!0),
      enableOption: (r) => {
        U((R) => {
          const ee = new Map(R), de = ee.get(r) || {};
          return ee.set(r, { ...de, disabled: !1 }), ee;
        });
      },
      disableOption: (r) => {
        U((R) => {
          const ee = new Map(R), de = ee.get(r) || {};
          return ee.set(r, { ...de, disabled: !0 }), ee;
        });
      },
      showOption: (r) => {
        U((R) => {
          const ee = new Map(R), de = ee.get(r) || {};
          return ee.set(r, { ...de, hidden: !1 }), ee;
        });
      },
      hideOption: (r) => {
        U((R) => {
          const ee = new Map(R), de = ee.get(r) || {};
          return ee.set(r, { ...de, hidden: !0 }), ee;
        });
      },
      isEnabled: () => !E,
      getNode: () => w.current,
      getOption: (r) => Y.find((R) => R.id === r),
      refresh: () => ue({})
    }));
    const ne = (r) => {
      d || k(r), z?.(r);
    }, ie = (r, R) => {
      const ee = Y.filter((Ne) => !ce(Ne).hidden), de = ee.findIndex((Ne) => Ne.id === Y[R].id);
      let me = -1;
      if (r.key === "ArrowDown" || r.key === "ArrowRight") {
        r.preventDefault();
        for (let Ne = 1; Ne <= ee.length; Ne++) {
          const Ae = (de + Ne) % ee.length;
          if (!ce(ee[Ae]).disabled) {
            me = Ae;
            break;
          }
        }
      } else if (r.key === "ArrowUp" || r.key === "ArrowLeft") {
        r.preventDefault();
        for (let Ne = 1; Ne <= ee.length; Ne++) {
          const Ae = (de - Ne + ee.length) % ee.length;
          if (!ce(ee[Ae]).disabled) {
            me = Ae;
            break;
          }
        }
      }
      if (me >= 0) {
        const Ne = ee[me];
        F.current.get(Ne.id)?.focus(), ne(Ne.id);
      }
    }, M = [
      "avakio-radio-container",
      `avakio-radio-container-${D}`,
      v ? "avakio-radio-vertical" : "avakio-radio-horizontal",
      T === "top" ? "avakio-radio-label-top" : "",
      E ? "avakio-radio-container-disabled" : "",
      I ? "avakio-radio-container-invalid" : "",
      _
    ].filter(Boolean).join(" "), m = {
      ...h && typeof h == "object" && !Array.isArray(h) ? h : {},
      ...ae ? { width: typeof ae == "number" ? `${ae}px` : ae } : {},
      ...$ ? { height: typeof $ == "number" ? `${$}px` : $ } : {}
    };
    return /* @__PURE__ */ g(
      "div",
      {
        ref: w,
        id: a,
        "data-testid": n,
        className: M,
        style: m,
        "data-admin-theme": j,
        role: "radiogroup",
        "aria-labelledby": x ? `${le}-label` : void 0,
        "aria-required": W,
        "aria-invalid": I,
        children: [
          x && /* @__PURE__ */ g(
            "label",
            {
              id: `${le}-label`,
              className: `avakio-radio-label avakio-radio-label-${O}`,
              style: { width: T === "left" ? A : void 0 },
              children: [
                x,
                W && /* @__PURE__ */ e("span", { className: "avakio-radio-required", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ e("div", { className: "avakio-radio-options", children: Y.map((r, R) => {
            const ee = ce(r);
            if (ee.hidden) return null;
            const de = G === r.id, me = E || ee.disabled, Ne = [
              "avakio-radio-option",
              de ? "avakio-radio-option-checked" : "",
              me ? "avakio-radio-option-disabled" : "",
              H ? "avakio-radio-custom" : "avakio-radio-native",
              r.css || ""
            ].filter(Boolean).join(" ");
            return /* @__PURE__ */ g(
              "label",
              {
                className: Ne,
                style: K ? { height: K } : {},
                title: r.tooltip,
                onClick: (Se) => {
                  me || S?.(Se, r);
                },
                children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      ref: (Se) => {
                        Se ? F.current.set(r.id, Se) : F.current.delete(r.id);
                      },
                      type: "radio",
                      name: le,
                      value: String(r.id),
                      checked: de,
                      disabled: me,
                      onChange: () => ne(r.id),
                      onKeyDown: (Se) => ie(Se, R),
                      onFocus: L,
                      onBlur: t,
                      className: "avakio-radio-input",
                      "aria-checked": de
                    }
                  ),
                  H && /* @__PURE__ */ e("span", { className: "avakio-radio-indicator", children: /* @__PURE__ */ e("span", { className: "avakio-radio-dot" }) }),
                  r.icon && /* @__PURE__ */ e("span", { className: "avakio-radio-icon", children: r.icon }),
                  /* @__PURE__ */ e("span", { className: "avakio-radio-text", children: r.value })
                ]
              },
              r.id
            );
          }) }),
          (J || I && V) && /* @__PURE__ */ e("div", { className: "avakio-radio-bottom", style: { paddingLeft: T === "left" ? A + 8 : 0 }, children: I && V ? /* @__PURE__ */ e("span", { className: "avakio-radio-invalid-message", children: V }) : J ? /* @__PURE__ */ e("span", { className: "avakio-radio-bottom-label", children: J }) : null })
        ]
      }
    );
  }
);
hn.displayName = "AvakioRadio";
const xt = (a) => a.map((n, i) => typeof n == "string" ? { id: n, value: n } : n), fn = He(
  ({
    id: a,
    testId: n,
    name: i,
    value: o,
    defaultValue: l,
    options: y = [],
    label: x,
    labelWidth: A = 120,
    labelAlign: O = "left",
    labelPosition: T = "left",
    required: v = !1,
    error: D,
    invalidMessage: j,
    bottomLabel: te,
    size: W = "md",
    align: I = "left",
    theme: V,
    fill: J = !1,
    optionWidth: H,
    disabled: K = !1,
    borderless: _ = !1,
    className: h = "",
    css: ae,
    width: $,
    height: z,
    minWidth: S,
    maxWidth: L,
    multiview: t = !1,
    tooltip: P,
    inputAlign: w,
    inputWidth: F,
    inputHeight: he,
    onChange: le,
    onBeforeTabClick: d,
    onAfterTabClick: f,
    onOptionAdd: k,
    onOptionRemove: E
  }, Z) => {
    const p = Ce(null), U = Ce([]), [ue, G] = q(
      () => xt(y)
    ), Y = o !== void 0, [ce, ne] = q(() => l !== void 0 ? l : xt(y).find((s) => !s.disabled && !s.hidden)?.id ?? null), [ie, M] = q(K), [m, r] = q(!0), [R, ee] = q(/* @__PURE__ */ new Set()), [de, me] = q(/* @__PURE__ */ new Set()), [Ne, Ae] = q(0), Se = Y ? o : ce;
    be(() => {
      G(xt(y));
    }, [y]), be(() => {
      M(K);
    }, [K]), be(() => {
      if (Y) return;
      const u = ue.filter(
        (s) => !s.hidden && !R.has(s.id)
      );
      if (!u.some(
        (s) => s.id === ce && !s.disabled && !de.has(s.id)
      ) && u.length > 0) {
        const s = u.find(
          (C) => !C.disabled && !de.has(C.id)
        )?.id ?? null;
        ne(s);
      }
    }, [ue, ce, Y, R, de]);
    const _e = ue.filter(
      (u) => !u.hidden && !R.has(u.id)
    ), Ve = ve((u) => {
      if (ie) return;
      const oe = ue.find((s) => s.id === u);
      oe && (oe.disabled || de.has(u) || d && d(u) === !1 || (Y || ne(u), le?.(u, oe), f?.(u)));
    }, [ie, ue, de, Y, le, d, f]), N = ve((u, oe) => {
      if (ie) return;
      let s = -1;
      switch (u.key) {
        case "ArrowLeft":
        case "ArrowUp":
          for (u.preventDefault(), s = oe - 1; s >= 0; ) {
            const C = _e[s];
            if (!C.disabled && !de.has(C.id)) break;
            s--;
          }
          break;
        case "ArrowRight":
        case "ArrowDown":
          for (u.preventDefault(), s = oe + 1; s < _e.length; ) {
            const C = _e[s];
            if (!C.disabled && !de.has(C.id)) break;
            s++;
          }
          break;
        case "Home":
          for (u.preventDefault(), s = 0; s < _e.length; ) {
            const C = _e[s];
            if (!C.disabled && !de.has(C.id)) break;
            s++;
          }
          break;
        case "End":
          for (u.preventDefault(), s = _e.length - 1; s >= 0; ) {
            const C = _e[s];
            if (!C.disabled && !de.has(C.id)) break;
            s--;
          }
          break;
        case "Enter":
        case " ":
          u.preventDefault(), Ve(_e[oe].id);
          return;
      }
      s >= 0 && s < _e.length && U.current[s]?.focus();
    }, [ie, _e, de, Ve]);
    We(Z, () => ({
      getValue: () => Se,
      setValue: (u) => {
        Y || ne(u);
        const oe = ue.find((s) => s.id === u);
        le?.(u, oe);
      },
      getOption: (u) => ue.find((oe) => oe.id === u),
      getOptions: () => ue,
      addOption: (u, oe) => {
        G((s) => {
          const C = [...s];
          return oe !== void 0 && oe >= 0 && oe <= s.length ? C.splice(oe, 0, u) : C.push(u), C;
        }), k?.(u);
      },
      removeOption: (u) => {
        if (G((oe) => oe.filter((s) => s.id !== u)), E?.(u), Se === u && !Y) {
          const s = ue.filter(
            (C) => C.id !== u && !C.hidden && !R.has(C.id)
          ).find(
            (C) => !C.disabled && !de.has(C.id)
          )?.id ?? null;
          ne(s);
        }
      },
      hideOption: (u) => {
        ee((oe) => {
          const s = new Set(Array.from(oe));
          return s.add(u), s;
        });
      },
      showOption: (u) => {
        ee((oe) => {
          const s = new Set(oe);
          return s.delete(u), s;
        });
      },
      disableOption: (u) => {
        me((oe) => {
          const s = new Set(Array.from(oe));
          return s.add(u), s;
        });
      },
      enableOption: (u) => {
        me((oe) => {
          const s = new Set(oe);
          return s.delete(u), s;
        });
      },
      optionIndex: (u) => ue.findIndex((oe) => oe.id === u),
      refresh: () => Ae((u) => u + 1),
      focus: () => {
        const u = _e.findIndex((s) => s.id === Se), oe = u >= 0 ? u : 0;
        U.current[oe]?.focus();
      },
      blur: () => {
        U.current.forEach((u) => u?.blur());
      },
      enable: () => M(!1),
      disable: () => M(!0),
      isEnabled: () => !ie,
      hide: () => r(!1),
      show: () => r(!0),
      isVisible: () => m,
      validate: () => !(v && Se === null),
      getNode: () => p.current
    }), [
      Se,
      Y,
      ue,
      _e,
      R,
      de,
      ie,
      m,
      v,
      le,
      k,
      E
    ]);
    const se = {
      ...ae && typeof ae == "object" && !Array.isArray(ae) ? ae : {},
      ...$ !== void 0 && { width: typeof $ == "number" ? `${$}px` : $ },
      ...z !== void 0 && { height: typeof z == "number" ? `${z}px` : z },
      ...S !== void 0 && { minWidth: typeof S == "number" ? `${S}px` : S },
      ...L !== void 0 && { maxWidth: typeof L == "number" ? `${L}px` : L },
      ...m === !1 && { display: "none" }
    }, ke = {
      ...F !== void 0 && { width: typeof F == "number" ? `${F}px` : F },
      ...he !== void 0 && { height: typeof he == "number" ? `${he}px` : he },
      ...w !== void 0 && { justifyContent: w === "left" ? "flex-start" : w === "right" ? "flex-end" : "center" }
    }, xe = !!D || !!j;
    return /* @__PURE__ */ g(
      "div",
      {
        ref: p,
        id: a,
        "data-testid": n,
        "data-admin-theme": V,
        className: [
          "avakio-segmented",
          `avakio-segmented-size-${W}`,
          `avakio-segmented-align-${I}`,
          J ? "avakio-segmented-fill" : "",
          _ ? "avakio-segmented-borderless" : "",
          ie ? "avakio-segmented-disabled" : "",
          xe ? "avakio-segmented-error" : "",
          T === "top" ? "avakio-segmented-label-top" : "",
          h
        ].filter(Boolean).join(" "),
        style: se,
        title: P,
        children: [
          x && /* @__PURE__ */ g(
            "label",
            {
              className: "avakio-segmented-label",
              style: {
                width: T === "left" ? A : "auto",
                textAlign: O
              },
              children: [
                x,
                v && /* @__PURE__ */ e("span", { className: "avakio-segmented-required", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ g("div", { className: "avakio-segmented-wrapper", style: ke, children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: "avakio-segmented-track",
                role: "tablist",
                "aria-label": x || "Segmented control",
                children: _e.map((u, oe) => {
                  const s = u.id === Se, C = ie || u.disabled || de.has(u.id);
                  return /* @__PURE__ */ g(
                    "button",
                    {
                      ref: (c) => {
                        U.current[oe] = c;
                      },
                      type: "button",
                      role: "tab",
                      "aria-selected": s,
                      "aria-disabled": C,
                      "aria-controls": u.ariaControls,
                      tabIndex: s ? 0 : -1,
                      className: [
                        "avakio-segmented-segment",
                        s ? "avakio-segmented-segment-active" : "",
                        C ? "avakio-segmented-segment-disabled" : ""
                      ].filter(Boolean).join(" "),
                      style: H ? { width: H } : void 0,
                      title: u.tooltip,
                      disabled: C,
                      onClick: () => Ve(u.id),
                      onKeyDown: (c) => N(c, oe),
                      children: [
                        u.icon && /* @__PURE__ */ e("span", { className: "avakio-segmented-icon", children: u.icon }),
                        /* @__PURE__ */ e("span", { className: "avakio-segmented-text", children: u.value }),
                        u.badge !== void 0 && /* @__PURE__ */ e("span", { className: "avakio-segmented-badge", children: u.badge })
                      ]
                    },
                    u.id
                  );
                })
              }
            ),
            i && /* @__PURE__ */ e(
              "input",
              {
                type: "hidden",
                name: i,
                value: Se?.toString() ?? ""
              }
            )
          ] }),
          (D || j) && /* @__PURE__ */ e("div", { className: "avakio-segmented-error-text", children: D || j }),
          te && !xe && /* @__PURE__ */ e("div", { className: "avakio-segmented-bottom-label", children: te })
        ]
      },
      Ne
    );
  }
);
fn.displayName = "AvakioSegmentedButton";
const vn = He(
  ({
    id: a,
    testId: n,
    name: i,
    value: o,
    defaultValue: l = !1,
    label: y,
    labelWidth: x = 80,
    labelRight: A,
    onLabel: O,
    offLabel: T,
    size: v = "md",
    theme: D,
    disabled: j = !1,
    required: te = !1,
    invalid: W = !1,
    invalidMessage: I,
    bottomLabel: V,
    tooltip: J,
    className: H = "",
    css: K,
    width: _,
    height: h,
    onChange: ae,
    onClick: $,
    onFocus: z,
    onBlur: S
  }, L) => {
    const t = Ce(null), P = o !== void 0, w = (Y) => Y === void 0 ? !1 : Y === !0 || Y === 1, [F, he] = q(w(l)), [le, d] = q(j), [, f] = q({}), k = P ? w(o) : F;
    be(() => {
      d(j);
    }, [j]), We(L, () => ({
      getValue: () => P ? w(o) : F,
      setValue: (Y) => {
        P || he(Y), ae?.(Y);
      },
      toggle: () => {
        const ce = !(P ? w(o) : F);
        P || he(ce), ae?.(ce);
      },
      focus: () => t.current?.focus(),
      blur: () => t.current?.blur(),
      enable: () => d(!1),
      disable: () => d(!0),
      isEnabled: () => !le,
      getNode: () => t.current,
      refresh: () => f({})
    }), [P, o, F, le, ae]);
    const E = (Y) => {
      if (le) return;
      const ce = !k;
      P || he(ce), ae?.(ce), $?.(Y);
    }, Z = [
      "avakio-switch-container",
      `avakio-switch-container-${v}`,
      D && `avakio-switch-theme-${D}`,
      le && "avakio-switch-container-disabled",
      W && "avakio-switch-container-invalid",
      H
    ].filter(Boolean).join(" "), p = [
      "avakio-switch-button",
      `avakio-switch-button-${v}`,
      k && "avakio-switch-button-on",
      le && "avakio-switch-button-disabled",
      (O || T) && "avakio-switch-button-with-labels"
    ].filter(Boolean).join(" "), U = {
      ...K && typeof K == "object" && !Array.isArray(K) ? K : {},
      width: typeof _ == "number" ? `${_}px` : _,
      height: typeof h == "number" ? `${h}px` : h
    }, ue = {
      width: x > 0 ? `${x}px` : void 0,
      minWidth: x > 0 ? `${x}px` : void 0
    };
    return /* @__PURE__ */ g(
      "div",
      {
        className: Z,
        style: U,
        "data-admin-theme": D,
        children: [
          y && /* @__PURE__ */ g(
            "label",
            {
              className: "avakio-switch-label avakio-switch-label-left",
              style: ue,
              children: [
                y,
                te && /* @__PURE__ */ e("span", { className: "avakio-switch-required", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              ref: t,
              id: a,
              "data-testid": n,
              name: i,
              type: "button",
              role: "switch",
              "aria-checked": k,
              "aria-disabled": le,
              "aria-label": y || A || "Switch",
              className: p,
              disabled: le,
              title: J,
              onClick: E,
              onFocus: z,
              onBlur: S,
              children: /* @__PURE__ */ g("span", { className: "avakio-switch-track", children: [
                (O || T) && /* @__PURE__ */ g(et, { children: [
                  /* @__PURE__ */ e("span", { className: "avakio-switch-track-on-label", children: O }),
                  /* @__PURE__ */ e("span", { className: "avakio-switch-track-off-label", children: T })
                ] }),
                /* @__PURE__ */ e("span", { className: "avakio-switch-thumb" })
              ] })
            }
          ),
          A && /* @__PURE__ */ g("label", { className: "avakio-switch-label avakio-switch-label-right", children: [
            A,
            te && !y && /* @__PURE__ */ e("span", { className: "avakio-switch-required", children: "*" })
          ] }),
          (V || W && I) && /* @__PURE__ */ e("div", { className: "avakio-switch-bottom", children: W && I ? /* @__PURE__ */ e("span", { className: "avakio-switch-invalid-message", children: I }) : /* @__PURE__ */ e("span", { className: "avakio-switch-bottom-label", children: V }) })
        ]
      }
    );
  }
);
vn.displayName = "AvakioSwitchButton";
function as({
  id: a,
  value: n,
  options: i = [],
  onChange: o,
  onClose: l,
  renderTab: y,
  align: x = "left",
  type: A = "top",
  closable: O = !1,
  fill: T = !1,
  size: v = "md",
  scrollable: D = !0,
  label: j,
  labelWidth: te = 120,
  labelAlign: W = "left",
  required: I = !1,
  error: V,
  disabled: J = !1,
  className: H = "",
  testId: K
}) {
  const [_, h] = q(n ?? null), [ae, $] = q(/* @__PURE__ */ new Set()), [z, S] = q(!1), [L, t] = q(!1), P = Ce([]), w = Ce(null), F = Ie(() => i.filter((G) => !G.hidden).filter((G) => !ae.has(G.id)), [i, ae]), he = n !== void 0 ? n : _;
  be(() => {
    if (n !== void 0) return;
    if (!F.some((Y) => Y.id === _ && !Y.disabled)) {
      const Y = F.find((ce) => !ce.disabled)?.id ?? null;
      h(Y);
    }
  }, [F, _, n]), be(() => {
    n !== void 0 && h(n ?? null);
  }, [n]);
  const le = ve(() => {
    const G = w.current;
    if (!G || !D) {
      S(!1), t(!1);
      return;
    }
    const { scrollLeft: Y, scrollWidth: ce, clientWidth: ne } = G;
    S(Y > 0), t(Y + ne < ce - 1);
  }, [D]);
  be(() => {
    le();
    const G = w.current;
    if (G) {
      G.addEventListener("scroll", le);
      const Y = new ResizeObserver(le);
      return Y.observe(G), () => {
        G.removeEventListener("scroll", le), Y.disconnect();
      };
    }
  }, [le, F]);
  const d = () => {
    const G = w.current;
    G && G.scrollBy({ left: -150, behavior: "smooth" });
  }, f = () => {
    const G = w.current;
    G && G.scrollBy({ left: 150, behavior: "smooth" });
  }, k = (G, Y) => {
    P.current[G] = Y;
  }, E = (G) => {
    if (G == null) return;
    const Y = F.findIndex((ce) => ce.id === G);
    Y >= 0 && P.current[Y]?.focus();
  }, Z = (G) => {
    !G || G.disabled || J || (n === void 0 && h(G.id), o?.(G.id, G));
  }, p = (G, Y) => {
    if (Y && (Y.stopPropagation(), Y.preventDefault()), !(G.disabled || J) && ($((ce) => {
      const ne = new Set(ce);
      return ne.add(G.id), ne;
    }), l?.(G.id, G), n === void 0 && he === G.id)) {
      const ne = F.filter((ie) => ie.id !== G.id && !ie.disabled)[0]?.id ?? null;
      h(ne), requestAnimationFrame(() => E(ne));
    }
  }, U = (G) => {
    if (!F.length) return;
    const Y = F.filter((M) => !M.disabled);
    if (!Y.length) return;
    const ce = Y.findIndex((M) => M.id === he), ne = ce === -1 ? 0 : ce;
    let ie;
    switch (G) {
      case "next":
        ie = Y[(ne + 1) % Y.length];
        break;
      case "prev":
        ie = Y[(ne - 1 + Y.length) % Y.length];
        break;
      case "first":
        ie = Y[0];
        break;
      case "last":
        ie = Y[Y.length - 1];
        break;
    }
    Z(ie), E(ie.id);
  }, ue = (G) => {
    switch (G.key) {
      case "ArrowRight":
      case "ArrowDown":
        G.preventDefault(), U("next");
        break;
      case "ArrowLeft":
      case "ArrowUp":
        G.preventDefault(), U("prev");
        break;
      case "Home":
        G.preventDefault(), U("first");
        break;
      case "End":
        G.preventDefault(), U("last");
        break;
      case "Delete":
      case "Backspace":
        if (O) {
          const Y = F.find((ce) => ce.id === he);
          Y && (G.preventDefault(), p(Y));
        }
        break;
    }
  };
  return /* @__PURE__ */ g(
    "div",
    {
      id: a,
      "data-testid": K,
      className: `avakio-tabbar ${H}`.trim(),
      "data-type": A,
      "data-align": x,
      "data-size": v,
      "data-fill": T,
      "data-disabled": J,
      "data-error": !!V,
      children: [
        j && /* @__PURE__ */ g(
          "div",
          {
            className: "avakio-tabbar-label",
            style: { width: te, textAlign: W },
            children: [
              /* @__PURE__ */ e("span", { children: j }),
              I && /* @__PURE__ */ e("span", { className: "avakio-tabbar-required", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ g("div", { className: "avakio-tabbar-wrapper", children: [
          D && z && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-tabbar-scroll-btn avakio-tabbar-scroll-left",
              onClick: d,
              "aria-label": "Scroll tabs left",
              children: /* @__PURE__ */ e(Ze, { size: 16, strokeWidth: 2.5 })
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              ref: w,
              className: "avakio-tabbar-track",
              role: "tablist",
              "aria-label": j || "Tab Bar",
              "data-scrollable": D,
              "data-has-scroll-left": z,
              "data-has-scroll-right": L,
              onKeyDown: ue,
              children: F.map((G, Y) => {
                const ce = G.id === he, ne = J || G.disabled, M = (G.close || O) && !ne ? /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "avakio-tabbar-close",
                    "aria-label": `Close ${G.label}`,
                    onClick: (R) => p(G, R),
                    children: /* @__PURE__ */ e(Je, { size: 14, strokeWidth: 2.5 })
                  }
                ) : null, m = /* @__PURE__ */ g(et, { children: [
                  /* @__PURE__ */ g("span", { className: "avakio-tabbar-inner", children: [
                    G.icon && /* @__PURE__ */ e("span", { className: "avakio-tabbar-icon", children: G.icon }),
                    /* @__PURE__ */ e("span", { className: "avakio-tabbar-text", children: G.label }),
                    G.badge !== void 0 && /* @__PURE__ */ e("span", { className: "avakio-tabbar-badge", children: G.badge })
                  ] }),
                  M
                ] }), r = y ? y(G, ce, M) : m;
                return /* @__PURE__ */ e(
                  "div",
                  {
                    ref: (R) => k(Y, R),
                    className: `avakio-tabbar-tab${ce ? " active" : ""}`,
                    role: "tab",
                    "aria-selected": ce,
                    "aria-controls": G.ariaControls,
                    tabIndex: ce && !ne ? 0 : -1,
                    onClick: () => Z(G),
                    onKeyDown: (R) => {
                      (R.key === "Enter" || R.key === " ") && (R.preventDefault(), Z(G));
                    },
                    "aria-disabled": ne,
                    "data-active": ce,
                    "data-disabled": ne,
                    children: r
                  },
                  G.id
                );
              })
            }
          ),
          D && L && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-tabbar-scroll-btn avakio-tabbar-scroll-right",
              onClick: f,
              "aria-label": "Scroll tabs right",
              children: /* @__PURE__ */ e(Ge, { size: 16, strokeWidth: 2.5 })
            }
          ),
          V && /* @__PURE__ */ e("div", { className: "avakio-tabbar-error", children: V })
        ] })
      ]
    }
  );
}
const mn = He(
  ({
    value: a = "",
    label: n,
    placeholder: i,
    name: o,
    type: l = "text",
    disabled: y = !1,
    readonly: x = !1,
    required: A = !1,
    theme: O = "material",
    className: T = "",
    width: v,
    height: D,
    labelWidth: j = 100,
    labelPosition: te = "left",
    labelAlign: W = "left",
    inputAlign: I = "left",
    bottomLabel: V,
    clear: J = !1,
    enableValueCopyButton: H = !1,
    enablePlaceHolderCopyButton: K = !1,
    icon: _,
    iconPosition: h = "left",
    validate: ae,
    validateEvent: $ = "blur",
    invalid: z = !1,
    invalidMessage: S,
    maxLength: L,
    pattern: t,
    min: P,
    max: w,
    step: F,
    autoComplete: he,
    multiline: le = !1,
    rows: d = 4,
    onChange: f,
    onBlur: k,
    onFocus: E,
    onEnter: Z,
    onKeyPress: p,
    onClick: U,
    padding: ue,
    margin: G,
    textWidth: Y
  }, ce) => {
    const [ne, ie] = q(a), [M, m] = q(z), [r, R] = q(S || ""), [ee, de] = q(!1), [me, Ne] = q(y), [Ae, Se] = q(!1), _e = Ce(null);
    be(() => {
      ie(a);
    }, [a]), be(() => {
      m(z);
    }, [z]), be(() => {
      Ne(y);
    }, [y]);
    const Ve = (De) => {
      if (ae) {
        const Ee = ae(De);
        if (typeof Ee == "string")
          return m(!0), R(Ee), !1;
        if (Ee === !1)
          return m(!0), R(S || "Invalid value"), !1;
      }
      if (A && !De.trim())
        return m(!0), R("This field is required"), !1;
      if (l === "email" && De && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(De))
        return m(!0), R("Please enter a valid email address"), !1;
      if (l === "url" && De && !/^https?:\/\/.+/.test(De))
        return m(!0), R("Please enter a valid URL"), !1;
      if (l === "number" && De) {
        const Ee = parseFloat(De);
        if (isNaN(Ee))
          return m(!0), R("Please enter a valid number"), !1;
        if (P !== void 0 && Ee < P)
          return m(!0), R(`Value must be at least ${P}`), !1;
        if (w !== void 0 && Ee > w)
          return m(!0), R(`Value must be at most ${w}`), !1;
      }
      return t && De && !new RegExp(t).test(De) ? (m(!0), R(S || "Invalid format"), !1) : L && De.length > L ? (m(!0), R(`Maximum length is ${L} characters`), !1) : (m(!1), R(""), !0);
    }, N = (De) => {
      const Ee = De.target.value;
      ie(Ee), $ === "change" && Ve(Ee), f && f(Ee, De);
    }, se = (De) => {
      de(!1), $ === "blur" && Ve(ne), k && k(De);
    }, ke = (De) => {
      de(!0), E && E(De);
    }, xe = (De) => {
      De.key === "Enter" && !le && Z && Z(ne), p && p(De);
    }, u = () => {
      ie(""), m(!1), R(""), f && f("", {}), _e.current?.focus();
    }, oe = () => {
      Se(!Ae);
    }, s = () => {
      ne && navigator.clipboard.writeText(ne).then(() => {
      }).catch((De) => {
        console.error("Failed to copy text: ", De);
      });
    }, C = () => {
      i && navigator.clipboard.writeText(i).then(() => {
      }).catch((De) => {
        console.error("Failed to copy placeholder: ", De);
      });
    };
    We(ce, () => ({
      getValue: () => ne,
      setValue: (De) => {
        ie(De), $ === "change" && Ve(De);
      },
      focus: () => _e.current?.focus(),
      blur: () => _e.current?.blur(),
      validate: () => Ve(ne),
      getInputNode: () => _e.current,
      clear: u,
      isEnabled: () => !me,
      disable: () => Ne(!0),
      enable: () => Ne(!1)
    }));
    const c = {
      width: te === "left" ? j : void 0,
      textAlign: W
    }, X = l === "password" && Ae ? "text" : l, b = ue ? typeof ue == "number" ? `${ue}px` : Array.isArray(ue) ? `${ue[0]}px ${ue[1]}px ${ue[2]}px ${ue[3]}px` : ue : void 0, Q = G ? typeof G == "number" ? `${G}px` : Array.isArray(G) ? `${G[0]}px ${G[1]}px ${G[2]}px ${G[3]}px` : G : void 0, re = {
      width: typeof v == "number" ? `${v}px` : v,
      height: typeof D == "number" ? `${D}px` : D,
      ...b && { padding: b },
      ...Q && { margin: Q }
    }, ye = [
      "avakio-text",
      `avakio-text-theme-${O}`,
      te === "top" ? "avakio-text-label-top" : "avakio-text-label-left",
      M ? "avakio-text-invalid" : "",
      me ? "avakio-text-disabled" : "",
      ee ? "avakio-text-focused" : "",
      x ? "avakio-text-readonly" : "",
      T
    ].filter(Boolean).join(" "), B = J && ne || l === "password" || H && ne || K && i, pe = [
      "avakio-text-input",
      `avakio-text-input-align-${I}`,
      _ && h === "left" ? "avakio-text-input-with-icon-left" : "",
      _ && h === "right" && !B ? "avakio-text-input-with-icon-right" : "",
      B ? "avakio-text-input-with-action" : ""
    ].filter(Boolean).join(" "), $e = Y ? { width: typeof Y == "number" ? `${Y}px` : Y } : {};
    return /* @__PURE__ */ g("div", { className: ye, style: re, onClick: U, children: [
      n && /* @__PURE__ */ g("label", { className: "avakio-text-label", style: c, children: [
        n,
        A && /* @__PURE__ */ e("span", { className: "avakio-text-required", children: "*" })
      ] }),
      /* @__PURE__ */ g("div", { className: "avakio-text-content", children: [
        /* @__PURE__ */ g("div", { className: "avakio-text-input-wrapper", style: $e, children: [
          _ && h === "left" && /* @__PURE__ */ e("span", { className: "avakio-text-icon avakio-text-icon-left", children: _ }),
          le ? /* @__PURE__ */ e(
            "textarea",
            {
              ref: _e,
              className: pe,
              value: ne,
              placeholder: i,
              name: o,
              disabled: me,
              readOnly: x,
              required: A,
              maxLength: L,
              rows: d,
              onChange: N,
              onBlur: se,
              onFocus: ke,
              onKeyPress: xe
            }
          ) : /* @__PURE__ */ e(
            "input",
            {
              ref: _e,
              type: X,
              className: pe,
              value: ne,
              placeholder: i,
              name: o,
              disabled: me,
              readOnly: x,
              required: A,
              maxLength: L,
              pattern: t,
              min: P,
              max: w,
              step: F,
              autoComplete: he,
              onChange: N,
              onBlur: se,
              onFocus: ke,
              onKeyPress: xe
            }
          ),
          _ && h === "right" && !B && /* @__PURE__ */ e("span", { className: "avakio-text-icon avakio-text-icon-right", children: _ }),
          l === "password" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-text-action",
              onClick: oe,
              disabled: me,
              tabIndex: -1,
              children: Ae ? /* @__PURE__ */ e(ba, { size: 16 }) : /* @__PURE__ */ e(xa, { size: 16 })
            }
          ),
          J && ne && l !== "password" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-text-action avakio-text-clear",
              onClick: u,
              disabled: me || x,
              tabIndex: -1,
              children: /* @__PURE__ */ e(Je, { size: 16 })
            }
          ),
          H && ne && l !== "password" && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-text-action avakio-text-copy",
              onClick: s,
              disabled: me,
              tabIndex: -1,
              title: "Copy value to clipboard",
              children: /* @__PURE__ */ e(Ct, { size: 16 })
            }
          ),
          K && i && l !== "password" && !H && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "avakio-text-action avakio-text-copy",
              onClick: C,
              disabled: me,
              tabIndex: -1,
              title: "Copy placeholder to clipboard",
              children: /* @__PURE__ */ e(Ct, { size: 16 })
            }
          )
        ] }),
        V && /* @__PURE__ */ e("div", { className: "avakio-text-bottom-label", children: V }),
        M && r && /* @__PURE__ */ e("div", { className: "avakio-text-error-message", children: r })
      ] })
    ] });
  }
);
mn.displayName = "AvakioText";
const pn = He(
  ({
    id: a,
    testId: n,
    name: i,
    value: o,
    defaultValue: l = !1,
    label: y,
    onLabel: x,
    offLabel: A,
    icon: O,
    onIcon: T,
    offIcon: v,
    image: D,
    onImage: j,
    offImage: te,
    type: W = "default",
    size: I = "md",
    theme: V,
    disabled: J = !1,
    autowidth: H = !1,
    block: K = !1,
    tooltip: _,
    hotkey: h,
    className: ae = "",
    css: $,
    width: z,
    height: S,
    padding: L,
    margin: t,
    onChange: P,
    onClick: w,
    onFocus: F,
    onBlur: he
  }, le) => {
    const d = Ce(null), f = o !== void 0, [k, E] = q(l), [Z, p] = q(J), U = f ? o : k;
    be(() => {
      p(J);
    }, [J]), be(() => {
      if (!h || Z) return;
      const ee = (de) => {
        const me = h.toLowerCase().split("+"), Ne = me.includes("ctrl") || me.includes("control"), Ae = me.includes("shift"), Se = me.includes("alt"), _e = me[me.length - 1];
        Ne === (de.ctrlKey || de.metaKey) && Ae === de.shiftKey && Se === de.altKey && de.key.toLowerCase() === _e && (de.preventDefault(), ue());
      };
      return document.addEventListener("keydown", ee), () => document.removeEventListener("keydown", ee);
    }, [h, Z]);
    const ue = ve(() => {
      if (Z) return;
      const ee = !U;
      f || E(ee), P?.(ee);
    }, [Z, U, f, P]), G = (ee) => {
      ue(), w?.(ee);
    };
    We(le, () => ({
      getValue: () => U,
      setValue: (ee) => {
        f || E(ee), P?.(ee);
      },
      toggle: ue,
      focus: () => d.current?.focus(),
      blur: () => d.current?.blur(),
      enable: () => p(!1),
      disable: () => p(!0),
      isEnabled: () => !Z,
      getNode: () => d.current
    }), [U, f, Z, P, ue]);
    const Y = U ? x ?? y : A ?? y, ce = U ? T ?? O : v ?? O, ne = U ? j ?? D : te ?? D, ie = L ? typeof L == "number" ? `${L}px` : Array.isArray(L) ? `${L[0]}px ${L[1]}px ${L[2]}px ${L[3]}px` : L : void 0, M = t ? typeof t == "number" ? `${t}px` : Array.isArray(t) ? `${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px` : t : void 0, m = {
      ...$ && typeof $ == "object" && !Array.isArray($) ? $ : {},
      width: typeof z == "number" ? `${z}px` : z,
      height: typeof S == "number" ? `${S}px` : S,
      padding: ie,
      margin: M
    }, r = W === "icon" ? "icon" : W === "iconTop" ? "icon-top" : W === "image" ? "image" : W === "imageTop" ? "image-top" : "default", R = [
      "avakio-toggle-button",
      `avakio-toggle-button-${I}`,
      `avakio-toggle-button-type-${r}`,
      U && "avakio-toggle-button-pressed",
      Z && "avakio-toggle-button-disabled",
      K && "avakio-toggle-button-block",
      H && "avakio-toggle-button-autowidth",
      ae
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ e(
      "button",
      {
        ref: d,
        id: a,
        "data-testid": n,
        "data-admin-theme": V,
        name: i,
        type: "button",
        className: R,
        style: m,
        disabled: Z,
        title: _,
        "aria-pressed": U,
        onClick: G,
        onFocus: F,
        onBlur: he,
        children: /* @__PURE__ */ g("span", { className: "avakio-toggle-button-inner", children: [
          ne && /* @__PURE__ */ e(
            "img",
            {
              src: ne,
              alt: "",
              className: "avakio-toggle-button-image"
            }
          ),
          ce && /* @__PURE__ */ e("span", { className: "avakio-toggle-button-icon", children: ce }),
          Y && /* @__PURE__ */ e("span", { className: "avakio-toggle-button-label", children: Y }),
          h && /* @__PURE__ */ e("span", { className: "avakio-toggle-button-hotkey", children: h })
        ] })
      }
    );
  }
);
pn.displayName = "AvakioToggleButton";
const kn = He(
  (a, n) => {
    const {
      id: i,
      testId: o,
      items: l,
      multi: y = !1,
      type: x = "rows",
      theme: A = "material",
      showIcons: O = !0,
      collapseIcon: T,
      expandIcon: v,
      animate: D = !0,
      width: j,
      height: te,
      className: W = "",
      style: I,
      onExpand: V,
      onCollapse: J,
      onChange: H
    } = a, K = Nt(), _ = i || K, h = Ce(null), ae = Ce(/* @__PURE__ */ new Map()), $ = ve(() => {
      const d = [];
      if (l.forEach((f) => {
        !f.collapsed && f.headerVisible !== !1 && d.push(f.id);
      }), d.length === 0 && y === !1) {
        const f = l.find((k) => !k.disabled && k.headerVisible !== !1);
        f && d.push(f.id);
      }
      return d;
    }, [l, y]), [z, S] = q($), [L, t] = q(() => new Set(l.filter((d) => d.disabled).map((d) => d.id)));
    be(() => {
      S($()), t(new Set(l.filter((d) => d.disabled).map((d) => d.id)));
    }, [l, $]);
    const P = ve(
      (d) => {
        L.has(d) || S((f) => {
          const k = f.includes(d);
          let E;
          if (k) {
            if (y === !1) {
              const Z = l.find(
                (p) => p.id !== d && !L.has(p.id) && p.headerVisible !== !1
              );
              E = Z ? [Z.id] : f;
            } else if (y === "mixed") {
              if (f.length <= 1)
                return f;
              E = f.filter((Z) => Z !== d);
            } else
              E = f.filter((Z) => Z !== d);
            E !== f && J?.(d);
          } else
            y === !1 ? (f.forEach((Z) => {
              Z !== d && J?.(Z);
            }), E = [d]) : E = [...f, d], V?.(d);
          return E !== f && H?.(E), E;
        });
      },
      [y, l, L, V, J, H]
    ), w = ve(
      (d, f, k) => {
        const E = l.filter(
          (p) => !L.has(p.id) && p.headerVisible !== !1
        ), Z = E.findIndex((p) => p.id === f);
        switch (d.key) {
          case "Enter":
          case " ":
            d.preventDefault(), P(f);
            break;
          case "ArrowDown":
          case "ArrowRight":
            if (d.preventDefault(), Z < E.length - 1) {
              const p = E[Z + 1];
              h.current?.querySelector(
                `[data-item-id="${p.id}"] .avakio-accordion-header`
              )?.focus();
            }
            break;
          case "ArrowUp":
          case "ArrowLeft":
            if (d.preventDefault(), Z > 0) {
              const p = E[Z - 1];
              h.current?.querySelector(
                `[data-item-id="${p.id}"] .avakio-accordion-header`
              )?.focus();
            }
            break;
          case "Home":
            if (d.preventDefault(), E.length > 0) {
              const p = E[0];
              h.current?.querySelector(
                `[data-item-id="${p.id}"] .avakio-accordion-header`
              )?.focus();
            }
            break;
          case "End":
            if (d.preventDefault(), E.length > 0) {
              const p = E[E.length - 1];
              h.current?.querySelector(
                `[data-item-id="${p.id}"] .avakio-accordion-header`
              )?.focus();
            }
            break;
        }
      },
      [l, L, P]
    );
    We(n, () => ({
      getExpandedIds: () => z,
      expand: (d) => {
        !z.includes(d) && !L.has(d) && P(d);
      },
      collapse: (d) => {
        z.includes(d) && P(d);
      },
      toggle: (d) => {
        L.has(d) || P(d);
      },
      expandAll: () => {
        if (y === !0) {
          const d = l.filter((f) => !L.has(f.id) && f.headerVisible !== !1).map((f) => f.id);
          S(d), d.forEach((f) => {
            z.includes(f) || V?.(f);
          }), H?.(d);
        }
      },
      collapseAll: () => {
        if (y === !0)
          z.forEach((d) => J?.(d)), S([]), H?.([]);
        else if (y === "mixed") {
          const d = z[0];
          d && (z.slice(1).forEach((f) => J?.(f)), S([d]), H?.([d]));
        }
      },
      isExpanded: (d) => z.includes(d),
      isDisabled: (d) => L.has(d),
      enable: (d) => {
        t((f) => {
          const k = new Set(f);
          return k.delete(d), k;
        });
      },
      disable: (d) => {
        t((f) => new Set(f).add(d));
      }
    }), [z, L, l, y, P, V, J, H]);
    const F = (d) => O ? d ? v || /* @__PURE__ */ e(tt, { size: 18 }) : T || /* @__PURE__ */ e(Ge, { size: 18 }) : null, he = [
      "avakio-accordion",
      `avakio-accordion--${A}`,
      `avakio-accordion--${x}`,
      D && "avakio-accordion--animated",
      W
    ].filter(Boolean).join(" "), le = {
      width: typeof j == "number" ? `${j}px` : j,
      height: typeof te == "number" ? `${te}px` : te,
      ...I
    };
    return /* @__PURE__ */ e(
      "div",
      {
        ref: h,
        id: _,
        "data-testid": o,
        className: he,
        style: le,
        role: "presentation",
        children: l.map((d, f) => {
          const k = z.includes(d.id), E = L.has(d.id), Z = d.headerVisible !== !1, p = [
            "avakio-accordion-item",
            k && "avakio-accordion-item--expanded",
            E && "avakio-accordion-item--disabled",
            !Z && "avakio-accordion-item--no-header",
            d.css
          ].filter(Boolean).join(" "), U = `${_}-header-${d.id}`, ue = `${_}-panel-${d.id}`;
          return /* @__PURE__ */ g(
            "div",
            {
              className: p,
              "data-item-id": d.id,
              children: [
                Z && /* @__PURE__ */ g(
                  "div",
                  {
                    id: U,
                    className: "avakio-accordion-header",
                    role: "button",
                    tabIndex: E ? -1 : 0,
                    "aria-expanded": k,
                    "aria-controls": ue,
                    "aria-disabled": E,
                    onClick: () => P(d.id),
                    onKeyDown: (G) => w(G, d.id, f),
                    children: [
                      /* @__PURE__ */ e("span", { className: "avakio-accordion-toggle", children: F(k) }),
                      d.icon && /* @__PURE__ */ e("span", { className: "avakio-accordion-icon", children: d.icon }),
                      /* @__PURE__ */ e("span", { className: "avakio-accordion-header-text", children: d.header })
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  "div",
                  {
                    id: ue,
                    ref: (G) => {
                      G ? ae.current.set(d.id, G) : ae.current.delete(d.id);
                    },
                    className: "avakio-accordion-content",
                    role: "region",
                    "aria-labelledby": U,
                    "aria-hidden": !k,
                    style: {
                      maxHeight: k ? void 0 : 0,
                      overflow: k ? "visible" : "hidden"
                    },
                    children: /* @__PURE__ */ e("div", { className: "avakio-accordion-body", children: d.body })
                  }
                )
              ]
            },
            d.id
          );
        })
      }
    );
  }
);
kn.displayName = "AvakioAccordion";
const gn = [
  { value: 100, color: "#5be5d6" },
  { value: 80, color: "#fff07e" },
  { value: 60, color: "#fd8b8c" }
];
function ns({
  value: a,
  minRange: n = 0,
  maxRange: i = 100,
  marker: o = !1,
  markerColor: l,
  color: y = "var(--bg-primary)",
  bands: x = gn,
  label: A,
  placeholder: O,
  stroke: T = 8,
  scale: v,
  tickSize: D = 10,
  flowTime: j = 500,
  smoothFlow: te = !0,
  layout: W = "horizontal",
  labelWidth: I = 120,
  labelHeight: V = 40,
  showLabel: J = !0,
  showScale: H = !0,
  disabled: K = !1,
  id: _,
  testId: h,
  className: ae
}) {
  const [$, z] = q(n), S = Ce(null), L = Ce(n), t = Ie(() => Math.max(n, Math.min(i, a)), [a, n, i]);
  be(() => {
    if (!te || j === 0) {
      z(t);
      return;
    }
    const f = L.current, k = t, E = performance.now(), Z = (p) => {
      const U = p - E, ue = Math.min(U / j, 1), G = 1 - Math.pow(1 - ue, 3), Y = f + (k - f) * G;
      z(Y), ue < 1 ? S.current = requestAnimationFrame(Z) : L.current = k;
    };
    return S.current && cancelAnimationFrame(S.current), S.current = requestAnimationFrame(Z), () => {
      S.current && cancelAnimationFrame(S.current);
    };
  }, [t, j, te]);
  const P = (f) => {
    const k = i - n;
    return k === 0 ? 0 : (f - n) / k * 100;
  }, w = Ie(() => typeof y == "function" ? y(t) : y, [y, t]), F = Ie(() => {
    if (!H || !v) return [];
    const f = v.step || 10, k = [];
    for (let E = n; E <= i; E += f) {
      let Z = String(E);
      v.template && (typeof v.template == "function" ? Z = v.template(E) : Z = v.template.replace("#value#", String(E))), k.push({
        value: E,
        label: Z,
        position: P(E)
      });
    }
    return k;
  }, [H, v, n, i]), he = Ie(() => [...x].sort((f, k) => k.value - f.value), [x]), le = Ie(() => O ? O.replace("#value#", String(Math.round(t))) : null, [O, t]), d = W === "vertical";
  return /* @__PURE__ */ g(
    "div",
    {
      id: _,
      "data-testid": h,
      className: Ye(
        "avakio-bullet-graph",
        d && "avakio-bullet-graph-vertical",
        K && "avakio-bullet-graph-disabled",
        ae
      ),
      style: {
        "--bg-label-width": `${I}px`,
        "--bg-label-height": `${V}px`
      },
      children: [
        J && A && /* @__PURE__ */ g("div", { className: "avakio-bullet-graph-label", children: [
          /* @__PURE__ */ e("span", { className: "avakio-bullet-graph-label-text", children: A }),
          le && /* @__PURE__ */ e("span", { className: "avakio-bullet-graph-placeholder", children: le })
        ] }),
        /* @__PURE__ */ g("div", { className: "avakio-bullet-graph-container", children: [
          /* @__PURE__ */ g("div", { className: "avakio-bullet-graph-track", children: [
            he.map((f, k) => /* @__PURE__ */ e(
              "div",
              {
                className: "avakio-bullet-graph-band",
                style: {
                  [d ? "height" : "width"]: `${P(f.value)}%`,
                  backgroundColor: f.color
                }
              },
              k
            )),
            /* @__PURE__ */ e(
              "div",
              {
                className: "avakio-bullet-graph-bar",
                style: {
                  [d ? "height" : "width"]: `${P($)}%`,
                  [d ? "width" : "height"]: `${T}px`,
                  backgroundColor: w,
                  transition: te ? `all ${j}ms ease-out` : "none"
                }
              }
            ),
            o !== !1 && /* @__PURE__ */ e(
              "div",
              {
                className: "avakio-bullet-graph-marker",
                style: {
                  [d ? "bottom" : "left"]: `${P(o)}%`,
                  backgroundColor: l || "var(--bg-marker)"
                }
              }
            )
          ] }),
          H && F.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-bullet-graph-scale", children: F.map((f, k) => /* @__PURE__ */ g(
            "div",
            {
              className: "avakio-bullet-graph-tick",
              style: {
                [d ? "bottom" : "left"]: `${f.position}%`
              },
              children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: "avakio-bullet-graph-tick-line",
                    style: {
                      [d ? "width" : "height"]: `${D}px`
                    }
                  }
                ),
                /* @__PURE__ */ e("span", { className: "avakio-bullet-graph-tick-label", children: f.label })
              ]
            },
            k
          )) })
        ] })
      ]
    }
  );
}
const bn = He(
  ({
    id: a,
    testId: n,
    slides: i,
    theme: o = "material",
    navigation: l = { type: "bottom", items: !0, buttons: !0, position: "center" },
    autoplay: y = !1,
    autoplayDelay: x = 3e3,
    scrollSpeed: A = 300,
    loop: O = !0,
    activeIndex: T = 0,
    width: v,
    height: D = 400,
    css: j,
    onShow: te,
    onSlideChange: W
  }, I) => {
    const [V, J] = q(T), [H, K] = q(i), [_, h] = q(!1), [ae, $] = q(null), [z, S] = q(null), L = Ce(null), t = Ce(null), P = 50;
    be(() => {
      K(i);
    }, [i]);
    const w = ve(
      (ie, M = !1) => {
        if (_ && !M) return;
        const m = Math.max(0, Math.min(ie, H.length - 1));
        M || (h(!0), setTimeout(() => h(!1), A)), J(m);
        const r = H[m];
        r && (te?.(r.id, m), W?.(r.id, m));
      },
      [_, H, A, te, W]
    ), F = ve(() => {
      V < H.length - 1 ? w(V + 1) : O && w(0);
    }, [V, H.length, O, w]), he = ve(() => {
      V > 0 ? w(V - 1) : O && w(H.length - 1);
    }, [V, H.length, O, w]), le = ve(
      (ie) => {
        const M = H.findIndex((m) => m.id === ie);
        M !== -1 && w(M);
      },
      [H, w]
    ), d = ve(
      (ie) => {
        w(ie);
      },
      [w]
    ), f = ve(() => H[V]?.id || "", [H, V]), k = ve(() => V, [V]), E = ve((ie, M) => {
      K((m) => M !== void 0 && M >= 0 && M <= m.length ? [...m.slice(0, M), ie, ...m.slice(M)] : [...m, ie]);
    }, []), Z = ve((ie) => {
      K((M) => {
        const m = M.filter((r) => r.id !== ie);
        return V >= m.length && m.length > 0 && J(m.length - 1), m;
      });
    }, [V]);
    We(I, () => ({
      showNext: F,
      showPrev: he,
      setActive: le,
      setActiveIndex: d,
      getActiveId: f,
      getActiveIndex: k,
      addView: E,
      removeView: Z
    })), be(() => {
      if (y && H.length > 1)
        return t.current = setInterval(() => {
          F();
        }, x), () => {
          t.current && clearInterval(t.current);
        };
    }, [y, x, F, H.length]);
    const p = (ie) => {
      S(null), $(ie.targetTouches[0].clientX);
    }, U = (ie) => {
      S(ie.targetTouches[0].clientX);
    }, ue = () => {
      if (!ae || !z) return;
      const ie = ae - z, M = ie > P, m = ie < -P;
      M && F(), m && he();
    };
    be(() => {
      const ie = (M) => {
        M.key === "ArrowLeft" ? he() : M.key === "ArrowRight" && F();
      };
      return window.addEventListener("keydown", ie), () => window.removeEventListener("keydown", ie);
    }, [F, he]);
    const G = {
      width: typeof v == "number" ? `${v}px` : v,
      height: typeof D == "number" ? `${D}px` : D,
      ...j && typeof j == "object" && !Array.isArray(j) ? j : {}
    }, Y = l.type === "side", ce = l.buttons !== !1, ne = l.items !== !1;
    return /* @__PURE__ */ g(
      "div",
      {
        ref: L,
        id: a,
        "data-testid": n,
        className: `avakio-carousel avakio-carousel-theme-${o}`,
        style: G,
        onTouchStart: p,
        onTouchMove: U,
        onTouchEnd: ue,
        children: [
          Y && ce && /* @__PURE__ */ e(
            "button",
            {
              className: "avakio-carousel-nav-button avakio-carousel-nav-prev",
              onClick: he,
              disabled: !O && V === 0,
              "aria-label": "Previous slide",
              children: /* @__PURE__ */ e(Ze, { size: 24 })
            }
          ),
          /* @__PURE__ */ e("div", { className: "avakio-carousel-viewport", children: /* @__PURE__ */ e(
            "div",
            {
              className: "avakio-carousel-track",
              style: {
                transform: `translateX(-${V * 100}%)`,
                transition: _ ? `transform ${A}ms ease-in-out` : "none"
              },
              children: H.map((ie) => /* @__PURE__ */ e("div", { className: "avakio-carousel-slide", children: ie.content }, ie.id))
            }
          ) }),
          Y && ce && /* @__PURE__ */ e(
            "button",
            {
              className: "avakio-carousel-nav-button avakio-carousel-nav-next",
              onClick: F,
              disabled: !O && V === H.length - 1,
              "aria-label": "Next slide",
              children: /* @__PURE__ */ e(Ge, { size: 24 })
            }
          ),
          !Y && (ce || ne) && /* @__PURE__ */ g("div", { className: `avakio-carousel-nav-bottom avakio-carousel-nav-${l.position || "center"}`, children: [
            ce && /* @__PURE__ */ g("div", { className: "avakio-carousel-nav-buttons", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  className: "avakio-carousel-nav-button",
                  onClick: he,
                  disabled: !O && V === 0,
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ e(Ze, { size: 20 })
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "avakio-carousel-nav-button",
                  onClick: F,
                  disabled: !O && V === H.length - 1,
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ e(Ge, { size: 20 })
                }
              )
            ] }),
            ne && /* @__PURE__ */ e("div", { className: "avakio-carousel-indicators", children: H.map((ie, M) => /* @__PURE__ */ e(
              "button",
              {
                className: `avakio-carousel-indicator ${M === V ? "avakio-carousel-indicator-active" : ""}`,
                onClick: () => w(M),
                "aria-label": `Go to slide ${M + 1}`
              },
              ie.id
            )) })
          ] })
        ]
      }
    );
  }
);
bn.displayName = "AvakioCarousel";
const yn = [
  "#4285F4",
  // Blue
  "#EA4335",
  // Red
  "#FBBC05",
  // Yellow
  "#34A853",
  // Green
  "#8E24AA",
  // Purple
  "#00ACC1",
  // Cyan
  "#FF7043",
  // Orange
  "#5C6BC0",
  // Indigo
  "#26A69A",
  // Teal
  "#D81B60"
  // Pink
];
function xn(a, n) {
  const i = Math.min(...a), o = Math.max(...a), l = o - i || 1, y = Math.pow(10, Math.floor(Math.log10(l))), x = l / y;
  let A;
  x <= 1.5 ? A = y * 0.2 : x <= 3 ? A = y * 0.5 : x <= 7 ? A = y : A = y * 2, n && (A = n);
  const O = Math.floor(i / A) * A, T = Math.ceil(o / A) * A, v = [];
  for (let D = O; D <= T; D += A)
    v.push(Math.round(D * 1e3) / 1e3);
  return { min: O, max: T, step: A, ticks: v };
}
function wn(a) {
  if (a.length < 2) return "";
  if (a.length === 2)
    return `M ${a[0].x} ${a[0].y} L ${a[1].x} ${a[1].y}`;
  const n = 0.3;
  let i = `M ${a[0].x} ${a[0].y}`;
  for (let o = 0; o < a.length - 1; o++) {
    const l = a[Math.max(0, o - 1)], y = a[o], x = a[o + 1], A = a[Math.min(a.length - 1, o + 2)], O = y.x + (x.x - l.x) * n, T = y.y + (x.y - l.y) * n, v = x.x - (A.x - y.x) * n, D = x.y - (A.y - y.y) * n;
    i += ` C ${O} ${T}, ${v} ${D}, ${x.x} ${x.y}`;
  }
  return i;
}
function Nn(a, n, i, o, l, y) {
  const x = {
    x: a + i * Math.cos((l - 90) * Math.PI / 180),
    y: n + i * Math.sin((l - 90) * Math.PI / 180)
  }, A = {
    x: a + i * Math.cos((y - 90) * Math.PI / 180),
    y: n + i * Math.sin((y - 90) * Math.PI / 180)
  }, O = {
    x: a + o * Math.cos((y - 90) * Math.PI / 180),
    y: n + o * Math.sin((y - 90) * Math.PI / 180)
  }, T = {
    x: a + o * Math.cos((l - 90) * Math.PI / 180),
    y: n + o * Math.sin((l - 90) * Math.PI / 180)
  }, v = y - l <= 180 ? 0 : 1;
  return o === 0 ? `M ${a} ${n} L ${x.x} ${x.y} A ${i} ${i} 0 ${v} 1 ${A.x} ${A.y} Z` : `M ${x.x} ${x.y} A ${i} ${i} 0 ${v} 1 ${A.x} ${A.y} L ${O.x} ${O.y} A ${o} ${o} 0 ${v} 0 ${T.x} ${T.y} Z`;
}
const $n = He((a, n) => {
  const {
    id: i,
    testId: o,
    type: l = "line",
    series: y,
    xAxis: x = {},
    yAxis: A = {},
    legend: O = { show: !0, position: "bottom", toggle: !0 },
    tooltip: T = { show: !0 },
    title: v,
    subtitle: D,
    colors: j = yn,
    theme: te = "material",
    width: W = "100%",
    height: I = 400,
    padding: V = { top: 40, right: 40, bottom: 60, left: 60 },
    animate: J = !0,
    animateDuration: H = 500,
    gradient: K = !1,
    barWidth: _ = 24,
    barOffset: h = 8,
    borderRadius: ae = 4,
    donutInnerRadius: $ = 0.5,
    pieStartAngle: z = 0,
    pieLabels: S = !0,
    donutInnerText: L,
    stacked: t = !1,
    className: P,
    style: w,
    onClick: F,
    onHover: he,
    onLegendClick: le
  } = a, d = Ce(null), f = Ce(null), [k, E] = q({ width: 0, height: 0 }), [Z, p] = q(/* @__PURE__ */ new Set()), [U, ue] = q(null), [G, Y] = q(null), [ce, ne] = q(J ? 0 : 1);
  be(() => {
    const s = d.current;
    if (!s) return;
    const C = new ResizeObserver((c) => {
      const X = c[0];
      X && E({
        width: Math.max(0, X.contentRect.width),
        height: Math.max(0, typeof I == "number" ? I : X.contentRect.height)
      });
    });
    return C.observe(s), () => C.disconnect();
  }, [I]), be(() => {
    if (!J) {
      ne(1);
      return;
    }
    ne(0);
    const s = performance.now(), C = (c) => {
      const X = c - s, b = Math.min(X / H, 1);
      ne(ie(b)), b < 1 && requestAnimationFrame(C);
    };
    requestAnimationFrame(C);
  }, [J, H, y]);
  const ie = (s) => 1 - Math.pow(1 - s, 3), M = Ie(() => {
    const s = {
      top: V.top ?? 40,
      right: V.right ?? 40,
      bottom: V.bottom ?? 60,
      left: V.left ?? 60
    };
    if (O.show)
      switch (O.position) {
        case "top":
          s.top += 30;
          break;
        case "bottom":
          s.bottom += 30;
          break;
        case "left":
          s.left += 100;
          break;
        case "right":
          s.right += 100;
          break;
      }
    return v && (s.top += 24, D && (s.top += 16)), {
      x: s.left,
      y: s.top,
      width: Math.max(0, k.width - s.left - s.right),
      height: Math.max(0, k.height - s.top - s.bottom)
    };
  }, [k, V, O, v, D]), m = Ie(() => y.filter((s) => {
    const C = s.id || s.name;
    return !Z.has(C);
  }), [y, Z]), r = Ie(() => {
    if (l === "pie" || l === "pie3D" || l === "donut" || l === "radar")
      return { xScale: null, yScale: null };
    const c = [], X = [];
    m.forEach((ye) => {
      ye.data.forEach((B) => {
        B.x !== void 0 && c.push(B.x), X.push(B.y);
      });
    });
    const b = Array.from(new Set(c)), Q = b.every((ye) => typeof ye == "number"), re = xn(
      t ? R(m) : X,
      A.step
    );
    return A.min !== void 0 && (re.min = A.min), A.max !== void 0 && (re.max = A.max), {
      xValues: b,
      isXNumeric: Q,
      yBounds: re,
      xScale: (ye) => {
        if (Q) {
          const pe = ye, $e = Math.min(...b), De = Math.max(...b);
          return M.x + (pe - $e) / (De - $e || 1) * M.width;
        }
        const B = b.indexOf(ye);
        return M.x + (B + 0.5) * (M.width / b.length);
      },
      yScale: (ye) => {
        const B = re.max - re.min || 1;
        return M.y + M.height - (ye - re.min) / B * M.height;
      }
    };
  }, [m, M, l, x, A, t]);
  function R(s) {
    const C = [];
    if (s.length === 0) return [0];
    const c = s[0].data.length;
    for (let X = 0; X < c; X++) {
      let b = 0;
      s.forEach((Q) => {
        Q.data[X] && (b += Q.data[X].y);
      }), C.push(b);
    }
    return C;
  }
  const ee = (s) => {
    if (!O.toggle) return;
    const C = s.id || s.name, c = new Set(Z);
    c.has(C) ? c.delete(C) : c.add(C), p(c), le?.(s, !c.has(C));
  }, de = (s, C, c, X) => {
    if (C && s && c !== null) {
      const b = s.id || s.name;
      if (ue({ seriesId: b, index: c }), T.show) {
        const Q = T.format ? T.format(C, s) : `${s.name}: ${C.y}`, re = d.current?.getBoundingClientRect();
        re && Y({
          x: X.clientX - re.left,
          y: X.clientY - re.top,
          content: Q
        });
      }
      he?.(C, s, c);
    } else
      ue(null), Y(null), he?.(null, null, null);
  }, me = (s, C, c) => {
    F?.(C, s, c);
  };
  We(n, () => ({
    getNode: () => d.current,
    showSeries: (s) => {
      p((C) => {
        const c = new Set(C);
        return c.delete(s), c;
      });
    },
    hideSeries: (s) => {
      p((C) => new Set(C).add(s));
    },
    toggleSeries: (s) => {
      p((C) => {
        const c = new Set(C);
        return c.has(s) ? c.delete(s) : c.add(s), c;
      });
    },
    getVisibleSeries: () => y.filter((s) => !Z.has(s.id || s.name)).map((s) => s.id || s.name),
    exportImage: async (s = "png") => {
      if (!f.current) return "";
      const C = new XMLSerializer().serializeToString(f.current), c = document.createElement("canvas");
      c.width = k.width, c.height = k.height;
      const X = c.getContext("2d");
      return new Promise((b) => {
        const Q = new Image();
        Q.onload = () => {
          X?.drawImage(Q, 0, 0), b(c.toDataURL(`image/${s}`));
        }, Q.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(C)));
      });
    },
    refresh: () => {
      ne(0), setTimeout(() => ne(1), 10);
    }
  }), [y, Z, k]);
  const Ne = () => v ? /* @__PURE__ */ g("g", { className: "avakio-chart__title", children: [
    /* @__PURE__ */ e(
      "text",
      {
        x: k.width / 2,
        y: 24,
        textAnchor: "middle",
        className: "avakio-chart__title-text",
        children: v
      }
    ),
    D && /* @__PURE__ */ e(
      "text",
      {
        x: k.width / 2,
        y: 44,
        textAnchor: "middle",
        className: "avakio-chart__subtitle-text",
        children: D
      }
    )
  ] }) : null, Ae = () => {
    if (l === "pie" || l === "pie3D" || l === "donut" || l === "radar" || !r.xValues || !r.yBounds) return null;
    const s = M.y + M.height, C = M.x;
    return /* @__PURE__ */ g("g", { className: "avakio-chart__axes", children: [
      x.showLine !== !1 && /* @__PURE__ */ e(
        "line",
        {
          x1: M.x,
          y1: s,
          x2: M.x + M.width,
          y2: s,
          className: "avakio-chart__axis-line"
        }
      ),
      r.xValues.map((c, X) => {
        const b = r.xScale(c);
        return /* @__PURE__ */ g("g", { children: [
          x.showTicks !== !1 && /* @__PURE__ */ e(
            "line",
            {
              x1: b,
              y1: s,
              x2: b,
              y2: s + 6,
              className: "avakio-chart__tick"
            }
          ),
          /* @__PURE__ */ e(
            "text",
            {
              x: b,
              y: s + 20,
              textAnchor: "middle",
              className: "avakio-chart__axis-label",
              transform: x.labelRotation ? `rotate(${x.labelRotation}, ${b}, ${s + 20})` : void 0,
              children: x.format ? x.format(c) : String(c)
            }
          )
        ] }, `x-${X}`);
      }),
      x.title && /* @__PURE__ */ e(
        "text",
        {
          x: M.x + M.width / 2,
          y: s + 45,
          textAnchor: "middle",
          className: "avakio-chart__axis-title",
          children: x.title
        }
      ),
      A.showLine !== !1 && /* @__PURE__ */ e(
        "line",
        {
          x1: C,
          y1: M.y,
          x2: C,
          y2: M.y + M.height,
          className: "avakio-chart__axis-line"
        }
      ),
      r.yBounds.ticks.map((c, X) => {
        const b = r.yScale(c);
        return /* @__PURE__ */ g("g", { children: [
          A.showGrid !== !1 && /* @__PURE__ */ e(
            "line",
            {
              x1: M.x,
              y1: b,
              x2: M.x + M.width,
              y2: b,
              className: "avakio-chart__grid-line"
            }
          ),
          A.showTicks !== !1 && /* @__PURE__ */ e(
            "line",
            {
              x1: C - 6,
              y1: b,
              x2: C,
              y2: b,
              className: "avakio-chart__tick"
            }
          ),
          /* @__PURE__ */ e(
            "text",
            {
              x: C - 12,
              y: b + 4,
              textAnchor: "end",
              className: "avakio-chart__axis-label",
              children: A.format ? A.format(c) : String(c)
            }
          )
        ] }, `y-${X}`);
      }),
      A.title && /* @__PURE__ */ e(
        "text",
        {
          x: 20,
          y: M.y + M.height / 2,
          textAnchor: "middle",
          className: "avakio-chart__axis-title",
          transform: `rotate(-90, 20, ${M.y + M.height / 2})`,
          children: A.title
        }
      )
    ] });
  }, Se = (s = !1, C = !1) => !r.xScale || !r.yScale ? null : /* @__PURE__ */ e("g", { className: "avakio-chart__series", children: m.map((c, X) => {
    const b = c.id || c.name, Q = c.color || j[X % j.length], re = c.data.map((pe) => ({
      x: r.xScale(pe.x ?? X),
      y: r.yScale(pe.y * ce)
    })), ye = s ? wn(re) : `M ${re.map((pe) => `${pe.x} ${pe.y}`).join(" L ")}`, B = C ? `${ye} L ${re[re.length - 1]?.x ?? 0} ${M.y + M.height} L ${re[0]?.x ?? 0} ${M.y + M.height} Z` : "";
    return /* @__PURE__ */ g("g", { className: "avakio-chart__series-group", children: [
      K && C && /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ g("linearGradient", { id: `gradient-${b}`, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        /* @__PURE__ */ e("stop", { offset: "0%", stopColor: Q, stopOpacity: "0.6" }),
        /* @__PURE__ */ e("stop", { offset: "100%", stopColor: Q, stopOpacity: "0.05" })
      ] }) }),
      C && /* @__PURE__ */ e(
        "path",
        {
          d: B,
          fill: K ? `url(#gradient-${b})` : Q,
          fillOpacity: K ? 1 : c.fillOpacity ?? 0.2,
          className: "avakio-chart__area"
        }
      ),
      /* @__PURE__ */ e(
        "path",
        {
          d: ye,
          stroke: Q,
          strokeWidth: c.lineWidth ?? 2,
          fill: "none",
          className: "avakio-chart__line"
        }
      ),
      c.showMarkers !== !1 && re.map((pe, $e) => /* @__PURE__ */ e(
        "circle",
        {
          cx: pe.x,
          cy: pe.y,
          r: U?.seriesId === b && U?.index === $e ? (c.markerSize ?? 4) + 2 : c.markerSize ?? 4,
          fill: Q,
          stroke: "#fff",
          strokeWidth: 2,
          className: "avakio-chart__marker",
          onMouseEnter: (De) => de(c, c.data[$e], $e, De),
          onMouseLeave: () => de(null, null, null, {}),
          onClick: () => me(c, c.data[$e], $e),
          style: { cursor: F ? "pointer" : "default" }
        },
        $e
      )),
      c.showLabels && re.map((pe, $e) => /* @__PURE__ */ e(
        "text",
        {
          x: pe.x,
          y: pe.y - 10,
          textAnchor: "middle",
          className: "avakio-chart__data-label",
          children: c.data[$e].y
        },
        `label-${$e}`
      ))
    ] }, b);
  }) }), _e = (s = !1) => {
    if (!r.xScale || !r.yScale || !r.xValues) return null;
    const C = m.length, c = M.width / Math.max(1, r.xValues.length), X = Math.max(1, Math.min(_, (c - h * 2) / Math.max(1, C))), b = X * C, Q = Math.max(0, (c - b) / 2);
    return /* @__PURE__ */ e("g", { className: "avakio-chart__series", children: r.xValues.map((re, ye) => {
      const B = M.x + ye * c;
      let pe = M.y + M.height;
      return /* @__PURE__ */ e("g", { className: "avakio-chart__bar-group", children: m.map(($e, De) => {
        const Ee = $e.id || $e.name, Re = $e.color || j[De % j.length], Te = $e.data.find((ze) => ze.x === re) || $e.data[ye];
        if (!Te) return null;
        const je = Te.y * ce, Ue = Math.max(1, r.yBounds.max - r.yBounds.min), fe = Math.max(0, je / Ue * M.height);
        let ge, we, Me, Le;
        t ? (ge = B + Q, Le = fe, we = pe - Le, Me = Math.max(1, b), pe = we) : (ge = B + Q + De * X, we = r.yScale(je), Me = Math.max(1, X - 2), Le = Math.max(0, M.y + M.height - we));
        const Oe = U?.seriesId === Ee && U?.index === ye;
        return /* @__PURE__ */ g("g", { children: [
          K && /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ g("linearGradient", { id: `bar-gradient-${Ee}-${ye}`, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ e("stop", { offset: "0%", stopColor: Re, stopOpacity: "1" }),
            /* @__PURE__ */ e("stop", { offset: "100%", stopColor: Re, stopOpacity: "0.7" })
          ] }) }),
          /* @__PURE__ */ e(
            "rect",
            {
              x: ge,
              y: we,
              width: Me,
              height: Math.max(0, Le),
              rx: ae,
              fill: K ? `url(#bar-gradient-${Ee}-${ye})` : Re,
              className: `avakio-chart__bar ${Oe ? "avakio-chart__bar--hovered" : ""}`,
              onMouseEnter: (ze) => de($e, Te, ye, ze),
              onMouseLeave: () => de(null, null, null, {}),
              onClick: () => me($e, Te, ye),
              style: { cursor: F ? "pointer" : "default" }
            }
          ),
          $e.showLabels && /* @__PURE__ */ e(
            "text",
            {
              x: ge + Me / 2,
              y: we - 5,
              textAnchor: "middle",
              className: "avakio-chart__data-label",
              children: Te.y
            }
          )
        ] }, Ee);
      }) }, `group-${ye}`);
    }) });
  }, Ve = (s = !1) => {
    const C = m[0];
    if (!C) return null;
    const c = M.x + M.width / 2, X = M.y + M.height / 2, b = Math.min(M.width, M.height) / 2 - 20, Q = s ? b * $ : 0, re = C.data.reduce((B, pe) => B + pe.y, 0);
    let ye = z;
    return /* @__PURE__ */ g("g", { className: "avakio-chart__pie", children: [
      C.data.map((B, pe) => {
        const $e = B.y / re * 360 * ce, De = ye, Ee = ye + $e;
        ye = Ee;
        const Re = B.color || j[pe % j.length], Te = (De + Ee) / 2, je = U?.seriesId === (C.id || C.name) && U?.index === pe, Ue = b + 25, fe = c + Ue * Math.cos((Te - 90) * Math.PI / 180), ge = X + Ue * Math.sin((Te - 90) * Math.PI / 180), we = je ? 8 : 0, Me = we * Math.cos((Te - 90) * Math.PI / 180), Le = we * Math.sin((Te - 90) * Math.PI / 180);
        return /* @__PURE__ */ g("g", { transform: `translate(${Me}, ${Le})`, children: [
          K && /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ g("radialGradient", { id: `pie-gradient-${pe}`, cx: "30%", cy: "30%", children: [
            /* @__PURE__ */ e("stop", { offset: "0%", stopColor: Re, stopOpacity: "1" }),
            /* @__PURE__ */ e("stop", { offset: "100%", stopColor: Re, stopOpacity: "0.8" })
          ] }) }),
          /* @__PURE__ */ e(
            "path",
            {
              d: Nn(c, X, b, Q, De, Ee),
              fill: K ? `url(#pie-gradient-${pe})` : Re,
              stroke: "#fff",
              strokeWidth: 2,
              className: `avakio-chart__pie-slice ${je ? "avakio-chart__pie-slice--hovered" : ""}`,
              onMouseEnter: (Oe) => de(C, B, pe, Oe),
              onMouseLeave: () => de(null, null, null, {}),
              onClick: () => me(C, B, pe),
              style: { cursor: F ? "pointer" : "default" }
            }
          ),
          S && $e > 15 && /* @__PURE__ */ g(
            "text",
            {
              x: fe,
              y: ge,
              textAnchor: fe > c ? "start" : "end",
              className: "avakio-chart__pie-label",
              children: [
                B.label || B.x || "",
                " (",
                (B.y / re * 100).toFixed(1),
                "%)"
              ]
            }
          )
        ] }, pe);
      }),
      s && L && /* @__PURE__ */ e(
        "text",
        {
          x: c,
          y: X,
          textAnchor: "middle",
          dominantBaseline: "middle",
          className: "avakio-chart__donut-text",
          children: L
        }
      )
    ] });
  }, N = () => !r.xScale || !r.yScale ? null : /* @__PURE__ */ e("g", { className: "avakio-chart__series", children: m.map((s, C) => {
    const c = s.id || s.name, X = s.color || j[C % j.length];
    return /* @__PURE__ */ e("g", { className: "avakio-chart__scatter-group", children: s.data.map((b, Q) => {
      const re = r.xScale(b.x ?? Q), ye = r.yScale(b.y * ce), B = U?.seriesId === c && U?.index === Q;
      return /* @__PURE__ */ e(
        "circle",
        {
          cx: re,
          cy: ye,
          r: B ? (s.markerSize ?? 6) + 2 : s.markerSize ?? 6,
          fill: b.color || X,
          fillOpacity: 0.7,
          stroke: b.color || X,
          strokeWidth: 2,
          className: "avakio-chart__scatter-point",
          onMouseEnter: (pe) => de(s, b, Q, pe),
          onMouseLeave: () => de(null, null, null, {}),
          onClick: () => me(s, b, Q),
          style: { cursor: F ? "pointer" : "default" }
        },
        Q
      );
    }) }, c);
  }) }), se = () => {
    if (m.length === 0) return null;
    const s = m[0].data.map((B) => String(B.label || B.x || "")), C = s.length, c = Math.PI * 2 / C, X = M.x + M.width / 2, b = M.y + M.height / 2, Q = Math.min(M.width, M.height) / 2 - 40, re = Math.max(...m.flatMap((B) => B.data.map((pe) => pe.y))), ye = 5;
    return /* @__PURE__ */ g("g", { className: "avakio-chart__radar", children: [
      Array.from({ length: ye }).map((B, pe) => {
        const $e = Q * (pe + 1) / ye, De = Array.from({ length: C }).map((Ee, Re) => {
          const Te = Re * c - Math.PI / 2;
          return {
            x: X + $e * Math.cos(Te),
            y: b + $e * Math.sin(Te)
          };
        });
        return /* @__PURE__ */ e(
          "polygon",
          {
            points: De.map((Ee) => `${Ee.x},${Ee.y}`).join(" "),
            fill: "none",
            stroke: "currentColor",
            strokeOpacity: 0.2,
            className: "avakio-chart__radar-level"
          },
          pe
        );
      }),
      s.map((B, pe) => {
        const $e = pe * c - Math.PI / 2, De = X + Q * Math.cos($e), Ee = b + Q * Math.sin($e);
        return /* @__PURE__ */ e(
          "line",
          {
            x1: X,
            y1: b,
            x2: De,
            y2: Ee,
            stroke: "currentColor",
            strokeOpacity: 0.2,
            className: "avakio-chart__radar-axis"
          },
          pe
        );
      }),
      s.map((B, pe) => {
        const $e = pe * c - Math.PI / 2, De = X + (Q + 20) * Math.cos($e), Ee = b + (Q + 20) * Math.sin($e);
        return /* @__PURE__ */ e(
          "text",
          {
            x: De,
            y: Ee,
            textAnchor: "middle",
            dominantBaseline: "middle",
            className: "avakio-chart__radar-label",
            children: B
          },
          pe
        );
      }),
      m.map((B, pe) => {
        const $e = B.id || B.name, De = B.color || j[pe % j.length], Ee = B.data.map((Re, Te) => {
          const je = Te * c - Math.PI / 2, Ue = Re.y / re * Q * ce;
          return {
            x: X + Ue * Math.cos(je),
            y: b + Ue * Math.sin(je)
          };
        });
        return /* @__PURE__ */ g("g", { children: [
          /* @__PURE__ */ e(
            "polygon",
            {
              points: Ee.map((Re) => `${Re.x},${Re.y}`).join(" "),
              fill: De,
              fillOpacity: 0.2,
              stroke: De,
              strokeWidth: 2,
              className: "avakio-chart__radar-polygon"
            }
          ),
          Ee.map((Re, Te) => /* @__PURE__ */ e(
            "circle",
            {
              cx: Re.x,
              cy: Re.y,
              r: B.markerSize ?? 4,
              fill: De,
              stroke: "#fff",
              strokeWidth: 2,
              className: "avakio-chart__radar-point",
              onMouseEnter: (je) => de(B, B.data[Te], Te, je),
              onMouseLeave: () => de(null, null, null, {}),
              onClick: () => me(B, B.data[Te], Te),
              style: { cursor: F ? "pointer" : "default" }
            },
            Te
          ))
        ] }, $e);
      })
    ] });
  }, ke = () => {
    if (!O.show) return null;
    const s = O.position === "left" || O.position === "right";
    let C, c;
    switch (O.position) {
      case "top":
        C = k.width / 2, c = v ? 60 : 20;
        break;
      case "bottom":
        C = k.width / 2, c = k.height - 15;
        break;
      case "left":
        C = 20, c = M.y + 20;
        break;
      case "right":
        C = k.width - 100, c = M.y + 20;
        break;
      default:
        C = k.width / 2, c = k.height - 15;
    }
    return /* @__PURE__ */ e(
      "g",
      {
        className: "avakio-chart__legend",
        transform: `translate(${C}, ${c})`,
        children: y.map((X, b) => {
          const Q = X.id || X.name, re = X.color || j[b % j.length], ye = Z.has(Q), B = s ? 0 : (b - y.length / 2) * 100, pe = s ? b * 24 : 0;
          return /* @__PURE__ */ g(
            "g",
            {
              className: `avakio-chart__legend-item ${ye ? "avakio-chart__legend-item--hidden" : ""}`,
              transform: `translate(${B}, ${pe})`,
              onClick: () => ee(X),
              style: { cursor: O.toggle ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ e(
                  "rect",
                  {
                    x: 0,
                    y: -8,
                    width: 12,
                    height: 12,
                    rx: 2,
                    fill: ye ? "transparent" : re,
                    stroke: re,
                    strokeWidth: 2
                  }
                ),
                /* @__PURE__ */ e(
                  "text",
                  {
                    x: 18,
                    y: 0,
                    dominantBaseline: "middle",
                    className: "avakio-chart__legend-text",
                    style: { opacity: ye ? 0.5 : 1 },
                    children: X.name
                  }
                )
              ]
            },
            Q
          );
        })
      }
    );
  }, xe = () => G ? /* @__PURE__ */ e(
    "div",
    {
      className: "avakio-chart__tooltip",
      style: {
        left: G.x + 10,
        top: G.y - 10
      },
      children: G.content
    }
  ) : null, u = () => {
    switch (l) {
      case "line":
        return Se(!1, !1);
      case "spline":
        return Se(!0, !1);
      case "area":
        return Se(!1, !0);
      case "splineArea":
        return Se(!0, !0);
      case "bar":
      case "stackedBar":
        return _e(!1);
      case "barH":
      case "stackedBarH":
        return _e(!0);
      case "pie":
      case "pie3D":
        return Ve(!1);
      case "donut":
        return Ve(!0);
      case "scatter":
        return N();
      case "radar":
        return se();
      default:
        return Se(!1, !1);
    }
  }, oe = {
    width: W,
    height: I,
    ...w
  };
  return /* @__PURE__ */ g(
    "div",
    {
      ref: d,
      id: i,
      "data-testid": o,
      className: `avakio-chart avakio-chart--${te} avakio-chart--${l} ${P || ""}`,
      style: oe,
      children: [
        /* @__PURE__ */ g(
          "svg",
          {
            ref: f,
            width: k.width,
            height: k.height,
            className: "avakio-chart__svg",
            children: [
              Ne(),
              Ae(),
              u(),
              ke()
            ]
          }
        ),
        xe()
      ]
    }
  );
});
$n.displayName = "AvakioChart";
function Vt(a) {
  return Array.isArray(a) ? a : typeof a == "number" ? [a, a, a, a] : [0, 0, 0, 0];
}
function Cn(a, n) {
  return a.x < n.x + n.dx && a.x + a.dx > n.x && a.y < n.y + n.dy && a.y + a.dy > n.y;
}
const Sn = He(
  ({
    id: a,
    testId: n,
    gridColumns: i = 2,
    gridRows: o = 2,
    cellWidth: l,
    cellHeight: y,
    cellMargin: x = 10,
    margin: A,
    padding: O = 10,
    paddingX: T,
    paddingY: v,
    width: D,
    height: j,
    theme: te = "material",
    widgets: W,
    editable: I = !0,
    dragHandle: V = "any",
    className: J = "",
    style: H,
    onChange: K,
    onWidgetClick: _,
    onDragStart: h,
    onDragEnd: ae,
    onResizeStart: $,
    onResizeEnd: z
  }, S) => {
    const L = Ce(null), t = Ce(null), [P, w] = q(W), F = Ce(W), [he, le] = q({ width: 0, height: 0 }), d = Ce(null);
    be(() => {
      w(W);
    }, [W]), be(() => {
      F.current = P;
    }, [P]), be(() => {
      const r = t.current;
      if (!r) return;
      const R = () => {
        le({ width: r.clientWidth, height: r.clientHeight });
      };
      R();
      let ee = null;
      const de = new ResizeObserver(() => {
        ee === null && (ee = requestAnimationFrame(() => {
          ee = null, R();
        }));
      });
      return de.observe(r), () => {
        de.disconnect(), ee !== null && cancelAnimationFrame(ee);
      };
    }, []);
    const f = Ie(() => {
      if (l) return l;
      const r = Vt(O), R = T !== void 0 ? T : r[1], ee = he.width - R * 2 - x * (i - 1);
      return Math.max(50, ee / Math.max(1, i));
    }, [l, he.width, O, T, x, i]), k = Ie(() => {
      if (y) return y;
      const r = Vt(O), R = v !== void 0 ? v : r[0], ee = he.height - R * 2 - x * (o - 1);
      return Math.max(50, ee / Math.max(1, o));
    }, [y, he.height, O, v, x, o]), E = ve(
      (r) => {
        w((R) => {
          const ee = typeof r == "function" ? r(R) : r;
          return K?.(ee), ee;
        });
      },
      [K]
    ), Z = ve(
      (r) => F.current.find((R) => R.id === r),
      []
    ), p = ve(
      (r) => {
        if (r.x < 0 || r.y < 0 || r.x + r.dx > i || r.y + r.dy > o) return !1;
        for (const R of F.current) {
          if (r.id && R.id === r.id) continue;
          const ee = { x: R.x, y: R.y, dx: R.dx ?? 1, dy: R.dy ?? 1 };
          if (Cn({ x: r.x, y: r.y, dx: r.dx, dy: r.dy }, ee)) return !1;
        }
        return !0;
      },
      [i, o]
    ), U = ve(
      (r, R) => {
        for (let ee = 0; ee <= o - R; ee++)
          for (let de = 0; de <= i - r; de++)
            if (p({ x: de, y: ee, dx: r, dy: R }))
              return { x: de, y: ee };
        return null;
      },
      [o, i, p]
    );
    We(
      S,
      () => ({
        addWidget: (r, R) => {
          const ee = r.dx ?? 1, de = r.dy ?? 1, me = U(ee, de), Ne = me ? { ...r, x: me.x, y: me.y, dx: ee, dy: de } : { ...r, dx: ee, dy: de };
          E((Ae) => {
            const Se = [...Ae];
            return typeof R == "number" ? Se.splice(R, 0, Ne) : Se.push(Ne), Se;
          });
        },
        removeWidget: (r) => {
          E((R) => R.filter((ee) => ee.id !== r));
        },
        moveWidget: (r, R) => {
          const ee = Z(r);
          if (!ee) return;
          const de = {
            id: r,
            x: R.x ?? ee.x,
            y: R.y ?? ee.y,
            dx: R.dx ?? ee.dx ?? 1,
            dy: R.dy ?? ee.dy ?? 1
          };
          p(de) && E((me) => me.map((Ne) => Ne.id === r ? { ...Ne, ...R } : Ne));
        },
        getWidgets: () => [...F.current],
        getWidget: (r) => F.current.find((R) => R.id === r),
        serialize: () => F.current.map((r) => ({
          id: r.id,
          x: r.x,
          y: r.y,
          dx: r.dx ?? 1,
          dy: r.dy ?? 1
        })),
        restore: (r) => {
          const R = new Map(r.map((ee) => [ee.id, ee]));
          E(
            (ee) => ee.map((de) => {
              const me = R.get(de.id);
              return me ? { ...de, x: me.x, y: me.y, dx: me.dx, dy: me.dy } : de;
            })
          );
        }
      }),
      [E, Z, p, U]
    );
    const ue = ve(
      (r) => {
        E(
          (R) => R.map((ee) => {
            const de = r.find((me) => me.id === ee.id);
            return de ? { ...ee, x: de.x, y: de.y, dx: de.dx ?? 1, dy: de.dy ?? 1 } : ee;
          })
        );
      },
      [E]
    ), G = ve(
      (r) => {
        const R = Z(r.id);
        R && h?.(R);
      },
      [Z, h]
    ), Y = ve(
      (r, R) => {
        const ee = Z(r.id);
        ee && ae?.({ ...ee, x: R.x, y: R.y }, R);
      },
      [Z, ae]
    ), ce = ve(
      (r, R) => {
        if (!I) return;
        const ee = Z(R);
        !ee || ee.resizable !== !0 || (r.preventDefault(), r.stopPropagation(), d.current = {
          widgetId: R,
          startClientX: r.clientX,
          startClientY: r.clientY,
          startDx: ee.dx ?? 1,
          startDy: ee.dy ?? 1
        }, $?.(ee), r.currentTarget.setPointerCapture?.(r.pointerId));
      },
      [I, Z, $]
    ), ne = ve(
      (r) => {
        const R = d.current;
        if (!R) return;
        const ee = Z(R.widgetId);
        if (!ee) return;
        const de = f + x, me = k + x, Ne = r.clientX - R.startClientX, Ae = r.clientY - R.startClientY, Se = Math.max(1, ee.minDx ?? 1), _e = Math.max(1, ee.minDy ?? 1), Ve = Math.max(1, i - ee.x), N = Math.max(1, o - ee.y), se = Math.max(Se, Math.min(Ve, R.startDx + Math.round(Ne / de))), ke = Math.max(_e, Math.min(N, R.startDy + Math.round(Ae / me))), xe = { id: ee.id, x: ee.x, y: ee.y, dx: se, dy: ke };
        p(xe) && ((ee.dx ?? 1) === se && (ee.dy ?? 1) === ke || E((u) => u.map((oe) => oe.id === ee.id ? { ...oe, dx: se, dy: ke } : oe)));
      },
      [Z, f, k, x, i, o, p, E]
    ), ie = ve(
      () => {
        const r = d.current;
        if (!r) return;
        const R = Z(r.widgetId);
        R && z?.(R, { dx: R.dx ?? 1, dy: R.dy ?? 1 }), d.current = null;
      },
      [Z, z]
    ), M = Ie(() => P.map((r) => {
      const R = r.dx ?? 1, ee = r.dy ?? 1, de = r.header ?? null, me = de != null, Ne = V === "header" && I;
      return {
        id: r.id,
        x: r.x,
        y: r.y,
        dx: R,
        dy: ee,
        draggable: r.draggable !== !1,
        content: /* @__PURE__ */ g(
          "div",
          {
            className: [
              "avakio-dashboard__panel",
              me ? "avakio-dashboard__panel--with-header" : "avakio-dashboard__panel--no-header",
              I ? "avakio-dashboard__panel--editable" : "avakio-dashboard__panel--readonly",
              r.className
            ].filter(Boolean).join(" "),
            style: r.style,
            "data-widget-id": r.id,
            children: [
              me && /* @__PURE__ */ g("div", { className: "avakio-dashboard__panel-header", children: [
                r.icon && /* @__PURE__ */ e("span", { className: "avakio-dashboard__panel-icon", children: r.icon }),
                /* @__PURE__ */ e("div", { className: "avakio-dashboard__panel-title", children: de })
              ] }),
              /* @__PURE__ */ e(
                "div",
                {
                  className: "avakio-dashboard__panel-body",
                  onMouseDown: Ne ? (Ae) => Ae.stopPropagation() : void 0,
                  onTouchStart: Ne ? (Ae) => Ae.stopPropagation() : void 0,
                  children: r.body
                }
              ),
              I && r.resizable === !0 && /* @__PURE__ */ e(
                "div",
                {
                  className: "avakio-dashboard__resize-handle",
                  onPointerDown: (Ae) => ce(Ae, r.id),
                  onMouseDown: (Ae) => Ae.stopPropagation(),
                  onTouchStart: (Ae) => Ae.stopPropagation()
                }
              )
            ]
          }
        )
      };
    }), [P, V, I, ce]), m = {
      width: D,
      height: j,
      ...H && typeof H == "object" && !Array.isArray(H) ? H : {}
    };
    return /* @__PURE__ */ e(
      "div",
      {
        ref: t,
        id: a,
        "data-testid": n,
        className: ["avakio-dashboard", `avakio-dashboard--${te}`, J].filter(Boolean).join(" "),
        "data-admin-theme": te,
        style: m,
        onPointerMove: ne,
        onPointerUp: ie,
        onPointerCancel: ie,
        children: /* @__PURE__ */ e(
          Wt,
          {
            ref: L,
            id: a ? `${a}__grid` : void 0,
            testId: n ? `${n}__grid` : void 0,
            gridColumns: i,
            gridRows: o,
            cellWidth: l,
            cellHeight: y,
            cellMargin: x,
            margin: A,
            padding: O,
            paddingX: T,
            paddingY: v,
            width: "100%",
            height: "100%",
            theme: te,
            borderless: !0,
            cellBorderless: !0,
            isDraggable: I,
            cells: M,
            onChange: ue,
            onCellClick: (r) => {
              const R = Z(r.id);
              R && _?.(R);
            },
            onDragStart: G,
            onDragEnd: Y
          }
        )
      }
    );
  }
);
Sn.displayName = "AvakioDashboard";
const Dn = (a) => {
  let n = "", i = a;
  for (; i >= 0; )
    n = String.fromCharCode(i % 26 + 65) + n, i = Math.floor(i / 26) - 1;
  return n;
}, rt = (a, n) => {
  if (!a || a.length === 0) return [];
  const i = a[0];
  return Object.keys(i).map((l, y) => ({
    id: l,
    header: n ? String(i[l] || Dn(y)) : l,
    width: 100
  }));
}, An = He((a, n) => {
  const {
    id: i,
    testId: o,
    theme: l = "material",
    sheets: y,
    data: x,
    columns: A,
    excelHeader: O = !1,
    toolbar: T = !0,
    columnWidth: v = 100,
    rowHeight: D = 32,
    headerRowHeight: j = 36,
    showRowNumbers: te = !0,
    resizeColumn: W = !0,
    resizeRow: I = !1,
    editable: V = !1,
    editAction: J = "dblclick",
    select: H = "cell",
    multiselect: K = !1,
    blockselect: _ = !1,
    gridLines: h = !0,
    navigation: ae = !0,
    freezeHeader: $ = !0,
    leftSplit: z = 0,
    topSplit: S = 0,
    disabled: L = !1,
    autowidth: t = !1,
    autoheight: P = !1,
    yCount: w,
    css: F,
    spans: he = [],
    onCellClick: le,
    onCellDoubleClick: d,
    onCellChange: f,
    onSelectionChange: k,
    onSheetChange: E,
    onColumnResize: Z,
    onRowResize: p,
    onSort: U,
    onDataLoad: ue
  } = a, [G, Y] = q(() => {
    if (y && y.length > 0)
      return y;
    if (x) {
      const fe = A || rt(x, O);
      return [{ name: "Sheet1", data: O ? x.slice(1) : x, columns: fe }];
    }
    return [{ name: "Sheet1", data: [], columns: [] }];
  }), [ce, ne] = q(0), [ie, M] = q(() => {
    const fe = G[0];
    return fe?.columns || rt(fe?.data || [], O);
  }), [m, r] = q(() => G[0]?.data || []), [R, ee] = q(null), [de, me] = q(null), [Ne, Ae] = q(""), [Se, _e] = q(null), [Ve, N] = q({}), [se, ke] = q({}), [xe, u] = q(/* @__PURE__ */ new Set()), [oe, s] = q(null), C = Ce(null), c = Ce(null), X = Ce(null), b = Ce(null);
  be(() => {
    if (y && y.length > 0) {
      Y(y);
      const fe = y[ce] || y[0];
      r(fe.data), M(fe.columns || rt(fe.data, O));
    }
  }, [y, ce, O]), be(() => {
    if (x && !y) {
      const fe = A || rt(x, O), ge = O ? x.slice(1) : x;
      Y([{ name: "Sheet1", data: ge, columns: fe }]), r(ge), M(fe);
    }
  }, [x, A, y, O]);
  const Q = ie.filter((fe) => !fe.hidden && !xe.has(fe.id)), re = Pe.useMemo(() => {
    let fe = [...m];
    if (oe) {
      const { columnId: ge, value: we, compare: Me } = oe;
      fe = fe.filter((Le) => {
        const Oe = Le[ge];
        return Me ? Me(Oe, we) : we === "" || we === null || we === void 0 ? !0 : String(Oe).toLowerCase().includes(String(we).toLowerCase());
      });
    }
    if (Se) {
      const { columnId: ge, direction: we } = Se, Me = ie.find((Le) => Le.id === ge);
      fe.sort((Le, Oe) => {
        const ze = Le[ge], qe = Oe[ge];
        let Ke = 0;
        return typeof Me?.sort == "function" ? Ke = Me.sort(ze, qe) : Me?.sort === "number" ? Ke = (Number(ze) || 0) - (Number(qe) || 0) : Me?.sort === "date" ? Ke = new Date(ze).getTime() - new Date(qe).getTime() : Ke = String(ze || "").localeCompare(String(qe || "")), we === "desc" ? -Ke : Ke;
      });
    }
    return fe;
  }, [m, oe, Se, ie]), ye = ve((fe) => {
    if (fe >= 0 && fe < G.length) {
      ne(fe);
      const ge = G[fe];
      r(ge.data), M(ge.columns || rt(ge.data, O)), ee(null), me(null), _e(null), s(null), E?.(ge.name, fe);
    }
  }, [G, O, E]), B = ve((fe, ge, we) => {
    if (L) return;
    const Me = Q[ge], Le = re[fe];
    H && (_ && we.shiftKey && R ? ee({
      ...R,
      endRow: fe,
      endColumn: ge
    }) : (ee({ row: fe, column: ge }), b.current = { row: fe, col: ge }), k?.({ row: fe, column: ge })), V && J === "click" && Me?.editable !== !1 && (me({ row: fe, col: ge }), Ae(String(Le?.[Me?.id] || ""))), le?.(Le, Me, fe, ge);
  }, [L, H, _, R, V, J, Q, re, k, le]), pe = ve((fe, ge) => {
    if (L) return;
    const we = Q[ge], Me = re[fe];
    V && J === "dblclick" && we?.editable !== !1 && (me({ row: fe, col: ge }), Ae(String(Me?.[we?.id] || ""))), d?.(Me, we, fe, ge);
  }, [L, V, J, Q, re, d]), $e = ve(() => {
    if (!de) return;
    const { row: fe, col: ge } = de, we = Q[ge], Me = re[fe], Le = Me?.[we?.id];
    if (Ne !== String(Le || "")) {
      const Oe = [...m], ze = m.indexOf(Me);
      ze >= 0 && (Oe[ze] = { ...Oe[ze], [we.id]: Ne }, r(Oe), f?.(Me, we, Le, Ne, ze));
    }
    me(null), Ae("");
  }, [de, Ne, Q, re, m, f]), De = ve((fe, ge) => {
    ge.preventDefault(), ge.stopPropagation();
    const we = ie.find((ze) => ze.id === fe), Me = Ve[fe] || we?.width || v;
    X.current = { columnId: fe, startX: ge.clientX, startWidth: Me };
    const Le = (ze) => {
      if (!X.current) return;
      const qe = ze.clientX - X.current.startX, Ke = Math.max(50, X.current.startWidth + qe);
      N((bt) => ({ ...bt, [fe]: Ke }));
    }, Oe = () => {
      if (X.current) {
        const ze = ie.find((Ke) => Ke.id === X.current.columnId), qe = Ve[X.current.columnId] || ze?.width || v;
        Z?.(ze, qe);
      }
      X.current = null, document.removeEventListener("mousemove", Le), document.removeEventListener("mouseup", Oe);
    };
    document.addEventListener("mousemove", Le), document.addEventListener("mouseup", Oe);
  }, [ie, Ve, v, Z]), Ee = ve((fe) => {
    if (!fe.sort) return;
    let ge = "asc";
    Se?.columnId === fe.id && (ge = Se.direction === "asc" ? "desc" : "asc"), _e({ columnId: fe.id, direction: ge }), U?.(fe, ge);
  }, [Se, U]), Re = ve((fe) => {
    if (L || !ae || !R) return;
    const { row: ge, column: we } = R;
    let Me = ge, Le = we;
    switch (fe.key) {
      case "ArrowUp":
        Me = Math.max(0, ge - 1);
        break;
      case "ArrowDown":
        Me = Math.min(re.length - 1, ge + 1);
        break;
      case "ArrowLeft":
        Le = Math.max(0, we - 1);
        break;
      case "ArrowRight":
        Le = Math.min(Q.length - 1, we + 1);
        break;
      case "Tab":
        fe.preventDefault(), fe.shiftKey ? (Le = we - 1, Le < 0 && (Le = Q.length - 1, Me = Math.max(0, ge - 1))) : (Le = we + 1, Le >= Q.length && (Le = 0, Me = Math.min(re.length - 1, ge + 1)));
        break;
      case "Enter":
        if (de)
          $e(), Me = Math.min(re.length - 1, ge + 1);
        else if (V) {
          const Oe = Q[we];
          if (Oe?.editable !== !1) {
            me({ row: ge, col: we }), Ae(String(re[ge]?.[Oe?.id] || ""));
            return;
          }
        }
        break;
      case "Escape":
        if (de) {
          me(null), Ae("");
          return;
        }
        break;
      case "Home":
        fe.ctrlKey && (Me = 0), Le = 0;
        break;
      case "End":
        fe.ctrlKey && (Me = re.length - 1), Le = Q.length - 1;
        break;
      default:
        return;
    }
    (Me !== ge || Le !== we) && (fe.preventDefault(), ee({ row: Me, column: Le }), k?.({ row: Me, column: Le }));
  }, [L, ae, R, re, Q, de, V, $e, k]), Te = ve((fe, ge) => {
    if (!R) return !1;
    const { row: we, column: Me, endRow: Le, endColumn: Oe } = R;
    if (Le !== void 0 && Oe !== void 0) {
      const ze = Math.min(we, Le), qe = Math.max(we, Le), Ke = Math.min(Me, Oe), bt = Math.max(Me, Oe);
      return fe >= ze && fe <= qe && ge >= Ke && ge <= bt;
    }
    return we === fe && Me === ge;
  }, [R]), je = ve((fe, ge) => {
    for (const we of he) {
      if (we.row === fe && we.column === ge)
        return { rowspan: we.rowspan, colspan: we.colspan };
      if (we.rowspan && we.colspan) {
        const Me = we.row + (we.rowspan - 1), Le = Q.findIndex((qe) => qe.id === we.column), Oe = Le + (we.colspan - 1), ze = Q.findIndex((qe) => qe.id === ge);
        if (fe >= we.row && fe <= Me && ze >= Le && ze <= Oe && !(fe === we.row && ge === we.column))
          return { hidden: !0 };
      }
    }
    return {};
  }, [he, Q]);
  We(n, () => ({
    getSheets: () => G.map((fe) => fe.name),
    showSheet: (fe) => {
      const ge = G.findIndex((we) => we.name === fe);
      ge >= 0 && ye(ge);
    },
    getCurrentSheet: () => G[ce]?.name || "",
    getData: () => m,
    setData: (fe) => {
      r(fe), ue?.(fe);
    },
    getColumns: () => ie,
    setColumns: (fe) => M(fe),
    getSelectedId: () => R,
    select: (fe, ge, we, Me) => {
      ee({ row: fe, column: ge, endRow: we, endColumn: Me }), k?.({ row: fe, column: ge, endRow: we, endColumn: Me });
    },
    clearSelection: () => {
      ee(null), k?.(null);
    },
    getCellValue: (fe, ge) => m[fe]?.[ge],
    setCellValue: (fe, ge, we) => {
      const Me = [...m];
      Me[fe] && (Me[fe] = { ...Me[fe], [ge]: we }, r(Me));
    },
    addRow: (fe, ge) => {
      const we = [...m];
      ge !== void 0 ? we.splice(ge, 0, fe) : we.push(fe), r(we);
    },
    removeRow: (fe) => {
      const ge = [...m];
      ge.splice(fe, 1), r(ge);
    },
    refresh: () => {
      r([...m]);
    },
    getItem: (fe) => m[fe],
    count: () => m.length,
    showCell: (fe, ge) => {
      C.current?.querySelector(`[data-row="${fe}"][data-col="${ge}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    },
    hideColumn: (fe) => {
      u((ge) => /* @__PURE__ */ new Set([...Array.from(ge), fe]));
    },
    showColumn: (fe) => {
      u((ge) => {
        const we = new Set(ge);
        return we.delete(fe), we;
      });
    },
    isColumnVisible: (fe) => !xe.has(fe),
    sort: (fe, ge) => {
      const we = ie.find((Me) => Me.id === fe);
      if (we) {
        const Me = ge || (Se?.columnId === fe && Se?.direction === "asc" ? "desc" : "asc");
        _e({ columnId: fe, direction: Me }), U?.(we, Me);
      }
    },
    filter: (fe, ge, we) => {
      s({ columnId: fe, value: ge, compare: we });
    },
    clearFilter: () => {
      s(null);
    }
  }), [G, ce, m, ie, R, xe, Se, ye, ue, k, U]);
  const Ue = w ? w * D + j : void 0;
  return /* @__PURE__ */ g(
    "div",
    {
      ref: C,
      id: i,
      "data-testid": o,
      className: `avakio-excel-viewer avakio-excel-viewer-theme-${l} ${F || ""} ${L ? "avakio-excel-viewer-disabled" : ""} ${h ? "avakio-excel-viewer-grid-lines" : ""}`,
      tabIndex: ae ? 0 : -1,
      onKeyDown: Re,
      children: [
        T && G.length > 1 && /* @__PURE__ */ e("div", { className: "avakio-excel-viewer-toolbar", children: G.map((fe, ge) => /* @__PURE__ */ e(
          "button",
          {
            className: `avakio-excel-viewer-sheet-tab ${ge === ce ? "active" : ""}`,
            onClick: () => ye(ge),
            disabled: L,
            children: fe.name
          },
          fe.name
        )) }),
        /* @__PURE__ */ e(
          "div",
          {
            className: "avakio-excel-viewer-table-container",
            style: { maxHeight: Ue },
            children: /* @__PURE__ */ g(
              "table",
              {
                ref: c,
                className: "avakio-excel-viewer-table",
                children: [
                  /* @__PURE__ */ e("thead", { className: $ ? "avakio-excel-viewer-sticky-header" : "", children: /* @__PURE__ */ g("tr", { style: { height: j }, children: [
                    te && /* @__PURE__ */ e("th", { className: "avakio-excel-viewer-row-number-header", children: "#" }),
                    Q.map((fe, ge) => /* @__PURE__ */ g(
                      "th",
                      {
                        className: `avakio-excel-viewer-header-cell ${fe.css || ""} ${fe.sort ? "sortable" : ""} ${Se?.columnId === fe.id ? `sorted-${Se.direction}` : ""}`,
                        style: {
                          width: Ve[fe.id] || fe.width || v,
                          minWidth: fe.minWidth,
                          maxWidth: fe.maxWidth,
                          textAlign: fe.align || "left"
                        },
                        onClick: () => Ee(fe),
                        children: [
                          /* @__PURE__ */ e("span", { className: "avakio-excel-viewer-header-text", children: fe.header || fe.id }),
                          fe.sort && Se?.columnId === fe.id && /* @__PURE__ */ e("span", { className: "avakio-excel-viewer-sort-icon", children: Se.direction === "asc" ? "▲" : "▼" }),
                          W && /* @__PURE__ */ e(
                            "div",
                            {
                              className: "avakio-excel-viewer-resize-handle",
                              onMouseDown: (we) => De(fe.id, we)
                            }
                          )
                        ]
                      },
                      fe.id
                    ))
                  ] }) }),
                  /* @__PURE__ */ e("tbody", { children: re.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
                    "td",
                    {
                      colSpan: Q.length + (te ? 1 : 0),
                      className: "avakio-excel-viewer-empty",
                      children: "No data available"
                    }
                  ) }) : re.map((fe, ge) => /* @__PURE__ */ g(
                    "tr",
                    {
                      style: { height: se[ge] || D },
                      className: H === "row" && R?.row === ge ? "selected-row" : "",
                      children: [
                        te && /* @__PURE__ */ e("td", { className: "avakio-excel-viewer-row-number", children: ge + 1 }),
                        Q.map((we, Me) => {
                          const Le = je(ge, we.id);
                          if (Le.hidden) return null;
                          const Oe = de?.row === ge && de?.col === Me, ze = Te(ge, Me), qe = fe[we.id];
                          return /* @__PURE__ */ e(
                            "td",
                            {
                              "data-row": ge,
                              "data-col": we.id,
                              className: `avakio-excel-viewer-cell ${we.css || ""} ${ze ? "selected" : ""} ${Oe ? "editing" : ""}`,
                              style: {
                                textAlign: we.align || "left",
                                width: Ve[we.id] || we.width || v
                              },
                              rowSpan: Le.rowspan,
                              colSpan: Le.colspan,
                              onClick: (Ke) => B(ge, Me, Ke),
                              onDoubleClick: () => pe(ge, Me),
                              children: Oe ? /* @__PURE__ */ e(
                                "input",
                                {
                                  type: we.editor === "number" ? "number" : "text",
                                  className: "avakio-excel-viewer-editor",
                                  value: Ne,
                                  onChange: (Ke) => Ae(Ke.target.value),
                                  onBlur: $e,
                                  onKeyDown: (Ke) => {
                                    Ke.key === "Enter" ? $e() : Ke.key === "Escape" && (me(null), Ae("")), Ke.stopPropagation();
                                  },
                                  autoFocus: !0
                                }
                              ) : we.template ? we.template(fe, we) : /* @__PURE__ */ e("span", { className: "avakio-excel-viewer-cell-text", children: qe != null ? String(qe) : "" })
                            },
                            we.id
                          );
                        })
                      ]
                    },
                    ge
                  )) })
                ]
              }
            )
          }
        )
      ]
    }
  );
});
An.displayName = "AvakioExcelViewer";
const ss = {
  /** Field is required (not empty) */
  isRequired: (a) => a == null ? !1 : typeof a == "string" ? a.trim().length > 0 : Array.isArray(a) ? a.length > 0 : !0,
  /** Must be a valid email */
  isEmail: (a) => a ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(a)) : !0,
  /** Must be a valid number */
  isNumber: (a) => !a && a !== 0 ? !0 : !isNaN(Number(a)),
  /** Must be a positive number */
  isPositive: (a) => {
    if (!a && a !== 0) return !0;
    const n = Number(a);
    return !isNaN(n) && n > 0;
  },
  /** Must be an integer */
  isInteger: (a) => !a && a !== 0 ? !0 : Number.isInteger(Number(a)),
  /** Must match given regex pattern */
  pattern: (a) => (n) => n ? a.test(String(n)) : !0,
  /** Minimum length */
  minLength: (a) => (n) => n ? String(n).length >= a : !0,
  /** Maximum length */
  maxLength: (a) => (n) => n ? String(n).length <= a : !0,
  /** Minimum value (for numbers) */
  minValue: (a) => (n) => !n && n !== 0 ? !0 : Number(n) >= a,
  /** Maximum value (for numbers) */
  maxValue: (a) => (n) => !n && n !== 0 ? !0 : Number(n) <= a,
  /** Custom validation function */
  custom: (a) => a
}, Kt = Pe.createContext(null), Mn = () => Pe.useContext(Kt);
function _n(a, n, i) {
  const o = n.split("."), l = { ...a };
  let y = l;
  for (let x = 0; x < o.length - 1; x++) {
    const A = o[x];
    y[A] = y[A] ? { ...y[A] } : {}, y = y[A];
  }
  return y[o[o.length - 1]] = i, l;
}
function In(a, n) {
  return n.split(".").reduce((i, o) => i?.[o], a);
}
function mt(a, n = "") {
  const i = {};
  for (const o in a) {
    const l = n ? `${n}.${o}` : o;
    a[o] && typeof a[o] == "object" && !Array.isArray(a[o]) && !(a[o] instanceof Date) ? Object.assign(i, mt(a[o], l)) : i[l] = a[o];
  }
  return i;
}
const En = He((a, n) => {
  const {
    children: i,
    elements: o,
    values: l = {},
    defaultValues: y,
    rules: x = {},
    complexData: A = !1,
    autoHeight: O = !1,
    borderless: T = !1,
    disabled: v = !1,
    width: D,
    height: j,
    minWidth: te,
    maxWidth: W,
    minHeight: I,
    maxHeight: V,
    padding: J,
    paddingX: H,
    paddingY: K,
    margin: _,
    scroll: h,
    type: ae = "form",
    theme: $,
    className: z,
    style: S,
    visibleBatch: L,
    onChange: t,
    onValidation: P,
    onValidationError: w,
    onValidationSuccess: F,
    onSubmit: he,
    onValues: le
  } = a, d = Ce(null), f = Ce(/* @__PURE__ */ new Map()), [k, E] = q(() => A ? mt(l) : { ...l }), [Z, p] = q(() => {
    const b = y || l;
    return A ? mt(b) : { ...b };
  }), [U, ue] = q({}), [G, Y] = q(v), [ce, ne] = q(!1), [ie, M] = q(L);
  be(() => {
    Y(v);
  }, [v]);
  const m = ve((b, Q) => {
    E((re) => {
      const ye = A ? _n(re, b, Q) : { ...re, [b]: Q };
      return t?.(b, Q, ye), ye;
    }), ne(!0), ue((re) => {
      if (re[b]) {
        const ye = { ...re };
        return delete ye[b], ye;
      }
      return re;
    });
  }, [A, t]), r = ve((b, Q) => {
    Q && f.current.set(b, Q);
  }, []), R = ve((b) => {
    f.current.delete(b);
  }, []), ee = ve((b, Q) => {
    const re = x[b];
    if (!re) return;
    const ye = Array.isArray(re) ? re : [re];
    for (const B of ye) {
      const pe = B(Q, b, k);
      if (pe === !1)
        return "Invalid value";
      if (typeof pe == "string")
        return pe;
    }
  }, [x, k]), de = ve(() => {
    const b = {};
    let Q = !0;
    for (const re in x) {
      const ye = A ? In(k, re) : k[re], B = ee(re, ye);
      B ? (b[re] = B, Q = !1, w?.(re, B)) : F?.(re);
    }
    return ue(b), P?.(Q, b), Q;
  }, [x, k, A, ee, P, w, F]), me = ve(() => {
    if (!A) return { ...k };
    const b = {};
    for (const Q in k)
      if (Q.includes(".")) {
        const re = Q.split(".");
        let ye = b;
        for (let B = 0; B < re.length - 1; B++)
          ye[re[B]] || (ye[re[B]] = {}), ye = ye[re[B]];
        ye[re[re.length - 1]] = k[Q];
      } else
        b[Q] = k[Q];
    return b;
  }, [k, A]), Ne = ve((b, Q = !0) => {
    const re = A ? mt(b) : { ...b };
    E(re), Q && (p(re), ne(!1)), le?.(b);
  }, [A, le]), Ae = ve(() => {
    const b = {};
    for (const Q in k)
      k[Q] === Z[Q] && (b[Q] = k[Q]);
    return b;
  }, [k, Z]), Se = ve(() => {
    const b = {};
    for (const Q in k)
      k[Q] !== Z[Q] && (b[Q] = k[Q]);
    return b;
  }, [k, Z]), _e = ve(() => {
    for (const b in k)
      if (k[b] !== Z[b])
        return !0;
    return !1;
  }, [k, Z]), Ve = ve(() => {
    ue({});
  }, []), N = ve((b, Q = "Invalid value") => {
    ue((re) => ({ ...re, [b]: Q }));
  }, []), se = ve(() => {
    E({}), ue({}), ne(!1);
  }, []), ke = ve((b) => {
    if (b) {
      const Q = f.current.get(b);
      Q && (Q.querySelector("input, textarea, select, [tabindex]") || Q).focus();
    } else {
      const Q = f.current.values().next().value;
      Q && (Q.querySelector("input, textarea, select, [tabindex]") || Q).focus();
    }
  }, []), xe = ve((b) => {
    b.preventDefault(), de() && he?.(me());
  }, [de, he, me]), u = ve((b) => {
    if (b.key === "Enter" && !b.shiftKey && b.target.tagName !== "TEXTAREA") {
      const re = d.current;
      re && (re.querySelector('button[type="submit"]') || (b.preventDefault(), de() && he?.(me())));
    }
  }, [de, he, me]);
  We(n, () => ({
    getNode: () => d.current,
    getValues: me,
    setValues: Ne,
    getCleanValues: Ae,
    getDirtyValues: Se,
    isDirty: _e,
    setDirty: ne,
    validate: de,
    clearValidation: Ve,
    markInvalid: N,
    clear: se,
    focus: ke,
    isEnabled: () => !G,
    enable: () => Y(!1),
    disable: () => Y(!0),
    showBatch: M,
    getErrors: () => ({ ...U })
  }), [
    me,
    Ne,
    Ae,
    Se,
    _e,
    de,
    Ve,
    N,
    se,
    ke,
    G,
    U
  ]);
  const oe = {
    ...S,
    width: typeof D == "number" ? `${D}px` : D,
    height: O ? "auto" : typeof j == "number" ? `${j}px` : j,
    minWidth: typeof te == "number" ? `${te}px` : te,
    maxWidth: typeof W == "number" ? `${W}px` : W,
    minHeight: typeof I == "number" ? `${I}px` : I,
    maxHeight: typeof V == "number" ? `${V}px` : V
  };
  if (J !== void 0 && (oe.padding = typeof J == "number" ? `${J}px` : J), H !== void 0) {
    const b = typeof H == "number" ? `${H}px` : H;
    oe.paddingLeft = b, oe.paddingRight = b;
  }
  if (K !== void 0) {
    const b = typeof K == "number" ? `${K}px` : K;
    oe.paddingTop = b, oe.paddingBottom = b;
  }
  const s = [
    "avakio-form",
    `avakio-form--type-${ae}`,
    T && "avakio-form--borderless",
    G && "avakio-form--disabled",
    h === !0 && "avakio-form--scroll",
    h === "x" && "avakio-form--scroll-x",
    h === "y" && "avakio-form--scroll-y",
    h === "xy" && "avakio-form--scroll",
    $ && `avakio-form--theme-${$}`,
    z
  ].filter(Boolean).join(" "), C = {
    values: k,
    errors: U,
    disabled: G,
    onChange: m,
    registerField: r,
    unregisterField: R
  }, c = (b, Q) => {
    if (b.hidden || b.batch && ie && b.batch !== ie)
      return null;
    if (b.type === "section")
      return /* @__PURE__ */ e("div", { className: "avakio-form__section", children: /* @__PURE__ */ e("div", { className: "avakio-form__section-header", children: b.label }) }, Q);
    if (b.cols) {
      const re = {};
      return b.margin !== void 0 && (re.gap = typeof b.margin == "number" ? `${b.margin}px` : b.margin), /* @__PURE__ */ e(
        "div",
        {
          className: `avakio-form__cols ${b.css || ""}`,
          style: re,
          children: b.cols.map((ye, B) => c(ye, B))
        },
        Q
      );
    }
    if (b.rows) {
      const re = {};
      return b.margin !== void 0 && (re.gap = typeof b.margin == "number" ? `${b.margin}px` : b.margin), /* @__PURE__ */ e(
        "div",
        {
          className: `avakio-form__rows ${b.css || ""}`,
          style: re,
          children: b.rows.map((ye, B) => c(ye, B))
        },
        Q
      );
    }
    if (b.view) {
      const re = {};
      return b.width !== void 0 && (re.width = typeof b.width == "number" ? `${b.width}px` : b.width), b.height !== void 0 && (re.height = typeof b.height == "number" ? `${b.height}px` : b.height), b.gravity !== void 0 && (re.flex = b.gravity), b.padding !== void 0 && (re.padding = typeof b.padding == "number" ? `${b.padding}px` : b.padding), /* @__PURE__ */ e(
        "div",
        {
          className: `avakio-form__element ${b.css || ""}`,
          style: re,
          children: b.view
        },
        Q
      );
    }
    return null;
  }, X = {};
  return _ !== void 0 && (X.gap = typeof _ == "number" ? `${_}px` : _), /* @__PURE__ */ e(Kt.Provider, { value: C, children: /* @__PURE__ */ e(
    "form",
    {
      ref: d,
      className: s,
      style: oe,
      onSubmit: xe,
      onKeyDown: u,
      "data-admin-theme": $,
      children: /* @__PURE__ */ e("div", { className: "avakio-form__content", style: X, children: o ? o.map((b, Q) => c(b, Q)) : i })
    }
  ) });
});
En.displayName = "AvakioForm";
const rs = ({ name: a, children: n, render: i }) => {
  const o = Mn(), l = Ce(null);
  if (be(() => {
    if (o && l.current)
      return o.registerField(a, l.current), () => o.unregisterField(a);
  }, [o, a]), !o)
    return /* @__PURE__ */ e("div", { ref: l, className: "avakio-form__field", children: n });
  const { values: y, errors: x, disabled: A, onChange: O } = o, T = y[a], v = x[a], D = (te) => {
    O(a, te);
  };
  if (i)
    return /* @__PURE__ */ e("div", { ref: l, className: "avakio-form__field", children: i({ value: T, error: v, onChange: D, disabled: A }) });
  const j = Pe.Children.map(n, (te) => Pe.isValidElement(te) ? Pe.cloneElement(te, {
    value: T,
    error: v,
    onChange: D,
    disabled: A || te.props.disabled,
    invalid: !!v,
    invalidMessage: v
  }) : te);
  return /* @__PURE__ */ e("div", { ref: l, className: "avakio-form__field", children: j });
};
function is({
  value: a,
  defaultValue: n,
  min: i = 0,
  max: o = 100,
  label: l,
  subLabel: y,
  size: x = "md",
  thickness: A,
  prefix: O = "",
  suffix: T = "",
  formatValue: v,
  showValue: D = !0,
  showMinMax: j = !0,
  trackColor: te,
  color: W,
  target: I,
  className: V,
  style: J,
  id: H,
  testId: K
}) {
  const _ = o - i === 0 ? 1 : o - i, ae = Math.min(Math.max(a ?? n ?? i, i), o), $ = (ae - i) / _ * 100, z = A ?? (x === "sm" ? 10 : x === "lg" ? 14 : 12), S = 88, L = 2 * Math.PI * S, t = L * (1 - $ / 100), P = Ie(() => {
    if (I == null) return null;
    const d = (Math.min(Math.max(I, i), o) - i) / _ * 100 / 100 * 2 * Math.PI - Math.PI / 2, f = 100 + S * Math.cos(d), k = 100 + S * Math.sin(d);
    return { x: f, y: k };
  }, [I, i, o, _]), w = Ie(() => {
    if (!D) return "";
    const le = v ? v(ae) : ae.toString();
    return `${O}${le}${T}`;
  }, [ae, v, O, T, D]), F = ["avakio-gage", `avakio-gage-${x}`, V].filter(Boolean).join(" "), he = {
    ...J,
    ...W ? { "--gg-fill": W } : null,
    ...te ? { "--gg-track": te } : null
  };
  return /* @__PURE__ */ g("div", { id: H, "data-testid": K, className: F, style: he, "data-percent": $.toFixed(1), children: [
    l && /* @__PURE__ */ e("div", { className: "avakio-gage-label", children: l }),
    /* @__PURE__ */ g("div", { className: "avakio-gage-shell", children: [
      /* @__PURE__ */ g("svg", { viewBox: "0 0 200 200", role: "img", "aria-label": l ? `${l} ${w}` : w, children: [
        /* @__PURE__ */ e(
          "circle",
          {
            className: "avakio-gage-track",
            cx: "100",
            cy: "100",
            r: S,
            strokeWidth: z
          }
        ),
        /* @__PURE__ */ e(
          "circle",
          {
            className: "avakio-gage-value",
            cx: "100",
            cy: "100",
            r: S,
            strokeWidth: z,
            strokeDasharray: `${L} ${L}`,
            strokeDashoffset: t
          }
        ),
        P && /* @__PURE__ */ e(
          "circle",
          {
            className: "avakio-gage-target",
            cx: P.x,
            cy: P.y,
            r: 6,
            strokeWidth: 2
          }
        )
      ] }),
      D && /* @__PURE__ */ g("div", { className: "avakio-gage-center", children: [
        /* @__PURE__ */ e("div", { className: "avakio-gage-value-text", children: w }),
        y && /* @__PURE__ */ e("div", { className: "avakio-gage-sublabel", children: y })
      ] })
    ] }),
    j && /* @__PURE__ */ g("div", { className: "avakio-gage-minmax", children: [
      /* @__PURE__ */ e("span", { children: i }),
      /* @__PURE__ */ e("span", { children: o })
    ] })
  ] });
}
const Vn = {}, os = ["material", "flat", "compact", "dark", "ocean", "sunset"], Lt = "avakio-googlemaps-script";
function Ln(a) {
  return typeof window > "u" ? Promise.reject(new Error("window not available")) : window.google?.maps ? Promise.resolve(window.google) : (window.__avakioGooglePromise || (window.__avakioGooglePromise = new Promise((n, i) => {
    const o = document.getElementById(Lt);
    if (o) {
      o.addEventListener("load", () => n(window.google)), o.addEventListener("error", i);
      return;
    }
    const l = document.createElement("script");
    l.id = Lt, l.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(a)}`, l.async = !0, l.defer = !0, l.onload = () => n(window.google), l.onerror = i, document.head.appendChild(l);
  })), window.__avakioGooglePromise);
}
function ls({
  center: a,
  zoom: n = 12,
  markers: i = [],
  mapType: o = "roadmap",
  height: l = 360,
  className: y,
  style: x,
  apiKey: A,
  theme: O,
  id: T,
  testId: v
}) {
  const D = Ce(null), j = Ce(null), te = Ce([]), W = A ?? (typeof import.meta < "u" ? Vn?.VITE_GOOGLE_MAPS_API_KEY : void 0) ?? null, I = Ie(() => {
    const J = a.lat.toFixed(6), H = a.lng.toFixed(6);
    return `https://www.google.com/maps?q=${J},${H}&z=${n ?? 12}&output=embed`;
  }, [a.lat, a.lng, n]);
  be(() => {
    if (!W || typeof window > "u") return;
    let J = !1;
    return Ln(W).then((H) => {
      J || !D.current || (j.current ? j.current.setOptions({ center: a, zoom: n, mapTypeId: o }) : j.current = new H.maps.Map(D.current, {
        center: a,
        zoom: n,
        mapTypeId: o,
        streetViewControl: !1,
        fullscreenControl: !1
      }), te.current.forEach((K) => K.setMap(null)), te.current = i.map((K) => new H.maps.Marker({
        position: K.position,
        title: K.label,
        map: j.current
      })));
    }).catch(() => {
    }), () => {
      J = !0, te.current.forEach((H) => H.setMap(null)), te.current = [];
    };
  }, [W, a.lat, a.lng, n, o, i]);
  const V = typeof l == "number" ? `${l}px` : l;
  return /* @__PURE__ */ g(
    "div",
    {
      id: T,
      "data-testid": v,
      className: ["avakio-googlemap", y].filter(Boolean).join(" "),
      style: { ...x, "--agm-height": V },
      "data-admin-theme": O,
      children: [
        W ? /* @__PURE__ */ e("div", { ref: D, "data-testid": "avakio-googlemap-interactive", className: "avakio-googlemap-canvas" }) : /* @__PURE__ */ e(
          "iframe",
          {
            "data-testid": "avakio-googlemap-embed",
            title: "Google Map",
            src: I,
            className: "avakio-googlemap-embed",
            allowFullScreen: !0,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade"
          }
        ),
        i.length > 0 && /* @__PURE__ */ e("div", { className: "avakio-googlemap-markerlist", "aria-label": "Markers", children: i.map((J, H) => /* @__PURE__ */ g("div", { className: "avakio-googlemap-markeritem", children: [
          /* @__PURE__ */ e("span", { className: "avakio-googlemap-markerbadge", children: H + 1 }),
          /* @__PURE__ */ g("div", { className: "avakio-googlemap-markertext", children: [
            /* @__PURE__ */ e("strong", { children: J.label ?? `Marker ${H + 1}` }),
            /* @__PURE__ */ g("span", { children: [
              J.position.lat,
              ", ",
              J.position.lng
            ] })
          ] })
        ] }, J.id ?? H)) })
      ]
    }
  );
}
function cs({
  data: a,
  value: n,
  defaultValue: i,
  onSelect: o,
  onChange: l,
  onNavigate: y,
  templateItem: x,
  templateGroup: A,
  templateBack: O,
  select: T = !0,
  animate: v = !0,
  animationDuration: D = 250,
  showBack: j = !0,
  backLabel: te = "Back",
  width: W,
  height: I,
  scroll: V = !0,
  className: J,
  style: H,
  id: K,
  testId: _
}) {
  const [h, ae] = q([]), [$, z] = q(a), [S, L] = q(i ?? null), [t, P] = q(!1), [w, F] = q("forward"), he = Ce(null), le = n !== void 0 ? n : S, d = ve((Y) => {
    let ce = a;
    for (const ne of Y) {
      const ie = ce.find((M) => M.id === ne);
      if (ie?.data)
        ce = ie.data;
      else
        return [];
    }
    return ce;
  }, [a]), f = ve(() => {
    if (h.length === 0) return null;
    let Y = a, ce = null;
    for (const ne of h)
      ce = Y.find((ie) => ie.id === ne) || null, ce?.data && (Y = ce.data);
    return ce;
  }, [a, h]), k = ve((Y) => {
    if (!Y.data || Y.disabled) return;
    v && (P(!0), F("forward"));
    const ce = [...h, Y.id];
    ae(ce), setTimeout(() => {
      z(Y.data), P(!1), y?.({
        parents: ce,
        branch: Y.data
      });
    }, v ? D : 0);
  }, [h, v, D, y]), E = ve(() => {
    if (h.length === 0) return;
    v && (P(!0), F("backward"));
    const Y = h.slice(0, -1);
    ae(Y), setTimeout(() => {
      const ce = d(Y);
      z(ce), P(!1), y?.({
        parents: Y,
        branch: ce
      });
    }, v ? D : 0);
  }, [h, v, D, d, y]), Z = ve((Y) => {
    Y.disabled || (Y.data && Y.data.length > 0 ? k(Y) : T && (L(Y.id), o?.(Y), l?.(Y.id, Y)));
  }, [k, T, o, l]);
  ve(() => ({
    parents: h,
    branch: $
  }), [h, $]), ve((Y) => {
    const ce = (ie, M, m) => {
      for (const r of ie) {
        if (r.id === M)
          return m;
        if (r.data) {
          const R = ce(r.data, M, [...m, r.id]);
          if (R) return R;
        }
      }
      return null;
    }, ne = ce(a, Y, []);
    if (ne) {
      ae(ne);
      const ie = d(ne);
      z(ie);
    }
  }, [a, d]), be(() => {
    ae([]), z(a);
  }, [a]);
  const p = ve((Y) => {
    const ce = Y.data && Y.data.length > 0, ne = le === Y.id, ie = Y.data?.length || 0, M = [
      "avakio-grouplist-item",
      ce && "avakio-grouplist-item-group",
      ne && "avakio-grouplist-item-selected",
      Y.disabled && "avakio-grouplist-item-disabled",
      Y.className
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ g(
      "div",
      {
        className: M,
        onClick: () => Z(Y),
        role: ce ? "button" : "option",
        "aria-selected": ne,
        "aria-disabled": Y.disabled,
        tabIndex: Y.disabled ? -1 : 0,
        onKeyDown: (m) => {
          (m.key === "Enter" || m.key === " ") && (m.preventDefault(), Z(Y));
        },
        children: [
          /* @__PURE__ */ g("div", { className: "avakio-grouplist-item-content", children: [
            Y.icon && /* @__PURE__ */ e("span", { className: "avakio-grouplist-item-icon", children: Y.icon }),
            /* @__PURE__ */ e("span", { className: "avakio-grouplist-item-value", children: ce ? A ? A(Y, ie) : Y.value : x ? x(Y) : Y.value }),
            ce && /* @__PURE__ */ g("span", { className: "avakio-grouplist-item-count", children: [
              "(",
              ie,
              ")"
            ] })
          ] }),
          ce && /* @__PURE__ */ e(Ge, { className: "avakio-grouplist-item-arrow", size: 18 })
        ]
      },
      Y.id
    );
  }, [le, x, A, Z]), U = ve(() => {
    if (!j || h.length === 0) return null;
    const Y = f(), ce = $.length;
    return /* @__PURE__ */ g(
      "div",
      {
        className: "avakio-grouplist-back",
        onClick: E,
        role: "button",
        tabIndex: 0,
        onKeyDown: (ne) => {
          (ne.key === "Enter" || ne.key === " ") && (ne.preventDefault(), E());
        },
        children: [
          /* @__PURE__ */ e(Ze, { className: "avakio-grouplist-back-arrow", size: 18 }),
          /* @__PURE__ */ e("span", { className: "avakio-grouplist-back-content", children: Y && O ? O(Y, ce) : Y?.value || te }),
          /* @__PURE__ */ g("span", { className: "avakio-grouplist-back-count", children: [
            "(",
            ce,
            ")"
          ] })
        ]
      }
    );
  }, [j, h, $, f, E, O, te]), ue = Ie(() => [
    "avakio-grouplist",
    t && `avakio-grouplist-animating avakio-grouplist-${w}`,
    V && "avakio-grouplist-scroll",
    J
  ].filter(Boolean).join(" "), [t, w, V, J]), G = Ie(() => ({
    ...H,
    ...W !== void 0 ? { width: typeof W == "number" ? `${W}px` : W } : {},
    ...I !== void 0 ? { height: typeof I == "number" ? `${I}px` : I } : {},
    ...v ? { "--grouplist-animation-duration": `${D}ms` } : {}
  }), [H, W, I, v, D]);
  return /* @__PURE__ */ g(
    "div",
    {
      ref: he,
      id: K,
      "data-testid": _,
      className: ue,
      style: G,
      role: "listbox",
      "aria-label": "Group list",
      children: [
        U(),
        /* @__PURE__ */ e("div", { className: "avakio-grouplist-items", children: $.map(p) })
      ]
    }
  );
}
const Tn = He((a, n) => {
  const {
    id: i,
    testId: o,
    steps: l,
    theme: y = "material",
    prevButton: x = !0,
    nextButton: A = !0,
    endLabel: O = "End Tour",
    stepTimeout: T = 0,
    visible: v,
    onStart: D,
    onBeforeStart: j,
    onAfterStart: te,
    onEnd: W,
    onSkip: I,
    onNext: V,
    onPrevious: J,
    onStepChange: H
  } = a, [K, _] = q(l), [h, ae] = q(0), [$, z] = q(!1), [S, L] = q(null), [t, P] = q({ top: 0, left: 0 }), w = Ce(null), F = Ce(null);
  be(() => {
    v !== void 0 && z(v);
  }, [v]), be(() => {
    _(l);
  }, [l]);
  const he = ve((m) => {
    if (!m) return null;
    let r = document.querySelector(m);
    return r || (r = document.getElementById(m), r) || !m.startsWith("#") && !m.startsWith(".") && (r = document.querySelector(`#${m}`), r) ? r : null;
  }, []), le = ve(() => {
    if (!$ || h >= K.length) {
      L(null);
      return;
    }
    const m = K[h], r = he(m.el);
    if (r) {
      const R = r.getBoundingClientRect(), ee = m.padding || 8, [de, me, Ne, Ae] = Array.isArray(ee) ? ee : [ee, ee, ee, ee];
      L(new DOMRect(
        R.left - Ae + window.scrollX,
        R.top - de + window.scrollY,
        R.width + Ae + me,
        R.height + de + Ne
      ));
    } else
      L(null);
  }, [$, h, K, he]), d = ve(() => {
    if (!S || !w.current) return;
    const r = w.current.getBoundingClientRect(), R = K[h], ee = window.innerWidth, de = window.innerHeight;
    let me = 0, Ne = 0;
    const Ae = R.position || "auto", Se = window.scrollY, _e = window.scrollX, Ve = S.top - Se, N = S.left - _e, se = Ve + S.height, ke = N + S.width, xe = 16;
    if (Ae === "auto") {
      const u = de - se, oe = Ve, s = ee - ke;
      u >= r.height + xe ? (me = S.top + S.height + xe, Ne = S.left + (S.width - r.width) / 2) : oe >= r.height + xe ? (me = S.top - r.height - xe, Ne = S.left + (S.width - r.width) / 2) : s >= r.width + xe ? (me = S.top + (S.height - r.height) / 2, Ne = S.left + S.width + xe) : (me = S.top + (S.height - r.height) / 2, Ne = S.left - r.width - xe);
    } else
      switch (Ae) {
        case "bottom":
          me = S.top + S.height + xe, Ne = S.left + (S.width - r.width) / 2;
          break;
        case "top":
          me = S.top - r.height - xe, Ne = S.left + (S.width - r.width) / 2;
          break;
        case "right":
          me = S.top + (S.height - r.height) / 2, Ne = S.left + S.width + xe;
          break;
        case "left":
          me = S.top + (S.height - r.height) / 2, Ne = S.left - r.width - xe;
          break;
      }
    R.top !== void 0 && (me = R.top + Se), R.left !== void 0 && (Ne = R.left + _e), me = Math.max(Se + 16, Math.min(me, Se + de - r.height - 16)), Ne = Math.max(_e + 16, Math.min(Ne, _e + ee - r.width - 16)), P({ top: me, left: Ne });
  }, [S, h, K]);
  be(() => {
    le();
  }, [le]), be(() => {
    S && requestAnimationFrame(() => {
      d();
    });
  }, [S, d]), be(() => {
    if (!$) return;
    const m = () => {
      le();
    };
    return window.addEventListener("resize", m), window.addEventListener("scroll", m, !0), () => {
      window.removeEventListener("resize", m), window.removeEventListener("scroll", m, !0);
    };
  }, [$, le]);
  const f = ve(() => {
    if (h >= K.length - 1)
      W?.(h + 1), z(!1), ae(0);
    else {
      const m = h + 1;
      V?.(h + 1), H?.(m + 1), ae(m);
    }
  }, [h, K.length, W, V, H]);
  be(() => {
    if (!$ || h >= K.length) return;
    const m = K[h];
    if (m.event === "none" || !m.event) return;
    const r = m.eventEl || m.el, R = he(r);
    if (!R) return;
    const ee = () => {
      m.event === "click" && f();
    }, de = (me) => {
      m.event === "enter" && me.key === "Enter" && f();
    };
    return m.event === "click" ? R.addEventListener("click", ee, !0) : m.event === "enter" && R.addEventListener("keydown", de), () => {
      R.removeEventListener("click", ee, !0), R.removeEventListener("keydown", de);
    };
  }, [$, h, K, he, f]), be(() => {
    if (!(!$ || T <= 0 || h >= K.length))
      return F.current = setTimeout(() => {
        f();
      }, T), () => {
        F.current && clearTimeout(F.current);
      };
  }, [$, T, h, K.length, f]), be(() => {
    if (!$) return;
    const m = (r) => {
      r.key === "Escape" && E();
    };
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [$]);
  const k = ve(() => {
    if (h > 0) {
      const m = h - 1;
      J?.(h + 1), H?.(m + 1), ae(m);
    }
  }, [h, J, H]), E = ve(() => {
    I?.(h + 1), z(!1), ae(0);
  }, [h, I]), Z = ve(() => {
    j?.() !== !1 && (D?.(), ae(0), z(!0), te?.());
  }, [j, D, te]), p = ve(() => {
    W?.(h + 1), z(!1), ae(0);
  }, [h, W]), U = ve((m) => {
    const r = m !== void 0 ? Math.max(1, Math.min(m, K.length)) - 1 : 0;
    ae(r), z(!0), H?.(r + 1);
  }, [K.length, H]);
  if (We(n, () => ({
    start: Z,
    end: p,
    resume: U,
    getCurrentStep: () => h + 1,
    getSteps: () => [...K],
    setSteps: (m) => _(m),
    show: () => z(!0),
    hide: () => z(!1),
    isVisible: () => $
  }), [Z, p, U, h, K, $]), !$ || K.length === 0)
    return null;
  const ue = K[h], G = h === 0, Y = h === K.length - 1, ce = typeof x == "string" ? x : "Previous", ne = typeof A == "string" ? A : Y ? O : "Next", ie = x !== !1 && !G, M = A !== !1;
  return Tt(
    /* @__PURE__ */ g(
      "div",
      {
        id: i,
        "data-testid": o,
        className: `avakio-hint avakio-hint-theme-${y}`,
        children: [
          /* @__PURE__ */ e("div", { className: "avakio-hint-overlay", children: /* @__PURE__ */ g("svg", { className: "avakio-hint-mask", width: "100%", height: "100%", children: [
            /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ g("mask", { id: `avakio-hint-mask-${i || "default"}`, children: [
              /* @__PURE__ */ e("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "white" }),
              S && /* @__PURE__ */ e(
                "rect",
                {
                  x: S.left,
                  y: S.top,
                  width: S.width,
                  height: S.height,
                  rx: "8",
                  ry: "8",
                  fill: "black"
                }
              )
            ] }) }),
            /* @__PURE__ */ e(
              "rect",
              {
                x: "0",
                y: "0",
                width: "100%",
                height: "100%",
                fill: "rgba(0, 0, 0, 0.5)",
                mask: `url(#avakio-hint-mask-${i || "default"})`
              }
            )
          ] }) }),
          S && /* @__PURE__ */ e(
            "div",
            {
              className: "avakio-hint-highlight",
              style: {
                top: S.top,
                left: S.left,
                width: S.width,
                height: S.height
              }
            }
          ),
          /* @__PURE__ */ g(
            "div",
            {
              ref: w,
              className: "avakio-hint-popup",
              style: {
                top: t.top,
                left: t.left
              },
              children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    className: "avakio-hint-close",
                    onClick: E,
                    "aria-label": "Close hint",
                    children: "×"
                  }
                ),
                ue.title && /* @__PURE__ */ e("div", { className: "avakio-hint-title", children: ue.title }),
                ue.text && /* @__PURE__ */ e("div", { className: "avakio-hint-text", children: (typeof ue.text == "string", ue.text) }),
                /* @__PURE__ */ g("div", { className: "avakio-hint-footer", children: [
                  /* @__PURE__ */ g("div", { className: "avakio-hint-step-indicator", children: [
                    h + 1,
                    " / ",
                    K.length
                  ] }),
                  /* @__PURE__ */ g("div", { className: "avakio-hint-buttons", children: [
                    ie && /* @__PURE__ */ e(
                      "button",
                      {
                        className: "avakio-hint-btn avakio-hint-btn-prev",
                        onClick: k,
                        children: ce
                      }
                    ),
                    M && /* @__PURE__ */ e(
                      "button",
                      {
                        className: "avakio-hint-btn avakio-hint-btn-next",
                        onClick: f,
                        children: ne
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    ),
    document.body
  );
});
Tn.displayName = "AvakioHint";
function qt({
  children: a,
  className: n = "",
  css: i,
  width: o,
  height: l,
  minWidth: y,
  minHeight: x,
  maxWidth: A,
  maxHeight: O,
  borderless: T = !1,
  hidden: v = !1,
  disabled: D = !1,
  gravity: j,
  id: te,
  testId: W,
  animate: I = !1,
  padding: V,
  theme: J = "material",
  type: H = "clean",
  onShow: K,
  onHide: _,
  onResize: h,
  onClick: ae,
  onFocus: $,
  onBlur: z,
  onKeyPress: S
}) {
  const L = Ce(null), [t, P] = q(!v), [w, F] = q(!D), [he, le] = q({ width: 0, height: 0 });
  be(() => {
    P(!v);
  }, [v]), be(() => {
    F(!D);
  }, [D]), be(() => {
    if (!L.current) return;
    const ue = new ResizeObserver((G) => {
      for (const Y of G) {
        const { width: ce, height: ne } = Y.contentRect;
        le({ width: ce, height: ne }), h && h(ce, ne);
      }
    });
    return ue.observe(L.current), () => {
      ue.disconnect();
    };
  }, [h]), be(() => {
    t && K ? K() : !t && _ && _();
  }, [t, K, _]), ve(() => {
    P(!0);
  }, []), ve(() => {
    P(!1);
  }, []), ve(() => {
    F(!0);
  }, []), ve(() => {
    F(!1);
  }, []), ve((ue, G) => {
    L.current && (ue && (L.current.style.width = typeof ue == "number" ? `${ue}px` : ue), G && (L.current.style.height = typeof G == "number" ? `${G}px` : G));
  }, []);
  const d = {
    ...i && typeof i == "object" && !Array.isArray(i) ? i : {},
    ...typeof o < "u" && { width: typeof o == "number" ? `${o}px` : o },
    ...typeof l < "u" && { height: typeof l == "number" ? `${l}px` : l },
    ...typeof y < "u" && { minWidth: typeof y == "number" ? `${y}px` : y },
    ...typeof x < "u" && { minHeight: typeof x == "number" ? `${x}px` : x },
    ...typeof A < "u" && { maxWidth: typeof A == "number" ? `${A}px` : A },
    ...typeof O < "u" && { maxHeight: typeof O == "number" ? `${O}px` : O },
    ...typeof V < "u" && {
      padding: Array.isArray(V) ? `${V[0]}px ${V[1]}px ${V[2]}px ${V[3]}px` : typeof V == "number" ? `${V}px` : V
    },
    ...typeof j < "u" && { flex: j }
  }, f = () => I ? I === !0 || I === "fade" ? "avakio-view-animate-fade" : I === "slide" ? "avakio-view-animate-slide" : I === "flip" ? "avakio-view-animate-flip" : "" : "", k = [
    "avakio-view",
    `avakio-view-theme-${J}`,
    H ? `avakio-view-type-${H}` : "",
    T ? "avakio-view-borderless" : "",
    t ? "" : "avakio-view-hidden",
    w ? "" : "avakio-view-disabled",
    f(),
    n
  ].filter(Boolean).join(" "), E = ve(() => {
    $ && w && $();
  }, [$, w]), Z = ve(() => {
    z && w && z();
  }, [z, w]), p = ve(
    (ue) => {
      ae && w && ae(ue);
    },
    [ae, w]
  ), U = ve(
    (ue) => {
      S && w && S(ue);
    },
    [S, w]
  );
  return t ? /* @__PURE__ */ e(
    "div",
    {
      ref: L,
      id: te,
      "data-testid": W,
      className: k,
      style: d,
      onClick: p,
      onFocus: E,
      onBlur: Z,
      onKeyDown: U,
      tabIndex: w ? 0 : -1,
      role: "region",
      "aria-disabled": !w,
      children: a
    }
  ) : null;
}
const Rn = Pe.forwardRef(
  (a, n) => {
    const i = Ce(null), [o, l] = q(!a.hidden), [y, x] = q(!a.disabled);
    return Pe.useImperativeHandle(n, () => ({
      show: () => l(!0),
      hide: () => l(!1),
      enable: () => x(!0),
      disable: () => x(!1),
      resize: (A, O) => {
        i.current && (A && (i.current.style.width = typeof A == "number" ? `${A}px` : A), O && (i.current.style.height = typeof O == "number" ? `${O}px` : O));
      },
      getNode: () => i.current,
      isVisible: () => o,
      isEnabled: () => y
    })), /* @__PURE__ */ e(qt, { ...a, hidden: !o, disabled: !y });
  }
);
Rn.displayName = "AvakioViewWithRef";
const On = ({
  id: a,
  testId: n,
  showLabel: i = !0,
  showTitle: o = !0,
  showSubTitle: l = !0,
  label: y = "",
  title: x = "",
  subTitle: A = "",
  theme: O,
  className: T = "",
  style: v = {},
  isSticky: D = !0
}) => {
  const te = {
    style: D ? { position: "sticky", top: 0, zIndex: 1e3 } : {}
  };
  return O && (te["data-admin-theme"] = O), /* @__PURE__ */ e("div", { ...te, children: /* @__PURE__ */ e(
    qt,
    {
      theme: O,
      type: "header",
      borderless: !1,
      id: a,
      testId: n,
      css: {
        ...v,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        background: "var(--view-focus-color)",
        color: "#ffffff"
      },
      className: T,
      children: /* @__PURE__ */ g("div", { style: { textAlign: "left" }, children: [
        i && y && /* @__PURE__ */ e("div", { style: {
          margin: 0,
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "1.5",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          color: "inherit"
        }, children: y }),
        o && x && /* @__PURE__ */ e("h1", { style: {
          margin: 0,
          fontSize: "24px",
          fontWeight: 600,
          letterSpacing: "0.01em",
          lineHeight: "1.2",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          WebkitFontSmoothing: "antialiased",
          color: "inherit"
        }, children: x }),
        l && A && /* @__PURE__ */ e("p", { style: {
          margin: 0,
          marginTop: "8px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "1.5",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          color: "inherit"
        }, children: A })
      ] })
    }
  ) });
};
On.displayName = "AvakioViewHeader";
function zn(a) {
  return {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top"
  }[a];
}
const Pn = He(
  ({
    id: a,
    testId: n,
    cells: i,
    activeView: o,
    animate: l = !0,
    keepViews: y = !1,
    fitBiggest: x = !1,
    theme: A = "material",
    className: O,
    css: T,
    width: v,
    height: D,
    onViewChange: j,
    onViewShow: te,
    onBeforeBack: W
  }, I) => {
    let V = "slide", J = 300, H = "left", K = "horizontal";
    typeof l == "object" && l !== null ? (V = l.type ?? "slide", J = l.duration ?? 300, H = l.direction ?? "left", K = l.flipDirection ?? "horizontal") : typeof l == "boolean" && (V = l ? "slide" : "none"), ["slide", "flip", "none"].includes(V) || (V = "slide"), J = Math.max(J, 200);
    const _ = {
      type: V,
      duration: J,
      direction: H,
      flipDirection: K
    }, [h, ae] = q(i), [$, z] = q(
      o || i[0]?.id || ""
    ), [S, L] = q(null), [t, P] = q(!1), [w, F] = q(
      _.direction || "left"
    ), [he, le] = q(!1), d = Ce([o || i[0]?.id || ""]), f = Ce(null), k = Ce(i), E = Ce(o || i[0]?.id || ""), Z = Ce(!1), p = Ce(null), U = Ce(_);
    be(() => {
      U.current = _;
    }, [_.type, _.direction, _.duration]), be(() => {
      ae(i), k.current = i;
    }, [i]), be(() => {
      k.current = h;
    }, [h]), be(() => {
      E.current = $;
    }, [$]), be(() => () => {
      p.current && clearTimeout(p.current);
    }, []);
    const ue = (M, m) => {
      const r = E.current;
      if (M === r || Z.current || !k.current.find((ee) => ee.id === M)) return;
      const R = r;
      p.current && clearTimeout(p.current), d.current.push(M), F(m), L(R), z(M), E.current = M, P(!0), Z.current = !0, j?.(M, R), te?.(M), p.current = setTimeout(() => {
        P(!1), Z.current = !1, L(null);
      }, J);
    };
    We(I, () => ({
      getValue: () => E.current,
      getActiveId: () => E.current,
      setValue: (M) => {
        ue(M, U.current.direction || "left");
      },
      back: () => {
        if (d.current.length <= 1) return !1;
        const M = E.current;
        if (W?.(M) === !1) return !1;
        d.current.pop();
        const r = d.current[d.current.length - 1];
        if (r) {
          p.current && clearTimeout(p.current);
          const R = M, ee = zn(U.current.direction || "left");
          return F(ee), L(R), z(r), E.current = r, P(!0), Z.current = !0, j?.(r, R), te?.(r), p.current = setTimeout(() => {
            P(!1), Z.current = !1, L(null);
          }, J), !0;
        }
        return !1;
      },
      addView: (M, m) => {
        if (!k.current.find((r) => r.id === M.id)) {
          if (m !== void 0) {
            const r = [...k.current];
            r.splice(m, 0, M), k.current = r;
          } else
            k.current = [...k.current, M];
          ae([...k.current]);
        }
      },
      removeView: (M) => {
        if (M === E.current) return !1;
        const m = k.current.filter((r) => r.id !== M);
        return k.current = m, ae(m), d.current = d.current.filter((r) => r !== M), !0;
      },
      getViews: () => k.current.map((M) => M.id),
      hasView: (M) => k.current.some((m) => m.id === M),
      getHistory: () => [...d.current],
      clearHistory: () => {
        d.current = [E.current];
      },
      show: () => le(!1),
      hide: () => le(!0),
      isVisible: () => !he
    }));
    const G = [
      "avakio-multiview",
      `avakio-multiview-theme-${A}`,
      `avakio-multiview-animate-${_.type}`,
      _.type === "flip" && `avakio-multiview-flip-${_.flipDirection}`,
      x && "avakio-multiview-fit-biggest",
      t && "avakio-multiview-animating",
      he && "avakio-multiview-hidden",
      O
    ].filter(Boolean).join(" "), Y = {
      ...T && typeof T == "object" && !Array.isArray(T) ? T : {},
      width: v,
      height: D,
      "--animation-duration": `${J}ms`
    }, ce = k.current, ne = $, ie = y ? ce : ce.filter(
      (M) => M.id === ne || t && M.id === S
    );
    return /* @__PURE__ */ e(
      "div",
      {
        ref: f,
        id: a,
        "data-testid": n,
        className: G,
        style: Y,
        children: /* @__PURE__ */ e("div", { className: "avakio-multiview-cells", children: ie.map((M) => {
          const m = M.id === ne, r = t && M.id === S, R = t && m, ee = [
            "avakio-multiview-cell",
            m && !R && "avakio-multiview-cell-active",
            R && `avakio-multiview-cell-entering-${w}`,
            r && `avakio-multiview-cell-leaving-${w}`,
            !m && !r && "avakio-multiview-cell-hidden",
            M.className
          ].filter(Boolean).join(" "), de = { ...M.css };
          return (R || r) && (de.animationDuration = `${J}ms`, de.animationTimingFunction = "ease-out", de.animationFillMode = "both", de.animationPlayState = "running"), /* @__PURE__ */ e(
            "div",
            {
              "data-view-id": M.id,
              className: ee,
              style: de,
              children: M.content
            },
            M.id
          );
        }) })
      }
    );
  }
);
Pn.displayName = "AvakioMultiview";
const Fn = He(
  ({
    template: a,
    data: n = {},
    content: i,
    url: o,
    theme: l = "material",
    borderType: y = "space",
    type: x = "clean",
    borderless: A = !1,
    autoheight: O = !1,
    scroll: T = !1,
    width: v,
    height: D,
    minWidth: j,
    minHeight: te,
    maxWidth: W,
    maxHeight: I,
    padding: V,
    margin: J,
    className: H = "",
    css: K,
    hidden: _ = !1,
    disabled: h = !1,
    id: ae,
    testId: $,
    onLoad: z,
    onChange: S,
    onClick: L
  }, t) => {
    const [P, w] = q(n), [F, he] = q(i), [le, d] = q(""), [f, k] = q(_), [E, Z] = q(h), [p, U] = q(""), ue = Ce(null), G = Ce(z);
    be(() => {
      G.current = z;
    }, [z]), be(() => {
      k(_);
    }, [_]), be(() => {
      Z(h);
    }, [h]), be(() => {
      o && fetch(o).then((r) => r.text()).then((r) => {
        U(r), G.current?.();
      }).catch((r) => console.error("Failed to load template from URL:", r));
    }, [o]);
    const Y = Ce(JSON.stringify(n));
    be(() => {
      const r = JSON.stringify(n);
      r !== Y.current && (Y.current = r, w(n));
    }, [n]);
    const ce = Ce(i);
    be(() => {
      i !== ce.current && (ce.current = i, he(i));
    }, [i]);
    const ne = (r, R) => r.replace(/#(\w+)#/g, (ee, de) => R[de] !== void 0 ? String(R[de]) : ee), ie = () => {
      if (le)
        return /* @__PURE__ */ e("div", { dangerouslySetInnerHTML: { __html: le } });
      if (p)
        return /* @__PURE__ */ e("div", { dangerouslySetInnerHTML: { __html: ne(p, P) } });
      if (typeof a == "function")
        return a(P);
      if (typeof a == "string") {
        const r = ne(a, P);
        return /* @__PURE__ */ e("div", { dangerouslySetInnerHTML: { __html: r } });
      }
      return F || null;
    };
    We(t, () => ({
      setValues: (r) => {
        w(r), S?.(r);
      },
      getValues: () => P,
      setHTML: (r) => {
        d(r);
      },
      getHTML: () => ue.current?.innerHTML || "",
      refresh: () => {
        w({ ...P });
      },
      parse: (r) => {
        w(r), S?.(r);
      },
      show: () => {
        k(!1);
      },
      hide: () => {
        k(!0);
      },
      enable: () => {
        Z(!1);
      },
      disable: () => {
        Z(!0);
      },
      getNode: () => ue.current
    }));
    const M = [
      "avakio-template",
      `avakio-template-theme-${l}`,
      `avakio-template-border-${y}`,
      `avakio-template-type-${x}`,
      A ? "avakio-template-borderless" : "",
      O ? "avakio-template-autoheight" : "",
      T === !0 || T === "xy" ? "avakio-template-scroll-xy" : "",
      T === "x" ? "avakio-template-scroll-x" : "",
      T === "y" ? "avakio-template-scroll-y" : "",
      f ? "avakio-template-hidden" : "",
      E ? "avakio-template-disabled" : "",
      H
    ].filter(Boolean).join(" "), m = {
      width: typeof v == "number" ? `${v}px` : v,
      height: typeof D == "number" ? `${D}px` : D,
      minWidth: typeof j == "number" ? `${j}px` : j,
      minHeight: typeof te == "number" ? `${te}px` : te,
      maxWidth: typeof W == "number" ? `${W}px` : W,
      maxHeight: typeof I == "number" ? `${I}px` : I,
      padding: Array.isArray(V) ? `${V[0]}px ${V[1]}px ${V[2]}px ${V[3]}px` : typeof V == "number" ? `${V}px` : V,
      margin: Array.isArray(J) ? `${J[0]}px ${J[1]}px ${J[2]}px ${J[3]}px` : typeof J == "number" ? `${J}px` : J,
      ...K && typeof K == "object" && !Array.isArray(K) ? K : {}
    };
    return /* @__PURE__ */ e(
      "div",
      {
        ref: ue,
        id: ae,
        "data-testid": $,
        className: M,
        style: m,
        onClick: L,
        children: /* @__PURE__ */ e("div", { className: "avakio-template-content", children: ie() })
      }
    );
  }
);
Fn.displayName = "AvakioTemplate";
export {
  rn as AvakioAbsoluteLayout,
  kn as AvakioAccordion,
  ns as AvakioBulletGraph,
  Ha as AvakioButton,
  Ja as AvakioCalendar,
  bn as AvakioCarousel,
  $n as AvakioChart,
  Ba as AvakioCheckbox,
  ja as AvakioColorPicker,
  Wa as AvakioCombo,
  Qa as AvakioComment,
  Ka as AvakioCounter,
  Sn as AvakioDashboard,
  Jn as AvakioDataTable,
  gt as AvakioDatePicker,
  qa as AvakioDateRangePicker,
  ts as AvakioDoubleList,
  An as AvakioExcelViewer,
  on as AvakioFieldset,
  En as AvakioForm,
  rs as AvakioFormField,
  is as AvakioGage,
  ls as AvakioGoogleMap,
  Wt as AvakioGrid,
  Ya as AvakioGridSuggest,
  cs as AvakioGroupList,
  Tn as AvakioHint,
  ln as AvakioLabel,
  Qn as AvakioLayout,
  Ua as AvakioMultiCombo,
  dn as AvakioMultitext,
  Pn as AvakioMultiview,
  Ut as AvakioPopup,
  Kn as AvakioPortletBoard,
  Yn as AvakioProperty,
  hn as AvakioRadio,
  es as AvakioResizer,
  Ga as AvakioRichSelect,
  qn as AvakioRichSelectAPI,
  Un as AvakioScheduler,
  fn as AvakioSegmentedButton,
  Gn as AvakioSidebar,
  Xn as AvakioSidebarToggleButton,
  Xa as AvakioSlider,
  vn as AvakioSwitchButton,
  as as AvakioTabBar,
  Fn as AvakioTemplate,
  mn as AvakioText,
  Zn as AvakioTimeline,
  pn as AvakioToggleButton,
  sn as AvakioTree,
  qt as AvakioView,
  On as AvakioViewHeader,
  Rn as AvakioViewWithRef,
  ss as FormRules,
  Wn as avakioPortletThemes,
  os as avakioThemes,
  Mn as useFormContext
};
//# sourceMappingURL=avakio-ui-components.js.map
