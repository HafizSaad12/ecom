var pt = "top",
    xt = "bottom",
    Ct = "right",
    ht = "left",
    Mn = "auto",
    Ri = [pt, xt, Ct, ht],
    _i = "start",
    Di = "end",
    hs = "clippingParents",
    $r = "viewport",
    ki = "popper",
    gs = "reference",
    Sr = Ri.reduce(function(c, i) {
        return c.concat([i + "-" + _i, i + "-" + Di])
    }, []),
    Pr = [].concat(Ri, [Mn]).reduce(function(c, i) {
        return c.concat([i, i + "-" + _i, i + "-" + Di])
    }, []),
    ms = "beforeRead",
    vs = "read",
    ys = "afterRead",
    bs = "beforeMain",
    _s = "main",
    ws = "afterMain",
    Ts = "beforeWrite",
    Es = "write",
    Ss = "afterWrite",
    xs = [ms, vs, ys, bs, _s, ws, Ts, Es, Ss];

function zt(c) {
    return c ? (c.nodeName || "").toLowerCase() : null
}

function At(c) {
    if (c == null) return window;
    if (c.toString() !== "[object Window]") {
        var i = c.ownerDocument;
        return i && i.defaultView || window
    }
    return c
}

function wi(c) {
    var i = At(c).Element;
    return c instanceof i || c instanceof Element
}

function Dt(c) {
    var i = At(c).HTMLElement;
    return c instanceof i || c instanceof HTMLElement
}

function Ir(c) {
    if (typeof ShadowRoot > "u") return !1;
    var i = At(c).ShadowRoot;
    return c instanceof i || c instanceof ShadowRoot
}

function cl(c) {
    var i = c.state;
    Object.keys(i.elements).forEach(function(o) {
        var u = i.styles[o] || {},
            t = i.attributes[o] || {},
            r = i.elements[o];
        !Dt(r) || !zt(r) || (Object.assign(r.style, u), Object.keys(t).forEach(function(f) {
            var h = t[f];
            h === !1 ? r.removeAttribute(f) : r.setAttribute(f, h === !0 ? "" : h)
        }))
    })
}

function ul(c) {
    var i = c.state,
        o = {
            popper: {
                position: i.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
    return Object.assign(i.elements.popper.style, o.popper), i.styles = o, i.elements.arrow && Object.assign(i.elements.arrow.style, o.arrow),
        function() {
            Object.keys(i.elements).forEach(function(u) {
                var t = i.elements[u],
                    r = i.attributes[u] || {},
                    f = Object.keys(i.styles.hasOwnProperty(u) ? i.styles[u] : o[u]),
                    h = f.reduce(function(m, w) {
                        return m[w] = "", m
                    }, {});
                !Dt(t) || !zt(t) || (Object.assign(t.style, h), Object.keys(r).forEach(function(m) {
                    t.removeAttribute(m)
                }))
            })
        }
}
const Mr = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: cl,
    effect: ul,
    requires: ["computeStyles"]
};

function Wt(c) {
    return c.split("-")[0]
}
var bi = Math.max,
    Ln = Math.min,
    $i = Math.round;

function xr() {
    var c = navigator.userAgentData;
    return c != null && c.brands && Array.isArray(c.brands) ? c.brands.map(function(i) {
        return i.brand + "/" + i.version
    }).join(" ") : navigator.userAgent
}

function Cs() {
    return !/^((?!chrome|android).)*safari/i.test(xr())
}

function Pi(c, i, o) {
    i === void 0 && (i = !1), o === void 0 && (o = !1);
    var u = c.getBoundingClientRect(),
        t = 1,
        r = 1;
    i && Dt(c) && (t = c.offsetWidth > 0 && $i(u.width) / c.offsetWidth || 1, r = c.offsetHeight > 0 && $i(u.height) / c.offsetHeight || 1);
    var f = wi(c) ? At(c) : window,
        h = f.visualViewport,
        m = !Cs() && o,
        w = (u.left + (m && h ? h.offsetLeft : 0)) / t,
        S = (u.top + (m && h ? h.offsetTop : 0)) / r,
        I = u.width / t,
        N = u.height / r;
    return {
        width: I,
        height: N,
        top: S,
        right: w + I,
        bottom: S + N,
        left: w,
        x: w,
        y: S
    }
}

function Hr(c) {
    var i = Pi(c),
        o = c.offsetWidth,
        u = c.offsetHeight;
    return Math.abs(i.width - o) <= 1 && (o = i.width), Math.abs(i.height - u) <= 1 && (u = i.height), {
        x: c.offsetLeft,
        y: c.offsetTop,
        width: o,
        height: u
    }
}

function As(c, i) {
    var o = i.getRootNode && i.getRootNode();
    if (c.contains(i)) return !0;
    if (o && Ir(o)) {
        var u = i;
        do {
            if (u && c.isSameNode(u)) return !0;
            u = u.parentNode || u.host
        } while (u)
    }
    return !1
}

function Gt(c) {
    return At(c).getComputedStyle(c)
}

function fl(c) {
    return ["table", "td", "th"].indexOf(zt(c)) >= 0
}

function ai(c) {
    return ((wi(c) ? c.ownerDocument : c.document) || window.document).documentElement
}

function Hn(c) {
    return zt(c) === "html" ? c : c.assignedSlot || c.parentNode || (Ir(c) ? c.host : null) || ai(c)
}

function No(c) {
    return !Dt(c) || Gt(c).position === "fixed" ? null : c.offsetParent
}

function dl(c) {
    var i = /firefox/i.test(xr()),
        o = /Trident/i.test(xr());
    if (o && Dt(c)) {
        var u = Gt(c);
        if (u.position === "fixed") return null
    }
    var t = Hn(c);
    for (Ir(t) && (t = t.host); Dt(t) && ["html", "body"].indexOf(zt(t)) < 0;) {
        var r = Gt(t);
        if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || i && r.willChange === "filter" || i && r.filter && r.filter !== "none") return t;
        t = t.parentNode
    }
    return null
}

function sn(c) {
    for (var i = At(c), o = No(c); o && fl(o) && Gt(o).position === "static";) o = No(o);
    return o && (zt(o) === "html" || zt(o) === "body" && Gt(o).position === "static") ? i : o || dl(c) || i
}

function jr(c) {
    return ["top", "bottom"].indexOf(c) >= 0 ? "x" : "y"
}

function nn(c, i, o) {
    return bi(c, Ln(i, o))
}

function pl(c, i, o) {
    var u = nn(c, i, o);
    return u > o ? o : u
}

function ks() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

function Os(c) {
    return Object.assign({}, ks(), c)
}

function Ns(c, i) {
    return i.reduce(function(o, u) {
        return o[u] = c, o
    }, {})
}
var hl = function(i, o) {
    return i = typeof i == "function" ? i(Object.assign({}, o.rects, {
        placement: o.placement
    })) : i, Os(typeof i != "number" ? i : Ns(i, Ri))
};

function gl(c) {
    var i, o = c.state,
        u = c.name,
        t = c.options,
        r = o.elements.arrow,
        f = o.modifiersData.popperOffsets,
        h = Wt(o.placement),
        m = jr(h),
        w = [ht, Ct].indexOf(h) >= 0,
        S = w ? "height" : "width";
    if (!(!r || !f)) {
        var I = hl(t.padding, o),
            N = Hr(r),
            K = m === "y" ? pt : ht,
            D = m === "y" ? xt : Ct,
            A = o.rects.reference[S] + o.rects.reference[m] - f[m] - o.rects.popper[S],
            B = f[m] - o.rects.reference[m],
            R = sn(r),
            re = R ? m === "y" ? R.clientHeight || 0 : R.clientWidth || 0 : 0,
            ue = A / 2 - B / 2,
            se = I[K],
            ve = re - N[S] - I[D],
            l = re / 2 - N[S] / 2 + ue,
            xe = nn(se, l, ve),
            fe = m;
        o.modifiersData[u] = (i = {}, i[fe] = xe, i.centerOffset = xe - l, i)
    }
}

function ml(c) {
    var i = c.state,
        o = c.options,
        u = o.element,
        t = u === void 0 ? "[data-popper-arrow]" : u;
    t != null && (typeof t == "string" && (t = i.elements.popper.querySelector(t), !t) || As(i.elements.popper, t) && (i.elements.arrow = t))
}
const Ls = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: gl,
    effect: ml,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function Ii(c) {
    return c.split("-")[1]
}
var vl = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function yl(c, i) {
    var o = c.x,
        u = c.y,
        t = i.devicePixelRatio || 1;
    return {
        x: $i(o * t) / t || 0,
        y: $i(u * t) / t || 0
    }
}

function Lo(c) {
    var i, o = c.popper,
        u = c.popperRect,
        t = c.placement,
        r = c.variation,
        f = c.offsets,
        h = c.position,
        m = c.gpuAcceleration,
        w = c.adaptive,
        S = c.roundOffsets,
        I = c.isFixed,
        N = f.x,
        K = N === void 0 ? 0 : N,
        D = f.y,
        A = D === void 0 ? 0 : D,
        B = typeof S == "function" ? S({
            x: K,
            y: A
        }) : {
            x: K,
            y: A
        };
    K = B.x, A = B.y;
    var R = f.hasOwnProperty("x"),
        re = f.hasOwnProperty("y"),
        ue = ht,
        se = pt,
        ve = window;
    if (w) {
        var l = sn(o),
            xe = "clientHeight",
            fe = "clientWidth";
        if (l === At(o) && (l = ai(o), Gt(l).position !== "static" && h === "absolute" && (xe = "scrollHeight", fe = "scrollWidth")), l = l, t === pt || (t === ht || t === Ct) && r === Di) {
            se = xt;
            var _e = I && l === ve && ve.visualViewport ? ve.visualViewport.height : l[xe];
            A -= _e - u.height, A *= m ? 1 : -1
        }
        if (t === ht || (t === pt || t === xt) && r === Di) {
            ue = Ct;
            var we = I && l === ve && ve.visualViewport ? ve.visualViewport.width : l[fe];
            K -= we - u.width, K *= m ? 1 : -1
        }
    }
    var ee = Object.assign({
            position: h
        }, w && vl),
        X = S === !0 ? yl({
            x: K,
            y: A
        }, At(o)) : {
            x: K,
            y: A
        };
    if (K = X.x, A = X.y, m) {
        var ae;
        return Object.assign({}, ee, (ae = {}, ae[se] = re ? "0" : "", ae[ue] = R ? "0" : "", ae.transform = (ve.devicePixelRatio || 1) <= 1 ? "translate(" + K + "px, " + A + "px)" : "translate3d(" + K + "px, " + A + "px, 0)", ae))
    }
    return Object.assign({}, ee, (i = {}, i[se] = re ? A + "px" : "", i[ue] = R ? K + "px" : "", i.transform = "", i))
}

function bl(c) {
    var i = c.state,
        o = c.options,
        u = o.gpuAcceleration,
        t = u === void 0 ? !0 : u,
        r = o.adaptive,
        f = r === void 0 ? !0 : r,
        h = o.roundOffsets,
        m = h === void 0 ? !0 : h,
        w = {
            placement: Wt(i.placement),
            variation: Ii(i.placement),
            popper: i.elements.popper,
            popperRect: i.rects.popper,
            gpuAcceleration: t,
            isFixed: i.options.strategy === "fixed"
        };
    i.modifiersData.popperOffsets != null && (i.styles.popper = Object.assign({}, i.styles.popper, Lo(Object.assign({}, w, {
        offsets: i.modifiersData.popperOffsets,
        position: i.options.strategy,
        adaptive: f,
        roundOffsets: m
    })))), i.modifiersData.arrow != null && (i.styles.arrow = Object.assign({}, i.styles.arrow, Lo(Object.assign({}, w, {
        offsets: i.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: m
    })))), i.attributes.popper = Object.assign({}, i.attributes.popper, {
        "data-popper-placement": i.placement
    })
}
const Rr = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: bl,
    data: {}
};
var wn = {
    passive: !0
};

function _l(c) {
    var i = c.state,
        o = c.instance,
        u = c.options,
        t = u.scroll,
        r = t === void 0 ? !0 : t,
        f = u.resize,
        h = f === void 0 ? !0 : f,
        m = At(i.elements.popper),
        w = [].concat(i.scrollParents.reference, i.scrollParents.popper);
    return r && w.forEach(function(S) {
            S.addEventListener("scroll", o.update, wn)
        }), h && m.addEventListener("resize", o.update, wn),
        function() {
            r && w.forEach(function(S) {
                S.removeEventListener("scroll", o.update, wn)
            }), h && m.removeEventListener("resize", o.update, wn)
        }
}
const Wr = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: _l,
    data: {}
};
var wl = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};

function kn(c) {
    return c.replace(/left|right|bottom|top/g, function(i) {
        return wl[i]
    })
}
var Tl = {
    start: "end",
    end: "start"
};

function Do(c) {
    return c.replace(/start|end/g, function(i) {
        return Tl[i]
    })
}

function qr(c) {
    var i = At(c),
        o = i.pageXOffset,
        u = i.pageYOffset;
    return {
        scrollLeft: o,
        scrollTop: u
    }
}

function zr(c) {
    return Pi(ai(c)).left + qr(c).scrollLeft
}

function El(c, i) {
    var o = At(c),
        u = ai(c),
        t = o.visualViewport,
        r = u.clientWidth,
        f = u.clientHeight,
        h = 0,
        m = 0;
    if (t) {
        r = t.width, f = t.height;
        var w = Cs();
        (w || !w && i === "fixed") && (h = t.offsetLeft, m = t.offsetTop)
    }
    return {
        width: r,
        height: f,
        x: h + zr(c),
        y: m
    }
}

function Sl(c) {
    var i, o = ai(c),
        u = qr(c),
        t = (i = c.ownerDocument) == null ? void 0 : i.body,
        r = bi(o.scrollWidth, o.clientWidth, t ? t.scrollWidth : 0, t ? t.clientWidth : 0),
        f = bi(o.scrollHeight, o.clientHeight, t ? t.scrollHeight : 0, t ? t.clientHeight : 0),
        h = -u.scrollLeft + zr(c),
        m = -u.scrollTop;
    return Gt(t || o).direction === "rtl" && (h += bi(o.clientWidth, t ? t.clientWidth : 0) - r), {
        width: r,
        height: f,
        x: h,
        y: m
    }
}

function Fr(c) {
    var i = Gt(c),
        o = i.overflow,
        u = i.overflowX,
        t = i.overflowY;
    return /auto|scroll|overlay|hidden/.test(o + t + u)
}

function Ds(c) {
    return ["html", "body", "#document"].indexOf(zt(c)) >= 0 ? c.ownerDocument.body : Dt(c) && Fr(c) ? c : Ds(Hn(c))
}

function rn(c, i) {
    var o;
    i === void 0 && (i = []);
    var u = Ds(c),
        t = u === ((o = c.ownerDocument) == null ? void 0 : o.body),
        r = At(u),
        f = t ? [r].concat(r.visualViewport || [], Fr(u) ? u : []) : u,
        h = i.concat(f);
    return t ? h : h.concat(rn(Hn(f)))
}

function Cr(c) {
    return Object.assign({}, c, {
        left: c.x,
        top: c.y,
        right: c.x + c.width,
        bottom: c.y + c.height
    })
}

function xl(c, i) {
    var o = Pi(c, !1, i === "fixed");
    return o.top = o.top + c.clientTop, o.left = o.left + c.clientLeft, o.bottom = o.top + c.clientHeight, o.right = o.left + c.clientWidth, o.width = c.clientWidth, o.height = c.clientHeight, o.x = o.left, o.y = o.top, o
}

function $o(c, i, o) {
    return i === $r ? Cr(El(c, o)) : wi(i) ? xl(i, o) : Cr(Sl(ai(c)))
}

function Cl(c) {
    var i = rn(Hn(c)),
        o = ["absolute", "fixed"].indexOf(Gt(c).position) >= 0,
        u = o && Dt(c) ? sn(c) : c;
    return wi(u) ? i.filter(function(t) {
        return wi(t) && As(t, u) && zt(t) !== "body"
    }) : []
}

function Al(c, i, o, u) {
    var t = i === "clippingParents" ? Cl(c) : [].concat(i),
        r = [].concat(t, [o]),
        f = r[0],
        h = r.reduce(function(m, w) {
            var S = $o(c, w, u);
            return m.top = bi(S.top, m.top), m.right = Ln(S.right, m.right), m.bottom = Ln(S.bottom, m.bottom), m.left = bi(S.left, m.left), m
        }, $o(c, f, u));
    return h.width = h.right - h.left, h.height = h.bottom - h.top, h.x = h.left, h.y = h.top, h
}

function $s(c) {
    var i = c.reference,
        o = c.element,
        u = c.placement,
        t = u ? Wt(u) : null,
        r = u ? Ii(u) : null,
        f = i.x + i.width / 2 - o.width / 2,
        h = i.y + i.height / 2 - o.height / 2,
        m;
    switch (t) {
        case pt:
            m = {
                x: f,
                y: i.y - o.height
            };
            break;
        case xt:
            m = {
                x: f,
                y: i.y + i.height
            };
            break;
        case Ct:
            m = {
                x: i.x + i.width,
                y: h
            };
            break;
        case ht:
            m = {
                x: i.x - o.width,
                y: h
            };
            break;
        default:
            m = {
                x: i.x,
                y: i.y
            }
    }
    var w = t ? jr(t) : null;
    if (w != null) {
        var S = w === "y" ? "height" : "width";
        switch (r) {
            case _i:
                m[w] = m[w] - (i[S] / 2 - o[S] / 2);
                break;
            case Di:
                m[w] = m[w] + (i[S] / 2 - o[S] / 2);
                break
        }
    }
    return m
}

function Mi(c, i) {
    i === void 0 && (i = {});
    var o = i,
        u = o.placement,
        t = u === void 0 ? c.placement : u,
        r = o.strategy,
        f = r === void 0 ? c.strategy : r,
        h = o.boundary,
        m = h === void 0 ? hs : h,
        w = o.rootBoundary,
        S = w === void 0 ? $r : w,
        I = o.elementContext,
        N = I === void 0 ? ki : I,
        K = o.altBoundary,
        D = K === void 0 ? !1 : K,
        A = o.padding,
        B = A === void 0 ? 0 : A,
        R = Os(typeof B != "number" ? B : Ns(B, Ri)),
        re = N === ki ? gs : ki,
        ue = c.rects.popper,
        se = c.elements[D ? re : N],
        ve = Al(wi(se) ? se : se.contextElement || ai(c.elements.popper), m, S, f),
        l = Pi(c.elements.reference),
        xe = $s({
            reference: l,
            element: ue,
            strategy: "absolute",
            placement: t
        }),
        fe = Cr(Object.assign({}, ue, xe)),
        _e = N === ki ? fe : l,
        we = {
            top: ve.top - _e.top + R.top,
            bottom: _e.bottom - ve.bottom + R.bottom,
            left: ve.left - _e.left + R.left,
            right: _e.right - ve.right + R.right
        },
        ee = c.modifiersData.offset;
    if (N === ki && ee) {
        var X = ee[t];
        Object.keys(we).forEach(function(ae) {
            var ne = [Ct, xt].indexOf(ae) >= 0 ? 1 : -1,
                Ce = [pt, xt].indexOf(ae) >= 0 ? "y" : "x";
            we[ae] += X[Ce] * ne
        })
    }
    return we
}

function kl(c, i) {
    i === void 0 && (i = {});
    var o = i,
        u = o.placement,
        t = o.boundary,
        r = o.rootBoundary,
        f = o.padding,
        h = o.flipVariations,
        m = o.allowedAutoPlacements,
        w = m === void 0 ? Pr : m,
        S = Ii(u),
        I = S ? h ? Sr : Sr.filter(function(D) {
            return Ii(D) === S
        }) : Ri,
        N = I.filter(function(D) {
            return w.indexOf(D) >= 0
        });
    N.length === 0 && (N = I);
    var K = N.reduce(function(D, A) {
        return D[A] = Mi(c, {
            placement: A,
            boundary: t,
            rootBoundary: r,
            padding: f
        })[Wt(A)], D
    }, {});
    return Object.keys(K).sort(function(D, A) {
        return K[D] - K[A]
    })
}

function Ol(c) {
    if (Wt(c) === Mn) return [];
    var i = kn(c);
    return [Do(c), i, Do(i)]
}

function Nl(c) {
    var i = c.state,
        o = c.options,
        u = c.name;
    if (!i.modifiersData[u]._skip) {
        for (var t = o.mainAxis, r = t === void 0 ? !0 : t, f = o.altAxis, h = f === void 0 ? !0 : f, m = o.fallbackPlacements, w = o.padding, S = o.boundary, I = o.rootBoundary, N = o.altBoundary, K = o.flipVariations, D = K === void 0 ? !0 : K, A = o.allowedAutoPlacements, B = i.options.placement, R = Wt(B), re = R === B, ue = m || (re || !D ? [kn(B)] : Ol(B)), se = [B].concat(ue).reduce(function(Re, Ue) {
                return Re.concat(Wt(Ue) === Mn ? kl(i, {
                    placement: Ue,
                    boundary: S,
                    rootBoundary: I,
                    padding: w,
                    flipVariations: D,
                    allowedAutoPlacements: A
                }) : Ue)
            }, []), ve = i.rects.reference, l = i.rects.popper, xe = new Map, fe = !0, _e = se[0], we = 0; we < se.length; we++) {
            var ee = se[we],
                X = Wt(ee),
                ae = Ii(ee) === _i,
                ne = [pt, xt].indexOf(X) >= 0,
                Ce = ne ? "width" : "height",
                Ae = Mi(i, {
                    placement: ee,
                    boundary: S,
                    rootBoundary: I,
                    altBoundary: N,
                    padding: w
                }),
                $e = ne ? ae ? Ct : ht : ae ? xt : pt;
            ve[Ce] > l[Ce] && ($e = kn($e));
            var et = kn($e),
                Ye = [];
            if (r && Ye.push(Ae[X] <= 0), h && Ye.push(Ae[$e] <= 0, Ae[et] <= 0), Ye.every(function(Re) {
                    return Re
                })) {
                _e = ee, fe = !1;
                break
            }
            xe.set(ee, Ye)
        }
        if (fe)
            for (var rt = D ? 3 : 1, Ie = function(Ue) {
                    var tt = se.find(function(We) {
                        var De = xe.get(We);
                        if (De) return De.slice(0, Ue).every(function(He) {
                            return He
                        })
                    });
                    if (tt) return _e = tt, "break"
                }, Le = rt; Le > 0; Le--) {
                var Ke = Ie(Le);
                if (Ke === "break") break
            }
        i.placement !== _e && (i.modifiersData[u]._skip = !0, i.placement = _e, i.reset = !0)
    }
}
const Ps = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: Nl,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function Po(c, i, o) {
    return o === void 0 && (o = {
        x: 0,
        y: 0
    }), {
        top: c.top - i.height - o.y,
        right: c.right - i.width + o.x,
        bottom: c.bottom - i.height + o.y,
        left: c.left - i.width - o.x
    }
}

function Io(c) {
    return [pt, Ct, xt, ht].some(function(i) {
        return c[i] >= 0
    })
}

function Ll(c) {
    var i = c.state,
        o = c.name,
        u = i.rects.reference,
        t = i.rects.popper,
        r = i.modifiersData.preventOverflow,
        f = Mi(i, {
            elementContext: "reference"
        }),
        h = Mi(i, {
            altBoundary: !0
        }),
        m = Po(f, u),
        w = Po(h, t, r),
        S = Io(m),
        I = Io(w);
    i.modifiersData[o] = {
        referenceClippingOffsets: m,
        popperEscapeOffsets: w,
        isReferenceHidden: S,
        hasPopperEscaped: I
    }, i.attributes.popper = Object.assign({}, i.attributes.popper, {
        "data-popper-reference-hidden": S,
        "data-popper-escaped": I
    })
}
const Is = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Ll
};

function Dl(c, i, o) {
    var u = Wt(c),
        t = [ht, pt].indexOf(u) >= 0 ? -1 : 1,
        r = typeof o == "function" ? o(Object.assign({}, i, {
            placement: c
        })) : o,
        f = r[0],
        h = r[1];
    return f = f || 0, h = (h || 0) * t, [ht, Ct].indexOf(u) >= 0 ? {
        x: h,
        y: f
    } : {
        x: f,
        y: h
    }
}

function $l(c) {
    var i = c.state,
        o = c.options,
        u = c.name,
        t = o.offset,
        r = t === void 0 ? [0, 0] : t,
        f = Pr.reduce(function(S, I) {
            return S[I] = Dl(I, i.rects, r), S
        }, {}),
        h = f[i.placement],
        m = h.x,
        w = h.y;
    i.modifiersData.popperOffsets != null && (i.modifiersData.popperOffsets.x += m, i.modifiersData.popperOffsets.y += w), i.modifiersData[u] = f
}
const Ms = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: $l
};

function Pl(c) {
    var i = c.state,
        o = c.name;
    i.modifiersData[o] = $s({
        reference: i.rects.reference,
        element: i.rects.popper,
        strategy: "absolute",
        placement: i.placement
    })
}
const Vr = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: Pl,
    data: {}
};

function Il(c) {
    return c === "x" ? "y" : "x"
}

function Ml(c) {
    var i = c.state,
        o = c.options,
        u = c.name,
        t = o.mainAxis,
        r = t === void 0 ? !0 : t,
        f = o.altAxis,
        h = f === void 0 ? !1 : f,
        m = o.boundary,
        w = o.rootBoundary,
        S = o.altBoundary,
        I = o.padding,
        N = o.tether,
        K = N === void 0 ? !0 : N,
        D = o.tetherOffset,
        A = D === void 0 ? 0 : D,
        B = Mi(i, {
            boundary: m,
            rootBoundary: w,
            padding: I,
            altBoundary: S
        }),
        R = Wt(i.placement),
        re = Ii(i.placement),
        ue = !re,
        se = jr(R),
        ve = Il(se),
        l = i.modifiersData.popperOffsets,
        xe = i.rects.reference,
        fe = i.rects.popper,
        _e = typeof A == "function" ? A(Object.assign({}, i.rects, {
            placement: i.placement
        })) : A,
        we = typeof _e == "number" ? {
            mainAxis: _e,
            altAxis: _e
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, _e),
        ee = i.modifiersData.offset ? i.modifiersData.offset[i.placement] : null,
        X = {
            x: 0,
            y: 0
        };
    if (l) {
        if (r) {
            var ae, ne = se === "y" ? pt : ht,
                Ce = se === "y" ? xt : Ct,
                Ae = se === "y" ? "height" : "width",
                $e = l[se],
                et = $e + B[ne],
                Ye = $e - B[Ce],
                rt = K ? -fe[Ae] / 2 : 0,
                Ie = re === _i ? xe[Ae] : fe[Ae],
                Le = re === _i ? -fe[Ae] : -xe[Ae],
                Ke = i.elements.arrow,
                Re = K && Ke ? Hr(Ke) : {
                    width: 0,
                    height: 0
                },
                Ue = i.modifiersData["arrow#persistent"] ? i.modifiersData["arrow#persistent"].padding : ks(),
                tt = Ue[ne],
                We = Ue[Ce],
                De = nn(0, xe[Ae], Re[Ae]),
                He = ue ? xe[Ae] / 2 - rt - De - tt - we.mainAxis : Ie - De - tt - we.mainAxis,
                gt = ue ? -xe[Ae] / 2 + rt + De + We + we.mainAxis : Le + De + We + we.mainAxis,
                ct = i.elements.arrow && sn(i.elements.arrow),
                ft = ct ? se === "y" ? ct.clientTop || 0 : ct.clientLeft || 0 : 0,
                Te = (ae = ee?.[se]) != null ? ae : 0,
                ke = $e + He - Te - ft,
                Xe = $e + gt - Te,
                oe = nn(K ? Ln(et, ke) : et, $e, K ? bi(Ye, Xe) : Ye);
            l[se] = oe, X[se] = oe - $e
        }
        if (h) {
            var Ge, Fi = se === "x" ? pt : ht,
                Vi = se === "x" ? xt : Ct,
                kt = l[ve],
                Ft = ve === "y" ? "height" : "width",
                Jt = kt + B[Fi],
                Rt = kt - B[Vi],
                at = [pt, ht].indexOf(R) !== -1,
                bt = (Ge = ee?.[ve]) != null ? Ge : 0,
                x = at ? Jt : kt - xe[Ft] - fe[Ft] - bt + we.altAxis,
                T = at ? kt + xe[Ft] + fe[Ft] - bt - we.altAxis : Rt,
                P = K && at ? pl(x, kt, T) : nn(K ? x : Jt, kt, K ? T : Rt);
            l[ve] = P, X[ve] = P - kt
        }
        i.modifiersData[u] = X
    }
}
const Hs = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: Ml,
    requiresIfExists: ["offset"]
};

function Hl(c) {
    return {
        scrollLeft: c.scrollLeft,
        scrollTop: c.scrollTop
    }
}

function jl(c) {
    return c === At(c) || !Dt(c) ? qr(c) : Hl(c)
}

function Rl(c) {
    var i = c.getBoundingClientRect(),
        o = $i(i.width) / c.offsetWidth || 1,
        u = $i(i.height) / c.offsetHeight || 1;
    return o !== 1 || u !== 1
}

function Wl(c, i, o) {
    o === void 0 && (o = !1);
    var u = Dt(i),
        t = Dt(i) && Rl(i),
        r = ai(i),
        f = Pi(c, t, o),
        h = {
            scrollLeft: 0,
            scrollTop: 0
        },
        m = {
            x: 0,
            y: 0
        };
    return (u || !u && !o) && ((zt(i) !== "body" || Fr(r)) && (h = jl(i)), Dt(i) ? (m = Pi(i, !0), m.x += i.clientLeft, m.y += i.clientTop) : r && (m.x = zr(r))), {
        x: f.left + h.scrollLeft - m.x,
        y: f.top + h.scrollTop - m.y,
        width: f.width,
        height: f.height
    }
}

function ql(c) {
    var i = new Map,
        o = new Set,
        u = [];
    c.forEach(function(r) {
        i.set(r.name, r)
    });

    function t(r) {
        o.add(r.name);
        var f = [].concat(r.requires || [], r.requiresIfExists || []);
        f.forEach(function(h) {
            if (!o.has(h)) {
                var m = i.get(h);
                m && t(m)
            }
        }), u.push(r)
    }
    return c.forEach(function(r) {
        o.has(r.name) || t(r)
    }), u
}

function zl(c) {
    var i = ql(c);
    return xs.reduce(function(o, u) {
        return o.concat(i.filter(function(t) {
            return t.phase === u
        }))
    }, [])
}

function Fl(c) {
    var i;
    return function() {
        return i || (i = new Promise(function(o) {
            Promise.resolve().then(function() {
                i = void 0, o(c())
            })
        })), i
    }
}

function Vl(c) {
    var i = c.reduce(function(o, u) {
        var t = o[u.name];
        return o[u.name] = t ? Object.assign({}, t, u, {
            options: Object.assign({}, t.options, u.options),
            data: Object.assign({}, t.data, u.data)
        }) : u, o
    }, {});
    return Object.keys(i).map(function(o) {
        return i[o]
    })
}
var Mo = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function Ho() {
    for (var c = arguments.length, i = new Array(c), o = 0; o < c; o++) i[o] = arguments[o];
    return !i.some(function(u) {
        return !(u && typeof u.getBoundingClientRect == "function")
    })
}

function jn(c) {
    c === void 0 && (c = {});
    var i = c,
        o = i.defaultModifiers,
        u = o === void 0 ? [] : o,
        t = i.defaultOptions,
        r = t === void 0 ? Mo : t;
    return function(h, m, w) {
        w === void 0 && (w = r);
        var S = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, Mo, r),
                modifiersData: {},
                elements: {
                    reference: h,
                    popper: m
                },
                attributes: {},
                styles: {}
            },
            I = [],
            N = !1,
            K = {
                state: S,
                setOptions: function(R) {
                    var re = typeof R == "function" ? R(S.options) : R;
                    A(), S.options = Object.assign({}, r, S.options, re), S.scrollParents = {
                        reference: wi(h) ? rn(h) : h.contextElement ? rn(h.contextElement) : [],
                        popper: rn(m)
                    };
                    var ue = zl(Vl([].concat(u, S.options.modifiers)));
                    return S.orderedModifiers = ue.filter(function(se) {
                        return se.enabled
                    }), D(), K.update()
                },
                forceUpdate: function() {
                    if (!N) {
                        var R = S.elements,
                            re = R.reference,
                            ue = R.popper;
                        if (Ho(re, ue)) {
                            S.rects = {
                                reference: Wl(re, sn(ue), S.options.strategy === "fixed"),
                                popper: Hr(ue)
                            }, S.reset = !1, S.placement = S.options.placement, S.orderedModifiers.forEach(function(we) {
                                return S.modifiersData[we.name] = Object.assign({}, we.data)
                            });
                            for (var se = 0; se < S.orderedModifiers.length; se++) {
                                if (S.reset === !0) {
                                    S.reset = !1, se = -1;
                                    continue
                                }
                                var ve = S.orderedModifiers[se],
                                    l = ve.fn,
                                    xe = ve.options,
                                    fe = xe === void 0 ? {} : xe,
                                    _e = ve.name;
                                typeof l == "function" && (S = l({
                                    state: S,
                                    options: fe,
                                    name: _e,
                                    instance: K
                                }) || S)
                            }
                        }
                    }
                },
                update: Fl(function() {
                    return new Promise(function(B) {
                        K.forceUpdate(), B(S)
                    })
                }),
                destroy: function() {
                    A(), N = !0
                }
            };
        if (!Ho(h, m)) return K;
        K.setOptions(w).then(function(B) {
            !N && w.onFirstUpdate && w.onFirstUpdate(B)
        });

        function D() {
            S.orderedModifiers.forEach(function(B) {
                var R = B.name,
                    re = B.options,
                    ue = re === void 0 ? {} : re,
                    se = B.effect;
                if (typeof se == "function") {
                    var ve = se({
                            state: S,
                            name: R,
                            instance: K,
                            options: ue
                        }),
                        l = function() {};
                    I.push(ve || l)
                }
            })
        }

        function A() {
            I.forEach(function(B) {
                return B()
            }), I = []
        }
        return K
    }
}
var Bl = jn(),
    Ul = [Wr, Vr, Rr, Mr],
    Yl = jn({
        defaultModifiers: Ul
    }),
    Kl = [Wr, Vr, Rr, Mr, Ms, Ps, Hs, Ls, Is],
    Br = jn({
        defaultModifiers: Kl
    });
const js = Object.freeze(Object.defineProperty({
    __proto__: null,
    afterMain: ws,
    afterRead: ys,
    afterWrite: Ss,
    applyStyles: Mr,
    arrow: Ls,
    auto: Mn,
    basePlacements: Ri,
    beforeMain: bs,
    beforeRead: ms,
    beforeWrite: Ts,
    bottom: xt,
    clippingParents: hs,
    computeStyles: Rr,
    createPopper: Br,
    createPopperBase: Bl,
    createPopperLite: Yl,
    detectOverflow: Mi,
    end: Di,
    eventListeners: Wr,
    flip: Ps,
    hide: Is,
    left: ht,
    main: _s,
    modifierPhases: xs,
    offset: Ms,
    placements: Pr,
    popper: ki,
    popperGenerator: jn,
    popperOffsets: Vr,
    preventOverflow: Hs,
    read: vs,
    reference: gs,
    right: Ct,
    start: _i,
    top: pt,
    variationPlacements: Sr,
    viewport: $r,
    write: Es
}, Symbol.toStringTag, {
    value: "Module"
}));
/*!
 * Bootstrap v5.2.3 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
const Xl = 1e6,
    Gl = 1e3,
    Ar = "transitionend",
    Ql = c => c == null ? `${c}` : Object.prototype.toString.call(c).match(/\s([a-z]+)/i)[1].toLowerCase(),
    Jl = c => {
        do c += Math.floor(Math.random() * Xl); while (document.getElementById(c));
        return c
    },
    Rs = c => {
        let i = c.getAttribute("data-bs-target");
        if (!i || i === "#") {
            let o = c.getAttribute("href");
            if (!o || !o.includes("#") && !o.startsWith(".")) return null;
            o.includes("#") && !o.startsWith("#") && (o = `#${o.split("#")[1]}`), i = o && o !== "#" ? o.trim() : null
        }
        return i
    },
    Ws = c => {
        const i = Rs(c);
        return i && document.querySelector(i) ? i : null
    },
    Yt = c => {
        const i = Rs(c);
        return i ? document.querySelector(i) : null
    },
    Zl = c => {
        if (!c) return 0;
        let {
            transitionDuration: i,
            transitionDelay: o
        } = window.getComputedStyle(c);
        const u = Number.parseFloat(i),
            t = Number.parseFloat(o);
        return !u && !t ? 0 : (i = i.split(",")[0], o = o.split(",")[0], (Number.parseFloat(i) + Number.parseFloat(o)) * Gl)
    },
    qs = c => {
        c.dispatchEvent(new Event(Ar))
    },
    Kt = c => !c || typeof c != "object" ? !1 : (typeof c.jquery < "u" && (c = c[0]), typeof c.nodeType < "u"),
    ri = c => Kt(c) ? c.jquery ? c[0] : c : typeof c == "string" && c.length > 0 ? document.querySelector(c) : null,
    Wi = c => {
        if (!Kt(c) || c.getClientRects().length === 0) return !1;
        const i = getComputedStyle(c).getPropertyValue("visibility") === "visible",
            o = c.closest("details:not([open])");
        if (!o) return i;
        if (o !== c) {
            const u = c.closest("summary");
            if (u && u.parentNode !== o || u === null) return !1
        }
        return i
    },
    oi = c => !c || c.nodeType !== Node.ELEMENT_NODE || c.classList.contains("disabled") ? !0 : typeof c.disabled < "u" ? c.disabled : c.hasAttribute("disabled") && c.getAttribute("disabled") !== "false",
    zs = c => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof c.getRootNode == "function") {
            const i = c.getRootNode();
            return i instanceof ShadowRoot ? i : null
        }
        return c instanceof ShadowRoot ? c : c.parentNode ? zs(c.parentNode) : null
    },
    Dn = () => {},
    an = c => {
        c.offsetHeight
    },
    Fs = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
    ur = [],
    ec = c => {
        document.readyState === "loading" ? (ur.length || document.addEventListener("DOMContentLoaded", () => {
            for (const i of ur) i()
        }), ur.push(c)) : c()
    },
    $t = () => document.documentElement.dir === "rtl",
    Pt = c => {
        ec(() => {
            const i = Fs();
            if (i) {
                const o = c.NAME,
                    u = i.fn[o];
                i.fn[o] = c.jQueryInterface, i.fn[o].Constructor = c, i.fn[o].noConflict = () => (i.fn[o] = u, c.jQueryInterface)
            }
        })
    },
    Ut = c => {
        typeof c == "function" && c()
    },
    Vs = (c, i, o = !0) => {
        if (!o) {
            Ut(c);
            return
        }
        const u = 5,
            t = Zl(i) + u;
        let r = !1;
        const f = ({
            target: h
        }) => {
            h === i && (r = !0, i.removeEventListener(Ar, f), Ut(c))
        };
        i.addEventListener(Ar, f), setTimeout(() => {
            r || qs(i)
        }, t)
    },
    Ur = (c, i, o, u) => {
        const t = c.length;
        let r = c.indexOf(i);
        return r === -1 ? !o && u ? c[t - 1] : c[0] : (r += o ? 1 : -1, u && (r = (r + t) % t), c[Math.max(0, Math.min(r, t - 1))])
    },
    tc = /[^.]*(?=\..*)\.|.*/,
    ic = /\..*/,
    nc = /::\d+$/,
    fr = {};
let jo = 1;
const Bs = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    rc = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

function Us(c, i) {
    return i && `${i}::${jo++}` || c.uidEvent || jo++
}

function Ys(c) {
    const i = Us(c);
    return c.uidEvent = i, fr[i] = fr[i] || {}, fr[i]
}

function oc(c, i) {
    return function o(u) {
        return Yr(u, {
            delegateTarget: c
        }), o.oneOff && G.off(c, u.type, i), i.apply(c, [u])
    }
}

function sc(c, i, o) {
    return function u(t) {
        const r = c.querySelectorAll(i);
        for (let {
                target: f
            } = t; f && f !== this; f = f.parentNode)
            for (const h of r)
                if (h === f) return Yr(t, {
                    delegateTarget: f
                }), u.oneOff && G.off(c, t.type, i, o), o.apply(f, [t])
    }
}

function Ks(c, i, o = null) {
    return Object.values(c).find(u => u.callable === i && u.delegationSelector === o)
}

function Xs(c, i, o) {
    const u = typeof i == "string",
        t = u ? o : i || o;
    let r = Gs(c);
    return rc.has(r) || (r = c), [u, t, r]
}

function Ro(c, i, o, u, t) {
    if (typeof i != "string" || !c) return;
    let [r, f, h] = Xs(i, o, u);
    i in Bs && (f = (D => function(A) {
        if (!A.relatedTarget || A.relatedTarget !== A.delegateTarget && !A.delegateTarget.contains(A.relatedTarget)) return D.call(this, A)
    })(f));
    const m = Ys(c),
        w = m[h] || (m[h] = {}),
        S = Ks(w, f, r ? o : null);
    if (S) {
        S.oneOff = S.oneOff && t;
        return
    }
    const I = Us(f, i.replace(tc, "")),
        N = r ? sc(c, o, f) : oc(c, f);
    N.delegationSelector = r ? o : null, N.callable = f, N.oneOff = t, N.uidEvent = I, w[I] = N, c.addEventListener(h, N, r)
}

function kr(c, i, o, u, t) {
    const r = Ks(i[o], u, t);
    r && (c.removeEventListener(o, r, !!t), delete i[o][r.uidEvent])
}

function ac(c, i, o, u) {
    const t = i[o] || {};
    for (const r of Object.keys(t))
        if (r.includes(u)) {
            const f = t[r];
            kr(c, i, o, f.callable, f.delegationSelector)
        }
}

function Gs(c) {
    return c = c.replace(ic, ""), Bs[c] || c
}
const G = {
    on(c, i, o, u) {
        Ro(c, i, o, u, !1)
    },
    one(c, i, o, u) {
        Ro(c, i, o, u, !0)
    },
    off(c, i, o, u) {
        if (typeof i != "string" || !c) return;
        const [t, r, f] = Xs(i, o, u), h = f !== i, m = Ys(c), w = m[f] || {}, S = i.startsWith(".");
        if (typeof r < "u") {
            if (!Object.keys(w).length) return;
            kr(c, m, f, r, t ? o : null);
            return
        }
        if (S)
            for (const I of Object.keys(m)) ac(c, m, I, i.slice(1));
        for (const I of Object.keys(w)) {
            const N = I.replace(nc, "");
            if (!h || i.includes(N)) {
                const K = w[I];
                kr(c, m, f, K.callable, K.delegationSelector)
            }
        }
    },
    trigger(c, i, o) {
        if (typeof i != "string" || !c) return null;
        const u = Fs(),
            t = Gs(i),
            r = i !== t;
        let f = null,
            h = !0,
            m = !0,
            w = !1;
        r && u && (f = u.Event(i, o), u(c).trigger(f), h = !f.isPropagationStopped(), m = !f.isImmediatePropagationStopped(), w = f.isDefaultPrevented());
        let S = new Event(i, {
            bubbles: h,
            cancelable: !0
        });
        return S = Yr(S, o), w && S.preventDefault(), m && c.dispatchEvent(S), S.defaultPrevented && f && f.preventDefault(), S
    }
};

function Yr(c, i) {
    for (const [o, u] of Object.entries(i || {})) try {
        c[o] = u
    } catch {
        Object.defineProperty(c, o, {
            configurable: !0,
            get() {
                return u
            }
        })
    }
    return c
}
const ni = new Map,
    dr = {
        set(c, i, o) {
            ni.has(c) || ni.set(c, new Map);
            const u = ni.get(c);
            if (!u.has(i) && u.size !== 0) {
                console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(u.keys())[0]}.`);
                return
            }
            u.set(i, o)
        },
        get(c, i) {
            return ni.has(c) && ni.get(c).get(i) || null
        },
        remove(c, i) {
            if (!ni.has(c)) return;
            const o = ni.get(c);
            o.delete(i), o.size === 0 && ni.delete(c)
        }
    };

function Wo(c) {
    if (c === "true") return !0;
    if (c === "false") return !1;
    if (c === Number(c).toString()) return Number(c);
    if (c === "" || c === "null") return null;
    if (typeof c != "string") return c;
    try {
        return JSON.parse(decodeURIComponent(c))
    } catch {
        return c
    }
}

function pr(c) {
    return c.replace(/[A-Z]/g, i => `-${i.toLowerCase()}`)
}
const Xt = {
    setDataAttribute(c, i, o) {
        c.setAttribute(`data-bs-${pr(i)}`, o)
    },
    removeDataAttribute(c, i) {
        c.removeAttribute(`data-bs-${pr(i)}`)
    },
    getDataAttributes(c) {
        if (!c) return {};
        const i = {},
            o = Object.keys(c.dataset).filter(u => u.startsWith("bs") && !u.startsWith("bsConfig"));
        for (const u of o) {
            let t = u.replace(/^bs/, "");
            t = t.charAt(0).toLowerCase() + t.slice(1, t.length), i[t] = Wo(c.dataset[u])
        }
        return i
    },
    getDataAttribute(c, i) {
        return Wo(c.getAttribute(`data-bs-${pr(i)}`))
    }
};
class ln {
    static get Default() {
        return {}
    }
    static get DefaultType() {
        return {}
    }
    static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!')
    }
    _getConfig(i) {
        return i = this._mergeConfigObj(i), i = this._configAfterMerge(i), this._typeCheckConfig(i), i
    }
    _configAfterMerge(i) {
        return i
    }
    _mergeConfigObj(i, o) {
        const u = Kt(o) ? Xt.getDataAttribute(o, "config") : {};
        return {
            ...this.constructor.Default,
            ...typeof u == "object" ? u : {},
            ...Kt(o) ? Xt.getDataAttributes(o) : {},
            ...typeof i == "object" ? i : {}
        }
    }
    _typeCheckConfig(i, o = this.constructor.DefaultType) {
        for (const u of Object.keys(o)) {
            const t = o[u],
                r = i[u],
                f = Kt(r) ? "element" : Ql(r);
            if (!new RegExp(t).test(f)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${u}" provided type "${f}" but expected type "${t}".`)
        }
    }
}
const lc = "5.2.3";
class Ht extends ln {
    constructor(i, o) {
        super(), i = ri(i), i && (this._element = i, this._config = this._getConfig(o), dr.set(this._element, this.constructor.DATA_KEY, this))
    }
    dispose() {
        dr.remove(this._element, this.constructor.DATA_KEY), G.off(this._element, this.constructor.EVENT_KEY);
        for (const i of Object.getOwnPropertyNames(this)) this[i] = null
    }
    _queueCallback(i, o, u = !0) {
        Vs(i, o, u)
    }
    _getConfig(i) {
        return i = this._mergeConfigObj(i, this._element), i = this._configAfterMerge(i), this._typeCheckConfig(i), i
    }
    static getInstance(i) {
        return dr.get(ri(i), this.DATA_KEY)
    }
    static getOrCreateInstance(i, o = {}) {
        return this.getInstance(i) || new this(i, typeof o == "object" ? o : null)
    }
    static get VERSION() {
        return lc
    }
    static get DATA_KEY() {
        return `bs.${this.NAME}`
    }
    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`
    }
    static eventName(i) {
        return `${i}${this.EVENT_KEY}`
    }
}
const Rn = (c, i = "hide") => {
        const o = `click.dismiss${c.EVENT_KEY}`,
            u = c.NAME;
        G.on(document, o, `[data-bs-dismiss="${u}"]`, function(t) {
            if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), oi(this)) return;
            const r = Yt(this) || this.closest(`.${u}`);
            c.getOrCreateInstance(r)[i]()
        })
    },
    cc = "alert",
    uc = "bs.alert",
    Qs = `.${uc}`,
    fc = `close${Qs}`,
    dc = `closed${Qs}`,
    pc = "fade",
    hc = "show";
class Wn extends Ht {
    static get NAME() {
        return cc
    }
    close() {
        if (G.trigger(this._element, fc).defaultPrevented) return;
        this._element.classList.remove(hc);
        const o = this._element.classList.contains(pc);
        this._queueCallback(() => this._destroyElement(), this._element, o)
    }
    _destroyElement() {
        this._element.remove(), G.trigger(this._element, dc), this.dispose()
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = Wn.getOrCreateInstance(this);
            if (typeof i == "string") {
                if (o[i] === void 0 || i.startsWith("_") || i === "constructor") throw new TypeError(`No method named "${i}"`);
                o[i](this)
            }
        })
    }
}
Rn(Wn, "close");
Pt(Wn);
const gc = "button",
    mc = "bs.button",
    vc = `.${mc}`,
    yc = ".data-api",
    bc = "active",
    qo = '[data-bs-toggle="button"]',
    _c = `click${vc}${yc}`;
class qn extends Ht {
    static get NAME() {
        return gc
    }
    toggle() {
        this._element.setAttribute("aria-pressed", this._element.classList.toggle(bc))
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = qn.getOrCreateInstance(this);
            i === "toggle" && o[i]()
        })
    }
}
G.on(document, _c, qo, c => {
    c.preventDefault();
    const i = c.target.closest(qo);
    qn.getOrCreateInstance(i).toggle()
});
Pt(qn);
const Se = {
        find(c, i = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(i, c))
        },
        findOne(c, i = document.documentElement) {
            return Element.prototype.querySelector.call(i, c)
        },
        children(c, i) {
            return [].concat(...c.children).filter(o => o.matches(i))
        },
        parents(c, i) {
            const o = [];
            let u = c.parentNode.closest(i);
            for (; u;) o.push(u), u = u.parentNode.closest(i);
            return o
        },
        prev(c, i) {
            let o = c.previousElementSibling;
            for (; o;) {
                if (o.matches(i)) return [o];
                o = o.previousElementSibling
            }
            return []
        },
        next(c, i) {
            let o = c.nextElementSibling;
            for (; o;) {
                if (o.matches(i)) return [o];
                o = o.nextElementSibling
            }
            return []
        },
        focusableChildren(c) {
            const i = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(o => `${o}:not([tabindex^="-"])`).join(",");
            return this.find(i, c).filter(o => !oi(o) && Wi(o))
        }
    },
    wc = "swipe",
    qi = ".bs.swipe",
    Tc = `touchstart${qi}`,
    Ec = `touchmove${qi}`,
    Sc = `touchend${qi}`,
    xc = `pointerdown${qi}`,
    Cc = `pointerup${qi}`,
    Ac = "touch",
    kc = "pen",
    Oc = "pointer-event",
    Nc = 40,
    Lc = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    },
    Dc = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
    };
class $n extends ln {
    constructor(i, o) {
        super(), this._element = i, !(!i || !$n.isSupported()) && (this._config = this._getConfig(o), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents())
    }
    static get Default() {
        return Lc
    }
    static get DefaultType() {
        return Dc
    }
    static get NAME() {
        return wc
    }
    dispose() {
        G.off(this._element, qi)
    }
    _start(i) {
        if (!this._supportPointerEvents) {
            this._deltaX = i.touches[0].clientX;
            return
        }
        this._eventIsPointerPenTouch(i) && (this._deltaX = i.clientX)
    }
    _end(i) {
        this._eventIsPointerPenTouch(i) && (this._deltaX = i.clientX - this._deltaX), this._handleSwipe(), Ut(this._config.endCallback)
    }
    _move(i) {
        this._deltaX = i.touches && i.touches.length > 1 ? 0 : i.touches[0].clientX - this._deltaX
    }
    _handleSwipe() {
        const i = Math.abs(this._deltaX);
        if (i <= Nc) return;
        const o = i / this._deltaX;
        this._deltaX = 0, o && Ut(o > 0 ? this._config.rightCallback : this._config.leftCallback)
    }
    _initEvents() {
        this._supportPointerEvents ? (G.on(this._element, xc, i => this._start(i)), G.on(this._element, Cc, i => this._end(i)), this._element.classList.add(Oc)) : (G.on(this._element, Tc, i => this._start(i)), G.on(this._element, Ec, i => this._move(i)), G.on(this._element, Sc, i => this._end(i)))
    }
    _eventIsPointerPenTouch(i) {
        return this._supportPointerEvents && (i.pointerType === kc || i.pointerType === Ac)
    }
    static isSupported() {
        return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    }
}
const $c = "carousel",
    Pc = "bs.carousel",
    li = `.${Pc}`,
    Js = ".data-api",
    Ic = "ArrowLeft",
    Mc = "ArrowRight",
    Hc = 500,
    en = "next",
    Ci = "prev",
    Oi = "left",
    On = "right",
    jc = `slide${li}`,
    hr = `slid${li}`,
    Rc = `keydown${li}`,
    Wc = `mouseenter${li}`,
    qc = `mouseleave${li}`,
    zc = `dragstart${li}`,
    Fc = `load${li}${Js}`,
    Vc = `click${li}${Js}`,
    Zs = "carousel",
    Tn = "active",
    Bc = "slide",
    Uc = "carousel-item-end",
    Yc = "carousel-item-start",
    Kc = "carousel-item-next",
    Xc = "carousel-item-prev",
    ea = ".active",
    ta = ".carousel-item",
    Gc = ea + ta,
    Qc = ".carousel-item img",
    Jc = ".carousel-indicators",
    Zc = "[data-bs-slide], [data-bs-slide-to]",
    eu = '[data-bs-ride="carousel"]',
    tu = {
        [Ic]: On,
        [Mc]: Oi
    },
    iu = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0
    },
    nu = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
    };
class cn extends Ht {
    constructor(i, o) {
        super(i, o), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = Se.findOne(Jc, this._element), this._addEventListeners(), this._config.ride === Zs && this.cycle()
    }
    static get Default() {
        return iu
    }
    static get DefaultType() {
        return nu
    }
    static get NAME() {
        return $c
    }
    next() {
        this._slide(en)
    }
    nextWhenVisible() {
        !document.hidden && Wi(this._element) && this.next()
    }
    prev() {
        this._slide(Ci)
    }
    pause() {
        this._isSliding && qs(this._element), this._clearInterval()
    }
    cycle() {
        this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
    }
    _maybeEnableCycle() {
        if (this._config.ride) {
            if (this._isSliding) {
                G.one(this._element, hr, () => this.cycle());
                return
            }
            this.cycle()
        }
    }
    to(i) {
        const o = this._getItems();
        if (i > o.length - 1 || i < 0) return;
        if (this._isSliding) {
            G.one(this._element, hr, () => this.to(i));
            return
        }
        const u = this._getItemIndex(this._getActive());
        if (u === i) return;
        const t = i > u ? en : Ci;
        this._slide(t, o[i])
    }
    dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
    }
    _configAfterMerge(i) {
        return i.defaultInterval = i.interval, i
    }
    _addEventListeners() {
        this._config.keyboard && G.on(this._element, Rc, i => this._keydown(i)), this._config.pause === "hover" && (G.on(this._element, Wc, () => this.pause()), G.on(this._element, qc, () => this._maybeEnableCycle())), this._config.touch && $n.isSupported() && this._addTouchEventListeners()
    }
    _addTouchEventListeners() {
        for (const u of Se.find(Qc, this._element)) G.on(u, zc, t => t.preventDefault());
        const o = {
            leftCallback: () => this._slide(this._directionToOrder(Oi)),
            rightCallback: () => this._slide(this._directionToOrder(On)),
            endCallback: () => {
                this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Hc + this._config.interval))
            }
        };
        this._swipeHelper = new $n(this._element, o)
    }
    _keydown(i) {
        if (/input|textarea/i.test(i.target.tagName)) return;
        const o = tu[i.key];
        o && (i.preventDefault(), this._slide(this._directionToOrder(o)))
    }
    _getItemIndex(i) {
        return this._getItems().indexOf(i)
    }
    _setActiveIndicatorElement(i) {
        if (!this._indicatorsElement) return;
        const o = Se.findOne(ea, this._indicatorsElement);
        o.classList.remove(Tn), o.removeAttribute("aria-current");
        const u = Se.findOne(`[data-bs-slide-to="${i}"]`, this._indicatorsElement);
        u && (u.classList.add(Tn), u.setAttribute("aria-current", "true"))
    }
    _updateInterval() {
        const i = this._activeElement || this._getActive();
        if (!i) return;
        const o = Number.parseInt(i.getAttribute("data-bs-interval"), 10);
        this._config.interval = o || this._config.defaultInterval
    }
    _slide(i, o = null) {
        if (this._isSliding) return;
        const u = this._getActive(),
            t = i === en,
            r = o || Ur(this._getItems(), u, t, this._config.wrap);
        if (r === u) return;
        const f = this._getItemIndex(r),
            h = K => G.trigger(this._element, K, {
                relatedTarget: r,
                direction: this._orderToDirection(i),
                from: this._getItemIndex(u),
                to: f
            });
        if (h(jc).defaultPrevented || !u || !r) return;
        const w = !!this._interval;
        this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(f), this._activeElement = r;
        const S = t ? Yc : Uc,
            I = t ? Kc : Xc;
        r.classList.add(I), an(r), u.classList.add(S), r.classList.add(S);
        const N = () => {
            r.classList.remove(S, I), r.classList.add(Tn), u.classList.remove(Tn, I, S), this._isSliding = !1, h(hr)
        };
        this._queueCallback(N, u, this._isAnimated()), w && this.cycle()
    }
    _isAnimated() {
        return this._element.classList.contains(Bc)
    }
    _getActive() {
        return Se.findOne(Gc, this._element)
    }
    _getItems() {
        return Se.find(ta, this._element)
    }
    _clearInterval() {
        this._interval && (clearInterval(this._interval), this._interval = null)
    }
    _directionToOrder(i) {
        return $t() ? i === Oi ? Ci : en : i === Oi ? en : Ci
    }
    _orderToDirection(i) {
        return $t() ? i === Ci ? Oi : On : i === Ci ? On : Oi
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = cn.getOrCreateInstance(this, i);
            if (typeof i == "number") {
                o.to(i);
                return
            }
            if (typeof i == "string") {
                if (o[i] === void 0 || i.startsWith("_") || i === "constructor") throw new TypeError(`No method named "${i}"`);
                o[i]()
            }
        })
    }
}
G.on(document, Vc, Zc, function(c) {
    const i = Yt(this);
    if (!i || !i.classList.contains(Zs)) return;
    c.preventDefault();
    const o = cn.getOrCreateInstance(i),
        u = this.getAttribute("data-bs-slide-to");
    if (u) {
        o.to(u), o._maybeEnableCycle();
        return
    }
    if (Xt.getDataAttribute(this, "slide") === "next") {
        o.next(), o._maybeEnableCycle();
        return
    }
    o.prev(), o._maybeEnableCycle()
});
G.on(window, Fc, () => {
    const c = Se.find(eu);
    for (const i of c) cn.getOrCreateInstance(i)
});
Pt(cn);
const ru = "collapse",
    ou = "bs.collapse",
    un = `.${ou}`,
    su = ".data-api",
    au = `show${un}`,
    lu = `shown${un}`,
    cu = `hide${un}`,
    uu = `hidden${un}`,
    fu = `click${un}${su}`,
    gr = "show",
    Li = "collapse",
    En = "collapsing",
    du = "collapsed",
    pu = `:scope .${Li} .${Li}`,
    hu = "collapse-horizontal",
    gu = "width",
    mu = "height",
    vu = ".collapse.show, .collapse.collapsing",
    Or = '[data-bs-toggle="collapse"]',
    yu = {
        parent: null,
        toggle: !0
    },
    bu = {
        parent: "(null|element)",
        toggle: "boolean"
    };
class on extends Ht {
    constructor(i, o) {
        super(i, o), this._isTransitioning = !1, this._triggerArray = [];
        const u = Se.find(Or);
        for (const t of u) {
            const r = Ws(t),
                f = Se.find(r).filter(h => h === this._element);
            r !== null && f.length && this._triggerArray.push(t)
        }
        this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
    }
    static get Default() {
        return yu
    }
    static get DefaultType() {
        return bu
    }
    static get NAME() {
        return ru
    }
    toggle() {
        this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (this._isTransitioning || this._isShown()) return;
        let i = [];
        if (this._config.parent && (i = this._getFirstLevelChildren(vu).filter(h => h !== this._element).map(h => on.getOrCreateInstance(h, {
                toggle: !1
            }))), i.length && i[0]._isTransitioning || G.trigger(this._element, au).defaultPrevented) return;
        for (const h of i) h.hide();
        const u = this._getDimension();
        this._element.classList.remove(Li), this._element.classList.add(En), this._element.style[u] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
        const t = () => {
                this._isTransitioning = !1, this._element.classList.remove(En), this._element.classList.add(Li, gr), this._element.style[u] = "", G.trigger(this._element, lu)
            },
            f = `scroll${u[0].toUpperCase()+u.slice(1)}`;
        this._queueCallback(t, this._element, !0), this._element.style[u] = `${this._element[f]}px`
    }
    hide() {
        if (this._isTransitioning || !this._isShown() || G.trigger(this._element, cu).defaultPrevented) return;
        const o = this._getDimension();
        this._element.style[o] = `${this._element.getBoundingClientRect()[o]}px`, an(this._element), this._element.classList.add(En), this._element.classList.remove(Li, gr);
        for (const t of this._triggerArray) {
            const r = Yt(t);
            r && !this._isShown(r) && this._addAriaAndCollapsedClass([t], !1)
        }
        this._isTransitioning = !0;
        const u = () => {
            this._isTransitioning = !1, this._element.classList.remove(En), this._element.classList.add(Li), G.trigger(this._element, uu)
        };
        this._element.style[o] = "", this._queueCallback(u, this._element, !0)
    }
    _isShown(i = this._element) {
        return i.classList.contains(gr)
    }
    _configAfterMerge(i) {
        return i.toggle = !!i.toggle, i.parent = ri(i.parent), i
    }
    _getDimension() {
        return this._element.classList.contains(hu) ? gu : mu
    }
    _initializeChildren() {
        if (!this._config.parent) return;
        const i = this._getFirstLevelChildren(Or);
        for (const o of i) {
            const u = Yt(o);
            u && this._addAriaAndCollapsedClass([o], this._isShown(u))
        }
    }
    _getFirstLevelChildren(i) {
        const o = Se.find(pu, this._config.parent);
        return Se.find(i, this._config.parent).filter(u => !o.includes(u))
    }
    _addAriaAndCollapsedClass(i, o) {
        if (i.length)
            for (const u of i) u.classList.toggle(du, !o), u.setAttribute("aria-expanded", o)
    }
    static jQueryInterface(i) {
        const o = {};
        return typeof i == "string" && /show|hide/.test(i) && (o.toggle = !1), this.each(function() {
            const u = on.getOrCreateInstance(this, o);
            if (typeof i == "string") {
                if (typeof u[i] > "u") throw new TypeError(`No method named "${i}"`);
                u[i]()
            }
        })
    }
}
G.on(document, fu, Or, function(c) {
    (c.target.tagName === "A" || c.delegateTarget && c.delegateTarget.tagName === "A") && c.preventDefault();
    const i = Ws(this),
        o = Se.find(i);
    for (const u of o) on.getOrCreateInstance(u, {
        toggle: !1
    }).toggle()
});
Pt(on);
const zo = "dropdown",
    _u = "bs.dropdown",
    Ti = `.${_u}`,
    Kr = ".data-api",
    wu = "Escape",
    Fo = "Tab",
    Tu = "ArrowUp",
    Vo = "ArrowDown",
    Eu = 2,
    Su = `hide${Ti}`,
    xu = `hidden${Ti}`,
    Cu = `show${Ti}`,
    Au = `shown${Ti}`,
    ia = `click${Ti}${Kr}`,
    na = `keydown${Ti}${Kr}`,
    ku = `keyup${Ti}${Kr}`,
    Ni = "show",
    Ou = "dropup",
    Nu = "dropend",
    Lu = "dropstart",
    Du = "dropup-center",
    $u = "dropdown-center",
    vi = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Pu = `${vi}.${Ni}`,
    Nn = ".dropdown-menu",
    Iu = ".navbar",
    Mu = ".navbar-nav",
    Hu = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    ju = $t() ? "top-end" : "top-start",
    Ru = $t() ? "top-start" : "top-end",
    Wu = $t() ? "bottom-end" : "bottom-start",
    qu = $t() ? "bottom-start" : "bottom-end",
    zu = $t() ? "left-start" : "right-start",
    Fu = $t() ? "right-start" : "left-start",
    Vu = "top",
    Bu = "bottom",
    Uu = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle"
    },
    Yu = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
    };
class qt extends Ht {
    constructor(i, o) {
        super(i, o), this._popper = null, this._parent = this._element.parentNode, this._menu = Se.next(this._element, Nn)[0] || Se.prev(this._element, Nn)[0] || Se.findOne(Nn, this._parent), this._inNavbar = this._detectNavbar()
    }
    static get Default() {
        return Uu
    }
    static get DefaultType() {
        return Yu
    }
    static get NAME() {
        return zo
    }
    toggle() {
        return this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (oi(this._element) || this._isShown()) return;
        const i = {
            relatedTarget: this._element
        };
        if (!G.trigger(this._element, Cu, i).defaultPrevented) {
            if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Mu))
                for (const u of [].concat(...document.body.children)) G.on(u, "mouseover", Dn);
            this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ni), this._element.classList.add(Ni), G.trigger(this._element, Au, i)
        }
    }
    hide() {
        if (oi(this._element) || !this._isShown()) return;
        const i = {
            relatedTarget: this._element
        };
        this._completeHide(i)
    }
    dispose() {
        this._popper && this._popper.destroy(), super.dispose()
    }
    update() {
        this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
    }
    _completeHide(i) {
        if (!G.trigger(this._element, Su, i).defaultPrevented) {
            if ("ontouchstart" in document.documentElement)
                for (const u of [].concat(...document.body.children)) G.off(u, "mouseover", Dn);
            this._popper && this._popper.destroy(), this._menu.classList.remove(Ni), this._element.classList.remove(Ni), this._element.setAttribute("aria-expanded", "false"), Xt.removeDataAttribute(this._menu, "popper"), G.trigger(this._element, xu, i)
        }
    }
    _getConfig(i) {
        if (i = super._getConfig(i), typeof i.reference == "object" && !Kt(i.reference) && typeof i.reference.getBoundingClientRect != "function") throw new TypeError(`${zo.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
        return i
    }
    _createPopper() {
        if (typeof js > "u") throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
        let i = this._element;
        this._config.reference === "parent" ? i = this._parent : Kt(this._config.reference) ? i = ri(this._config.reference) : typeof this._config.reference == "object" && (i = this._config.reference);
        const o = this._getPopperConfig();
        this._popper = Br(i, this._menu, o)
    }
    _isShown() {
        return this._menu.classList.contains(Ni)
    }
    _getPlacement() {
        const i = this._parent;
        if (i.classList.contains(Nu)) return zu;
        if (i.classList.contains(Lu)) return Fu;
        if (i.classList.contains(Du)) return Vu;
        if (i.classList.contains($u)) return Bu;
        const o = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
        return i.classList.contains(Ou) ? o ? Ru : ju : o ? qu : Wu
    }
    _detectNavbar() {
        return this._element.closest(Iu) !== null
    }
    _getOffset() {
        const {
            offset: i
        } = this._config;
        return typeof i == "string" ? i.split(",").map(o => Number.parseInt(o, 10)) : typeof i == "function" ? o => i(o, this._element) : i
    }
    _getPopperConfig() {
        const i = {
            placement: this._getPlacement(),
            modifiers: [{
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }]
        };
        return (this._inNavbar || this._config.display === "static") && (Xt.setDataAttribute(this._menu, "popper", "static"), i.modifiers = [{
            name: "applyStyles",
            enabled: !1
        }]), {
            ...i,
            ...typeof this._config.popperConfig == "function" ? this._config.popperConfig(i) : this._config.popperConfig
        }
    }
    _selectMenuItem({
        key: i,
        target: o
    }) {
        const u = Se.find(Hu, this._menu).filter(t => Wi(t));
        u.length && Ur(u, o, i === Vo, !u.includes(o)).focus()
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = qt.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (typeof o[i] > "u") throw new TypeError(`No method named "${i}"`);
                o[i]()
            }
        })
    }
    static clearMenus(i) {
        if (i.button === Eu || i.type === "keyup" && i.key !== Fo) return;
        const o = Se.find(Pu);
        for (const u of o) {
            const t = qt.getInstance(u);
            if (!t || t._config.autoClose === !1) continue;
            const r = i.composedPath(),
                f = r.includes(t._menu);
            if (r.includes(t._element) || t._config.autoClose === "inside" && !f || t._config.autoClose === "outside" && f || t._menu.contains(i.target) && (i.type === "keyup" && i.key === Fo || /input|select|option|textarea|form/i.test(i.target.tagName))) continue;
            const h = {
                relatedTarget: t._element
            };
            i.type === "click" && (h.clickEvent = i), t._completeHide(h)
        }
    }
    static dataApiKeydownHandler(i) {
        const o = /input|textarea/i.test(i.target.tagName),
            u = i.key === wu,
            t = [Tu, Vo].includes(i.key);
        if (!t && !u || o && !u) return;
        i.preventDefault();
        const r = this.matches(vi) ? this : Se.prev(this, vi)[0] || Se.next(this, vi)[0] || Se.findOne(vi, i.delegateTarget.parentNode),
            f = qt.getOrCreateInstance(r);
        if (t) {
            i.stopPropagation(), f.show(), f._selectMenuItem(i);
            return
        }
        f._isShown() && (i.stopPropagation(), f.hide(), r.focus())
    }
}
G.on(document, na, vi, qt.dataApiKeydownHandler);
G.on(document, na, Nn, qt.dataApiKeydownHandler);
G.on(document, ia, qt.clearMenus);
G.on(document, ku, qt.clearMenus);
G.on(document, ia, vi, function(c) {
    c.preventDefault(), qt.getOrCreateInstance(this).toggle()
});
Pt(qt);
const Bo = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Uo = ".sticky-top",
    Sn = "padding-right",
    Yo = "margin-right";
class Nr {
    constructor() {
        this._element = document.body
    }
    getWidth() {
        const i = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - i)
    }
    hide() {
        const i = this.getWidth();
        this._disableOverFlow(), this._setElementAttributes(this._element, Sn, o => o + i), this._setElementAttributes(Bo, Sn, o => o + i), this._setElementAttributes(Uo, Yo, o => o - i)
    }
    reset() {
        this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Sn), this._resetElementAttributes(Bo, Sn), this._resetElementAttributes(Uo, Yo)
    }
    isOverflowing() {
        return this.getWidth() > 0
    }
    _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
    }
    _setElementAttributes(i, o, u) {
        const t = this.getWidth(),
            r = f => {
                if (f !== this._element && window.innerWidth > f.clientWidth + t) return;
                this._saveInitialAttribute(f, o);
                const h = window.getComputedStyle(f).getPropertyValue(o);
                f.style.setProperty(o, `${u(Number.parseFloat(h))}px`)
            };
        this._applyManipulationCallback(i, r)
    }
    _saveInitialAttribute(i, o) {
        const u = i.style.getPropertyValue(o);
        u && Xt.setDataAttribute(i, o, u)
    }
    _resetElementAttributes(i, o) {
        const u = t => {
            const r = Xt.getDataAttribute(t, o);
            if (r === null) {
                t.style.removeProperty(o);
                return
            }
            Xt.removeDataAttribute(t, o), t.style.setProperty(o, r)
        };
        this._applyManipulationCallback(i, u)
    }
    _applyManipulationCallback(i, o) {
        if (Kt(i)) {
            o(i);
            return
        }
        for (const u of Se.find(i, this._element)) o(u)
    }
}
const ra = "backdrop",
    Ku = "fade",
    Ko = "show",
    Xo = `mousedown.bs.${ra}`,
    Xu = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body"
    },
    Gu = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
    };
class oa extends ln {
    constructor(i) {
        super(), this._config = this._getConfig(i), this._isAppended = !1, this._element = null
    }
    static get Default() {
        return Xu
    }
    static get DefaultType() {
        return Gu
    }
    static get NAME() {
        return ra
    }
    show(i) {
        if (!this._config.isVisible) {
            Ut(i);
            return
        }
        this._append();
        const o = this._getElement();
        this._config.isAnimated && an(o), o.classList.add(Ko), this._emulateAnimation(() => {
            Ut(i)
        })
    }
    hide(i) {
        if (!this._config.isVisible) {
            Ut(i);
            return
        }
        this._getElement().classList.remove(Ko), this._emulateAnimation(() => {
            this.dispose(), Ut(i)
        })
    }
    dispose() {
        this._isAppended && (G.off(this._element, Xo), this._element.remove(), this._isAppended = !1)
    }
    _getElement() {
        if (!this._element) {
            const i = document.createElement("div");
            i.className = this._config.className, this._config.isAnimated && i.classList.add(Ku), this._element = i
        }
        return this._element
    }
    _configAfterMerge(i) {
        return i.rootElement = ri(i.rootElement), i
    }
    _append() {
        if (this._isAppended) return;
        const i = this._getElement();
        this._config.rootElement.append(i), G.on(i, Xo, () => {
            Ut(this._config.clickCallback)
        }), this._isAppended = !0
    }
    _emulateAnimation(i) {
        Vs(i, this._getElement(), this._config.isAnimated)
    }
}
const Qu = "focustrap",
    Ju = "bs.focustrap",
    Pn = `.${Ju}`,
    Zu = `focusin${Pn}`,
    ef = `keydown.tab${Pn}`,
    tf = "Tab",
    nf = "forward",
    Go = "backward",
    rf = {
        autofocus: !0,
        trapElement: null
    },
    of = {
        autofocus: "boolean",
        trapElement: "element"
    };
class sa extends ln {
    constructor(i) {
        super(), this._config = this._getConfig(i), this._isActive = !1, this._lastTabNavDirection = null
    }
    static get Default() {
        return rf
    }
    static get DefaultType() {
        return of
    }
    static get NAME() {
        return Qu
    }
    activate() {
        this._isActive || (this._config.autofocus && this._config.trapElement.focus(), G.off(document, Pn), G.on(document, Zu, i => this._handleFocusin(i)), G.on(document, ef, i => this._handleKeydown(i)), this._isActive = !0)
    }
    deactivate() {
        this._isActive && (this._isActive = !1, G.off(document, Pn))
    }
    _handleFocusin(i) {
        const {
            trapElement: o
        } = this._config;
        if (i.target === document || i.target === o || o.contains(i.target)) return;
        const u = Se.focusableChildren(o);
        u.length === 0 ? o.focus() : this._lastTabNavDirection === Go ? u[u.length - 1].focus() : u[0].focus()
    }
    _handleKeydown(i) {
        i.key === tf && (this._lastTabNavDirection = i.shiftKey ? Go : nf)
    }
}
const sf = "modal",
    af = "bs.modal",
    jt = `.${af}`,
    lf = ".data-api",
    cf = "Escape",
    uf = `hide${jt}`,
    ff = `hidePrevented${jt}`,
    aa = `hidden${jt}`,
    la = `show${jt}`,
    df = `shown${jt}`,
    pf = `resize${jt}`,
    hf = `click.dismiss${jt}`,
    gf = `mousedown.dismiss${jt}`,
    mf = `keydown.dismiss${jt}`,
    vf = `click${jt}${lf}`,
    Qo = "modal-open",
    yf = "fade",
    Jo = "show",
    mr = "modal-static",
    bf = ".modal.show",
    _f = ".modal-dialog",
    wf = ".modal-body",
    Tf = '[data-bs-toggle="modal"]',
    Ef = {
        backdrop: !0,
        focus: !0,
        keyboard: !0
    },
    Sf = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
    };
class Hi extends Ht {
    constructor(i, o) {
        super(i, o), this._dialog = Se.findOne(_f, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Nr, this._addEventListeners()
    }
    static get Default() {
        return Ef
    }
    static get DefaultType() {
        return Sf
    }
    static get NAME() {
        return sf
    }
    toggle(i) {
        return this._isShown ? this.hide() : this.show(i)
    }
    show(i) {
        this._isShown || this._isTransitioning || G.trigger(this._element, la, {
            relatedTarget: i
        }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Qo), this._adjustDialog(), this._backdrop.show(() => this._showElement(i)))
    }
    hide() {
        !this._isShown || this._isTransitioning || G.trigger(this._element, uf).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Jo), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))
    }
    dispose() {
        for (const i of [window, this._dialog]) G.off(i, jt);
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    handleUpdate() {
        this._adjustDialog()
    }
    _initializeBackDrop() {
        return new oa({
            isVisible: !!this._config.backdrop,
            isAnimated: this._isAnimated()
        })
    }
    _initializeFocusTrap() {
        return new sa({
            trapElement: this._element
        })
    }
    _showElement(i) {
        document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
        const o = Se.findOne(wf, this._dialog);
        o && (o.scrollTop = 0), an(this._element), this._element.classList.add(Jo);
        const u = () => {
            this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, G.trigger(this._element, df, {
                relatedTarget: i
            })
        };
        this._queueCallback(u, this._dialog, this._isAnimated())
    }
    _addEventListeners() {
        G.on(this._element, mf, i => {
            if (i.key === cf) {
                if (this._config.keyboard) {
                    i.preventDefault(), this.hide();
                    return
                }
                this._triggerBackdropTransition()
            }
        }), G.on(window, pf, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog()
        }), G.on(this._element, gf, i => {
            G.one(this._element, hf, o => {
                if (!(this._element !== i.target || this._element !== o.target)) {
                    if (this._config.backdrop === "static") {
                        this._triggerBackdropTransition();
                        return
                    }
                    this._config.backdrop && this.hide()
                }
            })
        })
    }
    _hideModal() {
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
            document.body.classList.remove(Qo), this._resetAdjustments(), this._scrollBar.reset(), G.trigger(this._element, aa)
        })
    }
    _isAnimated() {
        return this._element.classList.contains(yf)
    }
    _triggerBackdropTransition() {
        if (G.trigger(this._element, ff).defaultPrevented) return;
        const o = this._element.scrollHeight > document.documentElement.clientHeight,
            u = this._element.style.overflowY;
        u === "hidden" || this._element.classList.contains(mr) || (o || (this._element.style.overflowY = "hidden"), this._element.classList.add(mr), this._queueCallback(() => {
            this._element.classList.remove(mr), this._queueCallback(() => {
                this._element.style.overflowY = u
            }, this._dialog)
        }, this._dialog), this._element.focus())
    }
    _adjustDialog() {
        const i = this._element.scrollHeight > document.documentElement.clientHeight,
            o = this._scrollBar.getWidth(),
            u = o > 0;
        if (u && !i) {
            const t = $t() ? "paddingLeft" : "paddingRight";
            this._element.style[t] = `${o}px`
        }
        if (!u && i) {
            const t = $t() ? "paddingRight" : "paddingLeft";
            this._element.style[t] = `${o}px`
        }
    }
    _resetAdjustments() {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
    }
    static jQueryInterface(i, o) {
        return this.each(function() {
            const u = Hi.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (typeof u[i] > "u") throw new TypeError(`No method named "${i}"`);
                u[i](o)
            }
        })
    }
}
G.on(document, vf, Tf, function(c) {
    const i = Yt(this);
    ["A", "AREA"].includes(this.tagName) && c.preventDefault(), G.one(i, la, t => {
        t.defaultPrevented || G.one(i, aa, () => {
            Wi(this) && this.focus()
        })
    });
    const o = Se.findOne(bf);
    o && Hi.getInstance(o).hide(), Hi.getOrCreateInstance(i).toggle(this)
});
Rn(Hi);
Pt(Hi);
const xf = "offcanvas",
    Cf = "bs.offcanvas",
    Qt = `.${Cf}`,
    ca = ".data-api",
    Af = `load${Qt}${ca}`,
    kf = "Escape",
    Zo = "show",
    es = "showing",
    ts = "hiding",
    Of = "offcanvas-backdrop",
    ua = ".offcanvas.show",
    Nf = `show${Qt}`,
    Lf = `shown${Qt}`,
    Df = `hide${Qt}`,
    is = `hidePrevented${Qt}`,
    fa = `hidden${Qt}`,
    $f = `resize${Qt}`,
    Pf = `click${Qt}${ca}`,
    If = `keydown.dismiss${Qt}`,
    Mf = '[data-bs-toggle="offcanvas"]',
    Hf = {
        backdrop: !0,
        keyboard: !0,
        scroll: !1
    },
    jf = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
    };
class si extends Ht {
    constructor(i, o) {
        super(i, o), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
    }
    static get Default() {
        return Hf
    }
    static get DefaultType() {
        return jf
    }
    static get NAME() {
        return xf
    }
    toggle(i) {
        return this._isShown ? this.hide() : this.show(i)
    }
    show(i) {
        if (this._isShown || G.trigger(this._element, Nf, {
                relatedTarget: i
            }).defaultPrevented) return;
        this._isShown = !0, this._backdrop.show(), this._config.scroll || new Nr().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(es);
        const u = () => {
            (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Zo), this._element.classList.remove(es), G.trigger(this._element, Lf, {
                relatedTarget: i
            })
        };
        this._queueCallback(u, this._element, !0)
    }
    hide() {
        if (!this._isShown || G.trigger(this._element, Df).defaultPrevented) return;
        this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ts), this._backdrop.hide();
        const o = () => {
            this._element.classList.remove(Zo, ts), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Nr().reset(), G.trigger(this._element, fa)
        };
        this._queueCallback(o, this._element, !0)
    }
    dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    _initializeBackDrop() {
        const i = () => {
                if (this._config.backdrop === "static") {
                    G.trigger(this._element, is);
                    return
                }
                this.hide()
            },
            o = !!this._config.backdrop;
        return new oa({
            className: Of,
            isVisible: o,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: o ? i : null
        })
    }
    _initializeFocusTrap() {
        return new sa({
            trapElement: this._element
        })
    }
    _addEventListeners() {
        G.on(this._element, If, i => {
            if (i.key === kf) {
                if (!this._config.keyboard) {
                    G.trigger(this._element, is);
                    return
                }
                this.hide()
            }
        })
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = si.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (o[i] === void 0 || i.startsWith("_") || i === "constructor") throw new TypeError(`No method named "${i}"`);
                o[i](this)
            }
        })
    }
}
G.on(document, Pf, Mf, function(c) {
    const i = Yt(this);
    if (["A", "AREA"].includes(this.tagName) && c.preventDefault(), oi(this)) return;
    G.one(i, fa, () => {
        Wi(this) && this.focus()
    });
    const o = Se.findOne(ua);
    o && o !== i && si.getInstance(o).hide(), si.getOrCreateInstance(i).toggle(this)
});
G.on(window, Af, () => {
    for (const c of Se.find(ua)) si.getOrCreateInstance(c).show()
});
G.on(window, $f, () => {
    for (const c of Se.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(c).position !== "fixed" && si.getOrCreateInstance(c).hide()
});
Rn(si);
Pt(si);
const Rf = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
    Wf = /^aria-[\w-]*$/i,
    qf = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    zf = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    Ff = (c, i) => {
        const o = c.nodeName.toLowerCase();
        return i.includes(o) ? Rf.has(o) ? !!(qf.test(c.nodeValue) || zf.test(c.nodeValue)) : !0 : i.filter(u => u instanceof RegExp).some(u => u.test(o))
    },
    da = {
        "*": ["class", "dir", "id", "lang", "role", Wf],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    };

function Vf(c, i, o) {
    if (!c.length) return c;
    if (o && typeof o == "function") return o(c);
    const t = new window.DOMParser().parseFromString(c, "text/html"),
        r = [].concat(...t.body.querySelectorAll("*"));
    for (const f of r) {
        const h = f.nodeName.toLowerCase();
        if (!Object.keys(i).includes(h)) {
            f.remove();
            continue
        }
        const m = [].concat(...f.attributes),
            w = [].concat(i["*"] || [], i[h] || []);
        for (const S of m) Ff(S, w) || f.removeAttribute(S.nodeName)
    }
    return t.body.innerHTML
}
const Bf = "TemplateFactory",
    Uf = {
        allowList: da,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>"
    },
    Yf = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
    },
    Kf = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
    };
class Xf extends ln {
    constructor(i) {
        super(), this._config = this._getConfig(i)
    }
    static get Default() {
        return Uf
    }
    static get DefaultType() {
        return Yf
    }
    static get NAME() {
        return Bf
    }
    getContent() {
        return Object.values(this._config.content).map(i => this._resolvePossibleFunction(i)).filter(Boolean)
    }
    hasContent() {
        return this.getContent().length > 0
    }
    changeContent(i) {
        return this._checkContent(i), this._config.content = {
            ...this._config.content,
            ...i
        }, this
    }
    toHtml() {
        const i = document.createElement("div");
        i.innerHTML = this._maybeSanitize(this._config.template);
        for (const [t, r] of Object.entries(this._config.content)) this._setContent(i, r, t);
        const o = i.children[0],
            u = this._resolvePossibleFunction(this._config.extraClass);
        return u && o.classList.add(...u.split(" ")), o
    }
    _typeCheckConfig(i) {
        super._typeCheckConfig(i), this._checkContent(i.content)
    }
    _checkContent(i) {
        for (const [o, u] of Object.entries(i)) super._typeCheckConfig({
            selector: o,
            entry: u
        }, Kf)
    }
    _setContent(i, o, u) {
        const t = Se.findOne(u, i);
        if (t) {
            if (o = this._resolvePossibleFunction(o), !o) {
                t.remove();
                return
            }
            if (Kt(o)) {
                this._putElementInTemplate(ri(o), t);
                return
            }
            if (this._config.html) {
                t.innerHTML = this._maybeSanitize(o);
                return
            }
            t.textContent = o
        }
    }
    _maybeSanitize(i) {
        return this._config.sanitize ? Vf(i, this._config.allowList, this._config.sanitizeFn) : i
    }
    _resolvePossibleFunction(i) {
        return typeof i == "function" ? i(this) : i
    }
    _putElementInTemplate(i, o) {
        if (this._config.html) {
            o.innerHTML = "", o.append(i);
            return
        }
        o.textContent = i.textContent
    }
}
const Gf = "tooltip",
    Qf = new Set(["sanitize", "allowList", "sanitizeFn"]),
    vr = "fade",
    Jf = "modal",
    xn = "show",
    Zf = ".tooltip-inner",
    ns = `.${Jf}`,
    rs = "hide.bs.modal",
    tn = "hover",
    yr = "focus",
    ed = "click",
    td = "manual",
    id = "hide",
    nd = "hidden",
    rd = "show",
    od = "shown",
    sd = "inserted",
    ad = "click",
    ld = "focusin",
    cd = "focusout",
    ud = "mouseenter",
    fd = "mouseleave",
    dd = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: $t() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: $t() ? "right" : "left"
    },
    pd = {
        allowList: da,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 0],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus"
    },
    hd = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
    };
class zi extends Ht {
    constructor(i, o) {
        if (typeof js > "u") throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
        super(i, o), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
    }
    static get Default() {
        return pd
    }
    static get DefaultType() {
        return hd
    }
    static get NAME() {
        return Gf
    }
    enable() {
        this._isEnabled = !0
    }
    disable() {
        this._isEnabled = !1
    }
    toggleEnabled() {
        this._isEnabled = !this._isEnabled
    }
    toggle() {
        if (this._isEnabled) {
            if (this._activeTrigger.click = !this._activeTrigger.click, this._isShown()) {
                this._leave();
                return
            }
            this._enter()
        }
    }
    dispose() {
        clearTimeout(this._timeout), G.off(this._element.closest(ns), rs, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
    }
    show() {
        if (this._element.style.display === "none") throw new Error("Please use show on visible elements");
        if (!(this._isWithContent() && this._isEnabled)) return;
        const i = G.trigger(this._element, this.constructor.eventName(rd)),
            u = (zs(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (i.defaultPrevented || !u) return;
        this._disposePopper();
        const t = this._getTipElement();
        this._element.setAttribute("aria-describedby", t.getAttribute("id"));
        const {
            container: r
        } = this._config;
        if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(t), G.trigger(this._element, this.constructor.eventName(sd))), this._popper = this._createPopper(t), t.classList.add(xn), "ontouchstart" in document.documentElement)
            for (const h of [].concat(...document.body.children)) G.on(h, "mouseover", Dn);
        const f = () => {
            G.trigger(this._element, this.constructor.eventName(od)), this._isHovered === !1 && this._leave(), this._isHovered = !1
        };
        this._queueCallback(f, this.tip, this._isAnimated())
    }
    hide() {
        if (!this._isShown() || G.trigger(this._element, this.constructor.eventName(id)).defaultPrevented) return;
        if (this._getTipElement().classList.remove(xn), "ontouchstart" in document.documentElement)
            for (const t of [].concat(...document.body.children)) G.off(t, "mouseover", Dn);
        this._activeTrigger[ed] = !1, this._activeTrigger[yr] = !1, this._activeTrigger[tn] = !1, this._isHovered = null;
        const u = () => {
            this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), G.trigger(this._element, this.constructor.eventName(nd)))
        };
        this._queueCallback(u, this.tip, this._isAnimated())
    }
    update() {
        this._popper && this._popper.update()
    }
    _isWithContent() {
        return !!this._getTitle()
    }
    _getTipElement() {
        return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
    }
    _createTipElement(i) {
        const o = this._getTemplateFactory(i).toHtml();
        if (!o) return null;
        o.classList.remove(vr, xn), o.classList.add(`bs-${this.constructor.NAME}-auto`);
        const u = Jl(this.constructor.NAME).toString();
        return o.setAttribute("id", u), this._isAnimated() && o.classList.add(vr), o
    }
    setContent(i) {
        this._newContent = i, this._isShown() && (this._disposePopper(), this.show())
    }
    _getTemplateFactory(i) {
        return this._templateFactory ? this._templateFactory.changeContent(i) : this._templateFactory = new Xf({
            ...this._config,
            content: i,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
        }), this._templateFactory
    }
    _getContentForTemplate() {
        return {
            [Zf]: this._getTitle()
        }
    }
    _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
    }
    _initializeOnDelegatedTarget(i) {
        return this.constructor.getOrCreateInstance(i.delegateTarget, this._getDelegateConfig())
    }
    _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(vr)
    }
    _isShown() {
        return this.tip && this.tip.classList.contains(xn)
    }
    _createPopper(i) {
        const o = typeof this._config.placement == "function" ? this._config.placement.call(this, i, this._element) : this._config.placement,
            u = dd[o.toUpperCase()];
        return Br(this._element, i, this._getPopperConfig(u))
    }
    _getOffset() {
        const {
            offset: i
        } = this._config;
        return typeof i == "string" ? i.split(",").map(o => Number.parseInt(o, 10)) : typeof i == "function" ? o => i(o, this._element) : i
    }
    _resolvePossibleFunction(i) {
        return typeof i == "function" ? i.call(this._element) : i
    }
    _getPopperConfig(i) {
        const o = {
            placement: i,
            modifiers: [{
                name: "flip",
                options: {
                    fallbackPlacements: this._config.fallbackPlacements
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }, {
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "arrow",
                options: {
                    element: `.${this.constructor.NAME}-arrow`
                }
            }, {
                name: "preSetPlacement",
                enabled: !0,
                phase: "beforeMain",
                fn: u => {
                    this._getTipElement().setAttribute("data-popper-placement", u.state.placement)
                }
            }]
        };
        return {
            ...o,
            ...typeof this._config.popperConfig == "function" ? this._config.popperConfig(o) : this._config.popperConfig
        }
    }
    _setListeners() {
        const i = this._config.trigger.split(" ");
        for (const o of i)
            if (o === "click") G.on(this._element, this.constructor.eventName(ad), this._config.selector, u => {
                this._initializeOnDelegatedTarget(u).toggle()
            });
            else if (o !== td) {
            const u = o === tn ? this.constructor.eventName(ud) : this.constructor.eventName(ld),
                t = o === tn ? this.constructor.eventName(fd) : this.constructor.eventName(cd);
            G.on(this._element, u, this._config.selector, r => {
                const f = this._initializeOnDelegatedTarget(r);
                f._activeTrigger[r.type === "focusin" ? yr : tn] = !0, f._enter()
            }), G.on(this._element, t, this._config.selector, r => {
                const f = this._initializeOnDelegatedTarget(r);
                f._activeTrigger[r.type === "focusout" ? yr : tn] = f._element.contains(r.relatedTarget), f._leave()
            })
        }
        this._hideModalHandler = () => {
            this._element && this.hide()
        }, G.on(this._element.closest(ns), rs, this._hideModalHandler)
    }
    _fixTitle() {
        const i = this._element.getAttribute("title");
        i && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", i), this._element.setAttribute("data-bs-original-title", i), this._element.removeAttribute("title"))
    }
    _enter() {
        if (this._isShown() || this._isHovered) {
            this._isHovered = !0;
            return
        }
        this._isHovered = !0, this._setTimeout(() => {
            this._isHovered && this.show()
        }, this._config.delay.show)
    }
    _leave() {
        this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
            this._isHovered || this.hide()
        }, this._config.delay.hide))
    }
    _setTimeout(i, o) {
        clearTimeout(this._timeout), this._timeout = setTimeout(i, o)
    }
    _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0)
    }
    _getConfig(i) {
        const o = Xt.getDataAttributes(this._element);
        for (const u of Object.keys(o)) Qf.has(u) && delete o[u];
        return i = {
            ...o,
            ...typeof i == "object" && i ? i : {}
        }, i = this._mergeConfigObj(i), i = this._configAfterMerge(i), this._typeCheckConfig(i), i
    }
    _configAfterMerge(i) {
        return i.container = i.container === !1 ? document.body : ri(i.container), typeof i.delay == "number" && (i.delay = {
            show: i.delay,
            hide: i.delay
        }), typeof i.title == "number" && (i.title = i.title.toString()), typeof i.content == "number" && (i.content = i.content.toString()), i
    }
    _getDelegateConfig() {
        const i = {};
        for (const o in this._config) this.constructor.Default[o] !== this._config[o] && (i[o] = this._config[o]);
        return i.selector = !1, i.trigger = "manual", i
    }
    _disposePopper() {
        this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = zi.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (typeof o[i] > "u") throw new TypeError(`No method named "${i}"`);
                o[i]()
            }
        })
    }
}
Pt(zi);
const gd = "popover",
    md = ".popover-header",
    vd = ".popover-body",
    yd = {
        ...zi.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click"
    },
    bd = {
        ...zi.DefaultType,
        content: "(null|string|element|function)"
    };
class Xr extends zi {
    static get Default() {
        return yd
    }
    static get DefaultType() {
        return bd
    }
    static get NAME() {
        return gd
    }
    _isWithContent() {
        return this._getTitle() || this._getContent()
    }
    _getContentForTemplate() {
        return {
            [md]: this._getTitle(),
            [vd]: this._getContent()
        }
    }
    _getContent() {
        return this._resolvePossibleFunction(this._config.content)
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = Xr.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (typeof o[i] > "u") throw new TypeError(`No method named "${i}"`);
                o[i]()
            }
        })
    }
}
Pt(Xr);
const _d = "scrollspy",
    wd = "bs.scrollspy",
    Gr = `.${wd}`,
    Td = ".data-api",
    Ed = `activate${Gr}`,
    os = `click${Gr}`,
    Sd = `load${Gr}${Td}`,
    xd = "dropdown-item",
    Ai = "active",
    Cd = '[data-bs-spy="scroll"]',
    br = "[href]",
    Ad = ".nav, .list-group",
    ss = ".nav-link",
    kd = ".nav-item",
    Od = ".list-group-item",
    Nd = `${ss}, ${kd} > ${ss}, ${Od}`,
    Ld = ".dropdown",
    Dd = ".dropdown-toggle",
    $d = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [.1, .5, 1]
    },
    Pd = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array"
    };
class zn extends Ht {
    constructor(i, o) {
        super(i, o), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0
        }, this.refresh()
    }
    static get Default() {
        return $d
    }
    static get DefaultType() {
        return Pd
    }
    static get NAME() {
        return _d
    }
    refresh() {
        this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
        for (const i of this._observableSections.values()) this._observer.observe(i)
    }
    dispose() {
        this._observer.disconnect(), super.dispose()
    }
    _configAfterMerge(i) {
        return i.target = ri(i.target) || document.body, i.rootMargin = i.offset ? `${i.offset}px 0px -30%` : i.rootMargin, typeof i.threshold == "string" && (i.threshold = i.threshold.split(",").map(o => Number.parseFloat(o))), i
    }
    _maybeEnableSmoothScroll() {
        this._config.smoothScroll && (G.off(this._config.target, os), G.on(this._config.target, os, br, i => {
            const o = this._observableSections.get(i.target.hash);
            if (o) {
                i.preventDefault();
                const u = this._rootElement || window,
                    t = o.offsetTop - this._element.offsetTop;
                if (u.scrollTo) {
                    u.scrollTo({
                        top: t,
                        behavior: "smooth"
                    });
                    return
                }
                u.scrollTop = t
            }
        }))
    }
    _getNewObserver() {
        const i = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin
        };
        return new IntersectionObserver(o => this._observerCallback(o), i)
    }
    _observerCallback(i) {
        const o = f => this._targetLinks.get(`#${f.target.id}`),
            u = f => {
                this._previousScrollData.visibleEntryTop = f.target.offsetTop, this._process(o(f))
            },
            t = (this._rootElement || document.documentElement).scrollTop,
            r = t >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = t;
        for (const f of i) {
            if (!f.isIntersecting) {
                this._activeTarget = null, this._clearActiveClass(o(f));
                continue
            }
            const h = f.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (r && h) {
                if (u(f), !t) return;
                continue
            }!r && !h && u(f)
        }
    }
    _initializeTargetsAndObservables() {
        this._targetLinks = new Map, this._observableSections = new Map;
        const i = Se.find(br, this._config.target);
        for (const o of i) {
            if (!o.hash || oi(o)) continue;
            const u = Se.findOne(o.hash, this._element);
            Wi(u) && (this._targetLinks.set(o.hash, o), this._observableSections.set(o.hash, u))
        }
    }
    _process(i) {
        this._activeTarget !== i && (this._clearActiveClass(this._config.target), this._activeTarget = i, i.classList.add(Ai), this._activateParents(i), G.trigger(this._element, Ed, {
            relatedTarget: i
        }))
    }
    _activateParents(i) {
        if (i.classList.contains(xd)) {
            Se.findOne(Dd, i.closest(Ld)).classList.add(Ai);
            return
        }
        for (const o of Se.parents(i, Ad))
            for (const u of Se.prev(o, Nd)) u.classList.add(Ai)
    }
    _clearActiveClass(i) {
        i.classList.remove(Ai);
        const o = Se.find(`${br}.${Ai}`, i);
        for (const u of o) u.classList.remove(Ai)
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = zn.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (o[i] === void 0 || i.startsWith("_") || i === "constructor") throw new TypeError(`No method named "${i}"`);
                o[i]()
            }
        })
    }
}
G.on(window, Sd, () => {
    for (const c of Se.find(Cd)) zn.getOrCreateInstance(c)
});
Pt(zn);
const Id = "tab",
    Md = "bs.tab",
    Ei = `.${Md}`,
    Hd = `hide${Ei}`,
    jd = `hidden${Ei}`,
    Rd = `show${Ei}`,
    Wd = `shown${Ei}`,
    qd = `click${Ei}`,
    zd = `keydown${Ei}`,
    Fd = `load${Ei}`,
    Vd = "ArrowLeft",
    as = "ArrowRight",
    Bd = "ArrowUp",
    ls = "ArrowDown",
    yi = "active",
    cs = "fade",
    _r = "show",
    Ud = "dropdown",
    Yd = ".dropdown-toggle",
    Kd = ".dropdown-menu",
    wr = ":not(.dropdown-toggle)",
    Xd = '.list-group, .nav, [role="tablist"]',
    Gd = ".nav-item, .list-group-item",
    Qd = `.nav-link${wr}, .list-group-item${wr}, [role="tab"]${wr}`,
    pa = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Tr = `${Qd}, ${pa}`,
    Jd = `.${yi}[data-bs-toggle="tab"], .${yi}[data-bs-toggle="pill"], .${yi}[data-bs-toggle="list"]`;
class ji extends Ht {
    constructor(i) {
        super(i), this._parent = this._element.closest(Xd), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), G.on(this._element, zd, o => this._keydown(o)))
    }
    static get NAME() {
        return Id
    }
    show() {
        const i = this._element;
        if (this._elemIsActive(i)) return;
        const o = this._getActiveElem(),
            u = o ? G.trigger(o, Hd, {
                relatedTarget: i
            }) : null;
        G.trigger(i, Rd, {
            relatedTarget: o
        }).defaultPrevented || u && u.defaultPrevented || (this._deactivate(o, i), this._activate(i, o))
    }
    _activate(i, o) {
        if (!i) return;
        i.classList.add(yi), this._activate(Yt(i));
        const u = () => {
            if (i.getAttribute("role") !== "tab") {
                i.classList.add(_r);
                return
            }
            i.removeAttribute("tabindex"), i.setAttribute("aria-selected", !0), this._toggleDropDown(i, !0), G.trigger(i, Wd, {
                relatedTarget: o
            })
        };
        this._queueCallback(u, i, i.classList.contains(cs))
    }
    _deactivate(i, o) {
        if (!i) return;
        i.classList.remove(yi), i.blur(), this._deactivate(Yt(i));
        const u = () => {
            if (i.getAttribute("role") !== "tab") {
                i.classList.remove(_r);
                return
            }
            i.setAttribute("aria-selected", !1), i.setAttribute("tabindex", "-1"), this._toggleDropDown(i, !1), G.trigger(i, jd, {
                relatedTarget: o
            })
        };
        this._queueCallback(u, i, i.classList.contains(cs))
    }
    _keydown(i) {
        if (![Vd, as, Bd, ls].includes(i.key)) return;
        i.stopPropagation(), i.preventDefault();
        const o = [as, ls].includes(i.key),
            u = Ur(this._getChildren().filter(t => !oi(t)), i.target, o, !0);
        u && (u.focus({
            preventScroll: !0
        }), ji.getOrCreateInstance(u).show())
    }
    _getChildren() {
        return Se.find(Tr, this._parent)
    }
    _getActiveElem() {
        return this._getChildren().find(i => this._elemIsActive(i)) || null
    }
    _setInitialAttributes(i, o) {
        this._setAttributeIfNotExists(i, "role", "tablist");
        for (const u of o) this._setInitialAttributesOnChild(u)
    }
    _setInitialAttributesOnChild(i) {
        i = this._getInnerElement(i);
        const o = this._elemIsActive(i),
            u = this._getOuterElement(i);
        i.setAttribute("aria-selected", o), u !== i && this._setAttributeIfNotExists(u, "role", "presentation"), o || i.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(i, "role", "tab"), this._setInitialAttributesOnTargetPanel(i)
    }
    _setInitialAttributesOnTargetPanel(i) {
        const o = Yt(i);
        o && (this._setAttributeIfNotExists(o, "role", "tabpanel"), i.id && this._setAttributeIfNotExists(o, "aria-labelledby", `#${i.id}`))
    }
    _toggleDropDown(i, o) {
        const u = this._getOuterElement(i);
        if (!u.classList.contains(Ud)) return;
        const t = (r, f) => {
            const h = Se.findOne(r, u);
            h && h.classList.toggle(f, o)
        };
        t(Yd, yi), t(Kd, _r), u.setAttribute("aria-expanded", o)
    }
    _setAttributeIfNotExists(i, o, u) {
        i.hasAttribute(o) || i.setAttribute(o, u)
    }
    _elemIsActive(i) {
        return i.classList.contains(yi)
    }
    _getInnerElement(i) {
        return i.matches(Tr) ? i : Se.findOne(Tr, i)
    }
    _getOuterElement(i) {
        return i.closest(Gd) || i
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = ji.getOrCreateInstance(this);
            if (typeof i == "string") {
                if (o[i] === void 0 || i.startsWith("_") || i === "constructor") throw new TypeError(`No method named "${i}"`);
                o[i]()
            }
        })
    }
}
G.on(document, qd, pa, function(c) {
    ["A", "AREA"].includes(this.tagName) && c.preventDefault(), !oi(this) && ji.getOrCreateInstance(this).show()
});
G.on(window, Fd, () => {
    for (const c of Se.find(Jd)) ji.getOrCreateInstance(c)
});
Pt(ji);
const Zd = "toast",
    ep = "bs.toast",
    ci = `.${ep}`,
    tp = `mouseover${ci}`,
    ip = `mouseout${ci}`,
    np = `focusin${ci}`,
    rp = `focusout${ci}`,
    op = `hide${ci}`,
    sp = `hidden${ci}`,
    ap = `show${ci}`,
    lp = `shown${ci}`,
    cp = "fade",
    us = "hide",
    Cn = "show",
    An = "showing",
    up = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    },
    fp = {
        animation: !0,
        autohide: !0,
        delay: 5e3
    };
class Fn extends Ht {
    constructor(i, o) {
        super(i, o), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
    }
    static get Default() {
        return fp
    }
    static get DefaultType() {
        return up
    }
    static get NAME() {
        return Zd
    }
    show() {
        if (G.trigger(this._element, ap).defaultPrevented) return;
        this._clearTimeout(), this._config.animation && this._element.classList.add(cp);
        const o = () => {
            this._element.classList.remove(An), G.trigger(this._element, lp), this._maybeScheduleHide()
        };
        this._element.classList.remove(us), an(this._element), this._element.classList.add(Cn, An), this._queueCallback(o, this._element, this._config.animation)
    }
    hide() {
        if (!this.isShown() || G.trigger(this._element, op).defaultPrevented) return;
        const o = () => {
            this._element.classList.add(us), this._element.classList.remove(An, Cn), G.trigger(this._element, sp)
        };
        this._element.classList.add(An), this._queueCallback(o, this._element, this._config.animation)
    }
    dispose() {
        this._clearTimeout(), this.isShown() && this._element.classList.remove(Cn), super.dispose()
    }
    isShown() {
        return this._element.classList.contains(Cn)
    }
    _maybeScheduleHide() {
        this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
            this.hide()
        }, this._config.delay)))
    }
    _onInteraction(i, o) {
        switch (i.type) {
            case "mouseover":
            case "mouseout": {
                this._hasMouseInteraction = o;
                break
            }
            case "focusin":
            case "focusout": {
                this._hasKeyboardInteraction = o;
                break
            }
        }
        if (o) {
            this._clearTimeout();
            return
        }
        const u = i.relatedTarget;
        this._element === u || this._element.contains(u) || this._maybeScheduleHide()
    }
    _setListeners() {
        G.on(this._element, tp, i => this._onInteraction(i, !0)), G.on(this._element, ip, i => this._onInteraction(i, !1)), G.on(this._element, np, i => this._onInteraction(i, !0)), G.on(this._element, rp, i => this._onInteraction(i, !1))
    }
    _clearTimeout() {
        clearTimeout(this._timeout), this._timeout = null
    }
    static jQueryInterface(i) {
        return this.each(function() {
            const o = Fn.getOrCreateInstance(this, i);
            if (typeof i == "string") {
                if (typeof o[i] > "u") throw new TypeError(`No method named "${i}"`);
                o[i](this)
            }
        })
    }
}
Rn(Fn);
Pt(Fn);
var ha = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function ga(c) {
    return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c
}
var fs = {},
    dp = {
        get exports() {
            return fs
        },
        set exports(c) {
            fs = c
        }
    },
    In = {},
    pp = {
        get exports() {
            return In
        },
        set exports(c) {
            In = c
        }
    };
/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-03-08T15:28Z
 */
var ds;

function ma() {
    return ds || (ds = 1, function(c) {
        (function(i, o) {
            c.exports = i.document ? o(i, !0) : function(u) {
                if (!u.document) throw new Error("jQuery requires a window with a document");
                return o(u)
            }
        })(typeof window < "u" ? window : ha, function(i, o) {
            var u = [],
                t = Object.getPrototypeOf,
                r = u.slice,
                f = u.flat ? function(e) {
                    return u.flat.call(e)
                } : function(e) {
                    return u.concat.apply([], e)
                },
                h = u.push,
                m = u.indexOf,
                w = {},
                S = w.toString,
                I = w.hasOwnProperty,
                N = I.toString,
                K = N.call(Object),
                D = {},
                A = function(n) {
                    return typeof n == "function" && typeof n.nodeType != "number" && typeof n.item != "function"
                },
                B = function(n) {
                    return n != null && n === n.window
                },
                R = i.document,
                re = {
                    type: !0,
                    src: !0,
                    nonce: !0,
                    noModule: !0
                };

            function ue(e, n, s) {
                s = s || R;
                var a, d, p = s.createElement("script");
                if (p.text = e, n)
                    for (a in re) d = n[a] || n.getAttribute && n.getAttribute(a), d && p.setAttribute(a, d);
                s.head.appendChild(p).parentNode.removeChild(p)
            }

            function se(e) {
                return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? w[S.call(e)] || "object" : typeof e
            }
            var ve = "3.6.4",
                l = function(e, n) {
                    return new l.fn.init(e, n)
                };
            l.fn = l.prototype = {
                jquery: ve,
                constructor: l,
                length: 0,
                toArray: function() {
                    return r.call(this)
                },
                get: function(e) {
                    return e == null ? r.call(this) : e < 0 ? this[e + this.length] : this[e]
                },
                pushStack: function(e) {
                    var n = l.merge(this.constructor(), e);
                    return n.prevObject = this, n
                },
                each: function(e) {
                    return l.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(l.map(this, function(n, s) {
                        return e.call(n, s, n)
                    }))
                },
                slice: function() {
                    return this.pushStack(r.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                even: function() {
                    return this.pushStack(l.grep(this, function(e, n) {
                        return (n + 1) % 2
                    }))
                },
                odd: function() {
                    return this.pushStack(l.grep(this, function(e, n) {
                        return n % 2
                    }))
                },
                eq: function(e) {
                    var n = this.length,
                        s = +e + (e < 0 ? n : 0);
                    return this.pushStack(s >= 0 && s < n ? [this[s]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: h,
                sort: u.sort,
                splice: u.splice
            }, l.extend = l.fn.extend = function() {
                var e, n, s, a, d, p, g = arguments[0] || {},
                    _ = 1,
                    y = arguments.length,
                    k = !1;
                for (typeof g == "boolean" && (k = g, g = arguments[_] || {}, _++), typeof g != "object" && !A(g) && (g = {}), _ === y && (g = this, _--); _ < y; _++)
                    if ((e = arguments[_]) != null)
                        for (n in e) a = e[n], !(n === "__proto__" || g === a) && (k && a && (l.isPlainObject(a) || (d = Array.isArray(a))) ? (s = g[n], d && !Array.isArray(s) ? p = [] : !d && !l.isPlainObject(s) ? p = {} : p = s, d = !1, g[n] = l.extend(k, p, a)) : a !== void 0 && (g[n] = a));
                return g
            }, l.extend({
                expando: "jQuery" + (ve + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isPlainObject: function(e) {
                    var n, s;
                    return !e || S.call(e) !== "[object Object]" ? !1 : (n = t(e), n ? (s = I.call(n, "constructor") && n.constructor, typeof s == "function" && N.call(s) === K) : !0)
                },
                isEmptyObject: function(e) {
                    var n;
                    for (n in e) return !1;
                    return !0
                },
                globalEval: function(e, n, s) {
                    ue(e, {
                        nonce: n && n.nonce
                    }, s)
                },
                each: function(e, n) {
                    var s, a = 0;
                    if (xe(e))
                        for (s = e.length; a < s && n.call(e[a], a, e[a]) !== !1; a++);
                    else
                        for (a in e)
                            if (n.call(e[a], a, e[a]) === !1) break;
                    return e
                },
                makeArray: function(e, n) {
                    var s = n || [];
                    return e != null && (xe(Object(e)) ? l.merge(s, typeof e == "string" ? [e] : e) : h.call(s, e)), s
                },
                inArray: function(e, n, s) {
                    return n == null ? -1 : m.call(n, e, s)
                },
                merge: function(e, n) {
                    for (var s = +n.length, a = 0, d = e.length; a < s; a++) e[d++] = n[a];
                    return e.length = d, e
                },
                grep: function(e, n, s) {
                    for (var a, d = [], p = 0, g = e.length, _ = !s; p < g; p++) a = !n(e[p], p), a !== _ && d.push(e[p]);
                    return d
                },
                map: function(e, n, s) {
                    var a, d, p = 0,
                        g = [];
                    if (xe(e))
                        for (a = e.length; p < a; p++) d = n(e[p], p, s), d != null && g.push(d);
                    else
                        for (p in e) d = n(e[p], p, s), d != null && g.push(d);
                    return f(g)
                },
                guid: 1,
                support: D
            }), typeof Symbol == "function" && (l.fn[Symbol.iterator] = u[Symbol.iterator]), l.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, n) {
                w["[object " + n + "]"] = n.toLowerCase()
            });

            function xe(e) {
                var n = !!e && "length" in e && e.length,
                    s = se(e);
                return A(e) || B(e) ? !1 : s === "array" || n === 0 || typeof n == "number" && n > 0 && n - 1 in e
            }
            var fe = function(e) {
                var n, s, a, d, p, g, _, y, k, $, U, L, M, ce, be, le, ot, nt, wt, ze = "sizzle" + 1 * new Date,
                    ye = e.document,
                    vt = 0,
                    Pe = 0,
                    Je = vn(),
                    Gi = vn(),
                    hn = vn(),
                    Tt = vn(),
                    di = function(v, b) {
                        return v === b && (U = !0), 0
                    },
                    pi = {}.hasOwnProperty,
                    yt = [],
                    ti = yt.pop,
                    Nt = yt.push,
                    ii = yt.push,
                    wo = yt.slice,
                    hi = function(v, b) {
                        for (var E = 0, W = v.length; E < W; E++)
                            if (v[E] === b) return E;
                        return -1
                    },
                    ir = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    Me = "[\\x20\\t\\r\\n\\f]",
                    gi = "(?:\\\\[\\da-fA-F]{1,6}" + Me + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                    To = "\\[" + Me + "*(" + gi + ")(?:" + Me + "*([*^$|!~]?=)" + Me + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + gi + "))|)" + Me + "*\\]",
                    nr = ":(" + gi + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + To + ")*)|.*)\\)|)",
                    Xa = new RegExp(Me + "+", "g"),
                    gn = new RegExp("^" + Me + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Me + "+$", "g"),
                    Ga = new RegExp("^" + Me + "*," + Me + "*"),
                    Eo = new RegExp("^" + Me + "*([>+~]|" + Me + ")" + Me + "*"),
                    Qa = new RegExp(Me + "|>"),
                    Ja = new RegExp(nr),
                    Za = new RegExp("^" + gi + "$"),
                    mn = {
                        ID: new RegExp("^#(" + gi + ")"),
                        CLASS: new RegExp("^\\.(" + gi + ")"),
                        TAG: new RegExp("^(" + gi + "|[*])"),
                        ATTR: new RegExp("^" + To),
                        PSEUDO: new RegExp("^" + nr),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + Me + "*(even|odd|(([+-]|)(\\d*)n|)" + Me + "*(?:([+-]|)" + Me + "*(\\d+)|))" + Me + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + ir + ")$", "i"),
                        needsContext: new RegExp("^" + Me + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + Me + "*((?:-\\d)?\\d*)" + Me + "*\\)|)(?=[^-]|$)", "i")
                    },
                    el = /HTML$/i,
                    tl = /^(?:input|select|textarea|button)$/i,
                    il = /^h\d$/i,
                    Qi = /^[^{]+\{\s*\[native \w/,
                    nl = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    rr = /[+~]/,
                    Vt = new RegExp("\\\\[\\da-fA-F]{1,6}" + Me + "?|\\\\([^\\r\\n\\f])", "g"),
                    Bt = function(v, b) {
                        var E = "0x" + v.slice(1) - 65536;
                        return b || (E < 0 ? String.fromCharCode(E + 65536) : String.fromCharCode(E >> 10 | 55296, E & 1023 | 56320))
                    },
                    So = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    xo = function(v, b) {
                        return b ? v === "\0" ? "�" : v.slice(0, -1) + "\\" + v.charCodeAt(v.length - 1).toString(16) + " " : "\\" + v
                    },
                    Co = function() {
                        L()
                    },
                    rl = bn(function(v) {
                        return v.disabled === !0 && v.nodeName.toLowerCase() === "fieldset"
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                try {
                    ii.apply(yt = wo.call(ye.childNodes), ye.childNodes), yt[ye.childNodes.length].nodeType
                } catch {
                    ii = {
                        apply: yt.length ? function(b, E) {
                            Nt.apply(b, wo.call(E))
                        } : function(b, E) {
                            for (var W = b.length, C = 0; b[W++] = E[C++];);
                            b.length = W - 1
                        }
                    }
                }

                function Ve(v, b, E, W) {
                    var C, F, Y, Z, ie, pe, de, me = b && b.ownerDocument,
                        Oe = b ? b.nodeType : 9;
                    if (E = E || [], typeof v != "string" || !v || Oe !== 1 && Oe !== 9 && Oe !== 11) return E;
                    if (!W && (L(b), b = b || M, be)) {
                        if (Oe !== 11 && (ie = nl.exec(v)))
                            if (C = ie[1]) {
                                if (Oe === 9)
                                    if (Y = b.getElementById(C)) {
                                        if (Y.id === C) return E.push(Y), E
                                    } else return E;
                                else if (me && (Y = me.getElementById(C)) && wt(b, Y) && Y.id === C) return E.push(Y), E
                            } else {
                                if (ie[2]) return ii.apply(E, b.getElementsByTagName(v)), E;
                                if ((C = ie[3]) && s.getElementsByClassName && b.getElementsByClassName) return ii.apply(E, b.getElementsByClassName(C)), E
                            } if (s.qsa && !Tt[v + " "] && (!le || !le.test(v)) && (Oe !== 1 || b.nodeName.toLowerCase() !== "object")) {
                            if (de = v, me = b, Oe === 1 && (Qa.test(v) || Eo.test(v))) {
                                for (me = rr.test(v) && sr(b.parentNode) || b, (me !== b || !s.scope) && ((Z = b.getAttribute("id")) ? Z = Z.replace(So, xo) : b.setAttribute("id", Z = ze)), pe = g(v), F = pe.length; F--;) pe[F] = (Z ? "#" + Z : ":scope") + " " + yn(pe[F]);
                                de = pe.join(",")
                            }
                            try {
                                return ii.apply(E, me.querySelectorAll(de)), E
                            } catch {
                                Tt(v, !0)
                            } finally {
                                Z === ze && b.removeAttribute("id")
                            }
                        }
                    }
                    return y(v.replace(gn, "$1"), b, E, W)
                }

                function vn() {
                    var v = [];

                    function b(E, W) {
                        return v.push(E + " ") > a.cacheLength && delete b[v.shift()], b[E + " "] = W
                    }
                    return b
                }

                function Mt(v) {
                    return v[ze] = !0, v
                }

                function Lt(v) {
                    var b = M.createElement("fieldset");
                    try {
                        return !!v(b)
                    } catch {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b), b = null
                    }
                }

                function or(v, b) {
                    for (var E = v.split("|"), W = E.length; W--;) a.attrHandle[E[W]] = b
                }

                function Ao(v, b) {
                    var E = b && v,
                        W = E && v.nodeType === 1 && b.nodeType === 1 && v.sourceIndex - b.sourceIndex;
                    if (W) return W;
                    if (E) {
                        for (; E = E.nextSibling;)
                            if (E === b) return -1
                    }
                    return v ? 1 : -1
                }

                function ol(v) {
                    return function(b) {
                        var E = b.nodeName.toLowerCase();
                        return E === "input" && b.type === v
                    }
                }

                function sl(v) {
                    return function(b) {
                        var E = b.nodeName.toLowerCase();
                        return (E === "input" || E === "button") && b.type === v
                    }
                }

                function ko(v) {
                    return function(b) {
                        return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === v : b.disabled === v : b.isDisabled === v || b.isDisabled !== !v && rl(b) === v : b.disabled === v : "label" in b ? b.disabled === v : !1
                    }
                }

                function mi(v) {
                    return Mt(function(b) {
                        return b = +b, Mt(function(E, W) {
                            for (var C, F = v([], E.length, b), Y = F.length; Y--;) E[C = F[Y]] && (E[C] = !(W[C] = E[C]))
                        })
                    })
                }

                function sr(v) {
                    return v && typeof v.getElementsByTagName < "u" && v
                }
                s = Ve.support = {}, p = Ve.isXML = function(v) {
                    var b = v && v.namespaceURI,
                        E = v && (v.ownerDocument || v).documentElement;
                    return !el.test(b || E && E.nodeName || "HTML")
                }, L = Ve.setDocument = function(v) {
                    var b, E, W = v ? v.ownerDocument || v : ye;
                    return W == M || W.nodeType !== 9 || !W.documentElement || (M = W, ce = M.documentElement, be = !p(M), ye != M && (E = M.defaultView) && E.top !== E && (E.addEventListener ? E.addEventListener("unload", Co, !1) : E.attachEvent && E.attachEvent("onunload", Co)), s.scope = Lt(function(C) {
                        return ce.appendChild(C).appendChild(M.createElement("div")), typeof C.querySelectorAll < "u" && !C.querySelectorAll(":scope fieldset div").length
                    }), s.cssHas = Lt(function() {
                        try {
                            return M.querySelector(":has(*,:jqfake)"), !1
                        } catch {
                            return !0
                        }
                    }), s.attributes = Lt(function(C) {
                        return C.className = "i", !C.getAttribute("className")
                    }), s.getElementsByTagName = Lt(function(C) {
                        return C.appendChild(M.createComment("")), !C.getElementsByTagName("*").length
                    }), s.getElementsByClassName = Qi.test(M.getElementsByClassName), s.getById = Lt(function(C) {
                        return ce.appendChild(C).id = ze, !M.getElementsByName || !M.getElementsByName(ze).length
                    }), s.getById ? (a.filter.ID = function(C) {
                        var F = C.replace(Vt, Bt);
                        return function(Y) {
                            return Y.getAttribute("id") === F
                        }
                    }, a.find.ID = function(C, F) {
                        if (typeof F.getElementById < "u" && be) {
                            var Y = F.getElementById(C);
                            return Y ? [Y] : []
                        }
                    }) : (a.filter.ID = function(C) {
                        var F = C.replace(Vt, Bt);
                        return function(Y) {
                            var Z = typeof Y.getAttributeNode < "u" && Y.getAttributeNode("id");
                            return Z && Z.value === F
                        }
                    }, a.find.ID = function(C, F) {
                        if (typeof F.getElementById < "u" && be) {
                            var Y, Z, ie, pe = F.getElementById(C);
                            if (pe) {
                                if (Y = pe.getAttributeNode("id"), Y && Y.value === C) return [pe];
                                for (ie = F.getElementsByName(C), Z = 0; pe = ie[Z++];)
                                    if (Y = pe.getAttributeNode("id"), Y && Y.value === C) return [pe]
                            }
                            return []
                        }
                    }), a.find.TAG = s.getElementsByTagName ? function(C, F) {
                        if (typeof F.getElementsByTagName < "u") return F.getElementsByTagName(C);
                        if (s.qsa) return F.querySelectorAll(C)
                    } : function(C, F) {
                        var Y, Z = [],
                            ie = 0,
                            pe = F.getElementsByTagName(C);
                        if (C === "*") {
                            for (; Y = pe[ie++];) Y.nodeType === 1 && Z.push(Y);
                            return Z
                        }
                        return pe
                    }, a.find.CLASS = s.getElementsByClassName && function(C, F) {
                        if (typeof F.getElementsByClassName < "u" && be) return F.getElementsByClassName(C)
                    }, ot = [], le = [], (s.qsa = Qi.test(M.querySelectorAll)) && (Lt(function(C) {
                        var F;
                        ce.appendChild(C).innerHTML = "<a id='" + ze + "'></a><select id='" + ze + "-\r\\' msallowcapture=''><option selected=''></option></select>", C.querySelectorAll("[msallowcapture^='']").length && le.push("[*^$]=" + Me + `*(?:''|"")`), C.querySelectorAll("[selected]").length || le.push("\\[" + Me + "*(?:value|" + ir + ")"), C.querySelectorAll("[id~=" + ze + "-]").length || le.push("~="), F = M.createElement("input"), F.setAttribute("name", ""), C.appendChild(F), C.querySelectorAll("[name='']").length || le.push("\\[" + Me + "*name" + Me + "*=" + Me + `*(?:''|"")`), C.querySelectorAll(":checked").length || le.push(":checked"), C.querySelectorAll("a#" + ze + "+*").length || le.push(".#.+[+~]"), C.querySelectorAll("\\\f"), le.push("[\\r\\n\\f]")
                    }), Lt(function(C) {
                        C.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var F = M.createElement("input");
                        F.setAttribute("type", "hidden"), C.appendChild(F).setAttribute("name", "D"), C.querySelectorAll("[name=d]").length && le.push("name" + Me + "*[*^$|!~]?="), C.querySelectorAll(":enabled").length !== 2 && le.push(":enabled", ":disabled"), ce.appendChild(C).disabled = !0, C.querySelectorAll(":disabled").length !== 2 && le.push(":enabled", ":disabled"), C.querySelectorAll("*,:x"), le.push(",.*:")
                    })), (s.matchesSelector = Qi.test(nt = ce.matches || ce.webkitMatchesSelector || ce.mozMatchesSelector || ce.oMatchesSelector || ce.msMatchesSelector)) && Lt(function(C) {
                        s.disconnectedMatch = nt.call(C, "*"), nt.call(C, "[s!='']:x"), ot.push("!=", nr)
                    }), s.cssHas || le.push(":has"), le = le.length && new RegExp(le.join("|")), ot = ot.length && new RegExp(ot.join("|")), b = Qi.test(ce.compareDocumentPosition), wt = b || Qi.test(ce.contains) ? function(C, F) {
                        var Y = C.nodeType === 9 && C.documentElement || C,
                            Z = F && F.parentNode;
                        return C === Z || !!(Z && Z.nodeType === 1 && (Y.contains ? Y.contains(Z) : C.compareDocumentPosition && C.compareDocumentPosition(Z) & 16))
                    } : function(C, F) {
                        if (F) {
                            for (; F = F.parentNode;)
                                if (F === C) return !0
                        }
                        return !1
                    }, di = b ? function(C, F) {
                        if (C === F) return U = !0, 0;
                        var Y = !C.compareDocumentPosition - !F.compareDocumentPosition;
                        return Y || (Y = (C.ownerDocument || C) == (F.ownerDocument || F) ? C.compareDocumentPosition(F) : 1, Y & 1 || !s.sortDetached && F.compareDocumentPosition(C) === Y ? C == M || C.ownerDocument == ye && wt(ye, C) ? -1 : F == M || F.ownerDocument == ye && wt(ye, F) ? 1 : $ ? hi($, C) - hi($, F) : 0 : Y & 4 ? -1 : 1)
                    } : function(C, F) {
                        if (C === F) return U = !0, 0;
                        var Y, Z = 0,
                            ie = C.parentNode,
                            pe = F.parentNode,
                            de = [C],
                            me = [F];
                        if (!ie || !pe) return C == M ? -1 : F == M ? 1 : ie ? -1 : pe ? 1 : $ ? hi($, C) - hi($, F) : 0;
                        if (ie === pe) return Ao(C, F);
                        for (Y = C; Y = Y.parentNode;) de.unshift(Y);
                        for (Y = F; Y = Y.parentNode;) me.unshift(Y);
                        for (; de[Z] === me[Z];) Z++;
                        return Z ? Ao(de[Z], me[Z]) : de[Z] == ye ? -1 : me[Z] == ye ? 1 : 0
                    }), M
                }, Ve.matches = function(v, b) {
                    return Ve(v, null, null, b)
                }, Ve.matchesSelector = function(v, b) {
                    if (L(v), s.matchesSelector && be && !Tt[b + " "] && (!ot || !ot.test(b)) && (!le || !le.test(b))) try {
                        var E = nt.call(v, b);
                        if (E || s.disconnectedMatch || v.document && v.document.nodeType !== 11) return E
                    } catch {
                        Tt(b, !0)
                    }
                    return Ve(b, M, null, [v]).length > 0
                }, Ve.contains = function(v, b) {
                    return (v.ownerDocument || v) != M && L(v), wt(v, b)
                }, Ve.attr = function(v, b) {
                    (v.ownerDocument || v) != M && L(v);
                    var E = a.attrHandle[b.toLowerCase()],
                        W = E && pi.call(a.attrHandle, b.toLowerCase()) ? E(v, b, !be) : void 0;
                    return W !== void 0 ? W : s.attributes || !be ? v.getAttribute(b) : (W = v.getAttributeNode(b)) && W.specified ? W.value : null
                }, Ve.escape = function(v) {
                    return (v + "").replace(So, xo)
                }, Ve.error = function(v) {
                    throw new Error("Syntax error, unrecognized expression: " + v)
                }, Ve.uniqueSort = function(v) {
                    var b, E = [],
                        W = 0,
                        C = 0;
                    if (U = !s.detectDuplicates, $ = !s.sortStable && v.slice(0), v.sort(di), U) {
                        for (; b = v[C++];) b === v[C] && (W = E.push(C));
                        for (; W--;) v.splice(E[W], 1)
                    }
                    return $ = null, v
                }, d = Ve.getText = function(v) {
                    var b, E = "",
                        W = 0,
                        C = v.nodeType;
                    if (C) {
                        if (C === 1 || C === 9 || C === 11) {
                            if (typeof v.textContent == "string") return v.textContent;
                            for (v = v.firstChild; v; v = v.nextSibling) E += d(v)
                        } else if (C === 3 || C === 4) return v.nodeValue
                    } else
                        for (; b = v[W++];) E += d(b);
                    return E
                }, a = Ve.selectors = {
                    cacheLength: 50,
                    createPseudo: Mt,
                    match: mn,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(v) {
                            return v[1] = v[1].replace(Vt, Bt), v[3] = (v[3] || v[4] || v[5] || "").replace(Vt, Bt), v[2] === "~=" && (v[3] = " " + v[3] + " "), v.slice(0, 4)
                        },
                        CHILD: function(v) {
                            return v[1] = v[1].toLowerCase(), v[1].slice(0, 3) === "nth" ? (v[3] || Ve.error(v[0]), v[4] = +(v[4] ? v[5] + (v[6] || 1) : 2 * (v[3] === "even" || v[3] === "odd")), v[5] = +(v[7] + v[8] || v[3] === "odd")) : v[3] && Ve.error(v[0]), v
                        },
                        PSEUDO: function(v) {
                            var b, E = !v[6] && v[2];
                            return mn.CHILD.test(v[0]) ? null : (v[3] ? v[2] = v[4] || v[5] || "" : E && Ja.test(E) && (b = g(E, !0)) && (b = E.indexOf(")", E.length - b) - E.length) && (v[0] = v[0].slice(0, b), v[2] = E.slice(0, b)), v.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(v) {
                            var b = v.replace(Vt, Bt).toLowerCase();
                            return v === "*" ? function() {
                                return !0
                            } : function(E) {
                                return E.nodeName && E.nodeName.toLowerCase() === b
                            }
                        },
                        CLASS: function(v) {
                            var b = Je[v + " "];
                            return b || (b = new RegExp("(^|" + Me + ")" + v + "(" + Me + "|$)")) && Je(v, function(E) {
                                return b.test(typeof E.className == "string" && E.className || typeof E.getAttribute < "u" && E.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(v, b, E) {
                            return function(W) {
                                var C = Ve.attr(W, v);
                                return C == null ? b === "!=" : b ? (C += "", b === "=" ? C === E : b === "!=" ? C !== E : b === "^=" ? E && C.indexOf(E) === 0 : b === "*=" ? E && C.indexOf(E) > -1 : b === "$=" ? E && C.slice(-E.length) === E : b === "~=" ? (" " + C.replace(Xa, " ") + " ").indexOf(E) > -1 : b === "|=" ? C === E || C.slice(0, E.length + 1) === E + "-" : !1) : !0
                            }
                        },
                        CHILD: function(v, b, E, W, C) {
                            var F = v.slice(0, 3) !== "nth",
                                Y = v.slice(-4) !== "last",
                                Z = b === "of-type";
                            return W === 1 && C === 0 ? function(ie) {
                                return !!ie.parentNode
                            } : function(ie, pe, de) {
                                var me, Oe, Be, he, st, ut, Et = F !== Y ? "nextSibling" : "previousSibling",
                                    Qe = ie.parentNode,
                                    Ji = Z && ie.nodeName.toLowerCase(),
                                    Zi = !de && !Z,
                                    St = !1;
                                if (Qe) {
                                    if (F) {
                                        for (; Et;) {
                                            for (he = ie; he = he[Et];)
                                                if (Z ? he.nodeName.toLowerCase() === Ji : he.nodeType === 1) return !1;
                                            ut = Et = v === "only" && !ut && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (ut = [Y ? Qe.firstChild : Qe.lastChild], Y && Zi) {
                                        for (he = Qe, Be = he[ze] || (he[ze] = {}), Oe = Be[he.uniqueID] || (Be[he.uniqueID] = {}), me = Oe[v] || [], st = me[0] === vt && me[1], St = st && me[2], he = st && Qe.childNodes[st]; he = ++st && he && he[Et] || (St = st = 0) || ut.pop();)
                                            if (he.nodeType === 1 && ++St && he === ie) {
                                                Oe[v] = [vt, st, St];
                                                break
                                            }
                                    } else if (Zi && (he = ie, Be = he[ze] || (he[ze] = {}), Oe = Be[he.uniqueID] || (Be[he.uniqueID] = {}), me = Oe[v] || [], st = me[0] === vt && me[1], St = st), St === !1)
                                        for (;
                                            (he = ++st && he && he[Et] || (St = st = 0) || ut.pop()) && !((Z ? he.nodeName.toLowerCase() === Ji : he.nodeType === 1) && ++St && (Zi && (Be = he[ze] || (he[ze] = {}), Oe = Be[he.uniqueID] || (Be[he.uniqueID] = {}), Oe[v] = [vt, St]), he === ie)););
                                    return St -= C, St === W || St % W === 0 && St / W >= 0
                                }
                            }
                        },
                        PSEUDO: function(v, b) {
                            var E, W = a.pseudos[v] || a.setFilters[v.toLowerCase()] || Ve.error("unsupported pseudo: " + v);
                            return W[ze] ? W(b) : W.length > 1 ? (E = [v, v, "", b], a.setFilters.hasOwnProperty(v.toLowerCase()) ? Mt(function(C, F) {
                                for (var Y, Z = W(C, b), ie = Z.length; ie--;) Y = hi(C, Z[ie]), C[Y] = !(F[Y] = Z[ie])
                            }) : function(C) {
                                return W(C, 0, E)
                            }) : W
                        }
                    },
                    pseudos: {
                        not: Mt(function(v) {
                            var b = [],
                                E = [],
                                W = _(v.replace(gn, "$1"));
                            return W[ze] ? Mt(function(C, F, Y, Z) {
                                for (var ie, pe = W(C, null, Z, []), de = C.length; de--;)(ie = pe[de]) && (C[de] = !(F[de] = ie))
                            }) : function(C, F, Y) {
                                return b[0] = C, W(b, null, Y, E), b[0] = null, !E.pop()
                            }
                        }),
                        has: Mt(function(v) {
                            return function(b) {
                                return Ve(v, b).length > 0
                            }
                        }),
                        contains: Mt(function(v) {
                            return v = v.replace(Vt, Bt),
                                function(b) {
                                    return (b.textContent || d(b)).indexOf(v) > -1
                                }
                        }),
                        lang: Mt(function(v) {
                            return Za.test(v || "") || Ve.error("unsupported lang: " + v), v = v.replace(Vt, Bt).toLowerCase(),
                                function(b) {
                                    var E;
                                    do
                                        if (E = be ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return E = E.toLowerCase(), E === v || E.indexOf(v + "-") === 0; while ((b = b.parentNode) && b.nodeType === 1);
                                    return !1
                                }
                        }),
                        target: function(v) {
                            var b = e.location && e.location.hash;
                            return b && b.slice(1) === v.id
                        },
                        root: function(v) {
                            return v === ce
                        },
                        focus: function(v) {
                            return v === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(v.type || v.href || ~v.tabIndex)
                        },
                        enabled: ko(!1),
                        disabled: ko(!0),
                        checked: function(v) {
                            var b = v.nodeName.toLowerCase();
                            return b === "input" && !!v.checked || b === "option" && !!v.selected
                        },
                        selected: function(v) {
                            return v.parentNode && v.parentNode.selectedIndex, v.selected === !0
                        },
                        empty: function(v) {
                            for (v = v.firstChild; v; v = v.nextSibling)
                                if (v.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(v) {
                            return !a.pseudos.empty(v)
                        },
                        header: function(v) {
                            return il.test(v.nodeName)
                        },
                        input: function(v) {
                            return tl.test(v.nodeName)
                        },
                        button: function(v) {
                            var b = v.nodeName.toLowerCase();
                            return b === "input" && v.type === "button" || b === "button"
                        },
                        text: function(v) {
                            var b;
                            return v.nodeName.toLowerCase() === "input" && v.type === "text" && ((b = v.getAttribute("type")) == null || b.toLowerCase() === "text")
                        },
                        first: mi(function() {
                            return [0]
                        }),
                        last: mi(function(v, b) {
                            return [b - 1]
                        }),
                        eq: mi(function(v, b, E) {
                            return [E < 0 ? E + b : E]
                        }),
                        even: mi(function(v, b) {
                            for (var E = 0; E < b; E += 2) v.push(E);
                            return v
                        }),
                        odd: mi(function(v, b) {
                            for (var E = 1; E < b; E += 2) v.push(E);
                            return v
                        }),
                        lt: mi(function(v, b, E) {
                            for (var W = E < 0 ? E + b : E > b ? b : E; --W >= 0;) v.push(W);
                            return v
                        }),
                        gt: mi(function(v, b, E) {
                            for (var W = E < 0 ? E + b : E; ++W < b;) v.push(W);
                            return v
                        })
                    }
                }, a.pseudos.nth = a.pseudos.eq;
                for (n in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) a.pseudos[n] = ol(n);
                for (n in {
                        submit: !0,
                        reset: !0
                    }) a.pseudos[n] = sl(n);

                function Oo() {}
                Oo.prototype = a.filters = a.pseudos, a.setFilters = new Oo, g = Ve.tokenize = function(v, b) {
                    var E, W, C, F, Y, Z, ie, pe = Gi[v + " "];
                    if (pe) return b ? 0 : pe.slice(0);
                    for (Y = v, Z = [], ie = a.preFilter; Y;) {
                        (!E || (W = Ga.exec(Y))) && (W && (Y = Y.slice(W[0].length) || Y), Z.push(C = [])), E = !1, (W = Eo.exec(Y)) && (E = W.shift(), C.push({
                            value: E,
                            type: W[0].replace(gn, " ")
                        }), Y = Y.slice(E.length));
                        for (F in a.filter)(W = mn[F].exec(Y)) && (!ie[F] || (W = ie[F](W))) && (E = W.shift(), C.push({
                            value: E,
                            type: F,
                            matches: W
                        }), Y = Y.slice(E.length));
                        if (!E) break
                    }
                    return b ? Y.length : Y ? Ve.error(v) : Gi(v, Z).slice(0)
                };

                function yn(v) {
                    for (var b = 0, E = v.length, W = ""; b < E; b++) W += v[b].value;
                    return W
                }

                function bn(v, b, E) {
                    var W = b.dir,
                        C = b.next,
                        F = C || W,
                        Y = E && F === "parentNode",
                        Z = Pe++;
                    return b.first ? function(ie, pe, de) {
                        for (; ie = ie[W];)
                            if (ie.nodeType === 1 || Y) return v(ie, pe, de);
                        return !1
                    } : function(ie, pe, de) {
                        var me, Oe, Be, he = [vt, Z];
                        if (de) {
                            for (; ie = ie[W];)
                                if ((ie.nodeType === 1 || Y) && v(ie, pe, de)) return !0
                        } else
                            for (; ie = ie[W];)
                                if (ie.nodeType === 1 || Y)
                                    if (Be = ie[ze] || (ie[ze] = {}), Oe = Be[ie.uniqueID] || (Be[ie.uniqueID] = {}), C && C === ie.nodeName.toLowerCase()) ie = ie[W] || ie;
                                    else {
                                        if ((me = Oe[F]) && me[0] === vt && me[1] === Z) return he[2] = me[2];
                                        if (Oe[F] = he, he[2] = v(ie, pe, de)) return !0
                                    } return !1
                    }
                }

                function ar(v) {
                    return v.length > 1 ? function(b, E, W) {
                        for (var C = v.length; C--;)
                            if (!v[C](b, E, W)) return !1;
                        return !0
                    } : v[0]
                }

                function al(v, b, E) {
                    for (var W = 0, C = b.length; W < C; W++) Ve(v, b[W], E);
                    return E
                }

                function _n(v, b, E, W, C) {
                    for (var F, Y = [], Z = 0, ie = v.length, pe = b != null; Z < ie; Z++)(F = v[Z]) && (!E || E(F, W, C)) && (Y.push(F), pe && b.push(Z));
                    return Y
                }

                function lr(v, b, E, W, C, F) {
                    return W && !W[ze] && (W = lr(W)), C && !C[ze] && (C = lr(C, F)), Mt(function(Y, Z, ie, pe) {
                        var de, me, Oe, Be = [],
                            he = [],
                            st = Z.length,
                            ut = Y || al(b || "*", ie.nodeType ? [ie] : ie, []),
                            Et = v && (Y || !b) ? _n(ut, Be, v, ie, pe) : ut,
                            Qe = E ? C || (Y ? v : st || W) ? [] : Z : Et;
                        if (E && E(Et, Qe, ie, pe), W)
                            for (de = _n(Qe, he), W(de, [], ie, pe), me = de.length; me--;)(Oe = de[me]) && (Qe[he[me]] = !(Et[he[me]] = Oe));
                        if (Y) {
                            if (C || v) {
                                if (C) {
                                    for (de = [], me = Qe.length; me--;)(Oe = Qe[me]) && de.push(Et[me] = Oe);
                                    C(null, Qe = [], de, pe)
                                }
                                for (me = Qe.length; me--;)(Oe = Qe[me]) && (de = C ? hi(Y, Oe) : Be[me]) > -1 && (Y[de] = !(Z[de] = Oe))
                            }
                        } else Qe = _n(Qe === Z ? Qe.splice(st, Qe.length) : Qe), C ? C(null, Z, Qe, pe) : ii.apply(Z, Qe)
                    })
                }

                function cr(v) {
                    for (var b, E, W, C = v.length, F = a.relative[v[0].type], Y = F || a.relative[" "], Z = F ? 1 : 0, ie = bn(function(me) {
                            return me === b
                        }, Y, !0), pe = bn(function(me) {
                            return hi(b, me) > -1
                        }, Y, !0), de = [function(me, Oe, Be) {
                            var he = !F && (Be || Oe !== k) || ((b = Oe).nodeType ? ie(me, Oe, Be) : pe(me, Oe, Be));
                            return b = null, he
                        }]; Z < C; Z++)
                        if (E = a.relative[v[Z].type]) de = [bn(ar(de), E)];
                        else {
                            if (E = a.filter[v[Z].type].apply(null, v[Z].matches), E[ze]) {
                                for (W = ++Z; W < C && !a.relative[v[W].type]; W++);
                                return lr(Z > 1 && ar(de), Z > 1 && yn(v.slice(0, Z - 1).concat({
                                    value: v[Z - 2].type === " " ? "*" : ""
                                })).replace(gn, "$1"), E, Z < W && cr(v.slice(Z, W)), W < C && cr(v = v.slice(W)), W < C && yn(v))
                            }
                            de.push(E)
                        } return ar(de)
                }

                function ll(v, b) {
                    var E = b.length > 0,
                        W = v.length > 0,
                        C = function(F, Y, Z, ie, pe) {
                            var de, me, Oe, Be = 0,
                                he = "0",
                                st = F && [],
                                ut = [],
                                Et = k,
                                Qe = F || W && a.find.TAG("*", pe),
                                Ji = vt += Et == null ? 1 : Math.random() || .1,
                                Zi = Qe.length;
                            for (pe && (k = Y == M || Y || pe); he !== Zi && (de = Qe[he]) != null; he++) {
                                if (W && de) {
                                    for (me = 0, !Y && de.ownerDocument != M && (L(de), Z = !be); Oe = v[me++];)
                                        if (Oe(de, Y || M, Z)) {
                                            ie.push(de);
                                            break
                                        } pe && (vt = Ji)
                                }
                                E && ((de = !Oe && de) && Be--, F && st.push(de))
                            }
                            if (Be += he, E && he !== Be) {
                                for (me = 0; Oe = b[me++];) Oe(st, ut, Y, Z);
                                if (F) {
                                    if (Be > 0)
                                        for (; he--;) st[he] || ut[he] || (ut[he] = ti.call(ie));
                                    ut = _n(ut)
                                }
                                ii.apply(ie, ut), pe && !F && ut.length > 0 && Be + b.length > 1 && Ve.uniqueSort(ie)
                            }
                            return pe && (vt = Ji, k = Et), st
                        };
                    return E ? Mt(C) : C
                }
                return _ = Ve.compile = function(v, b) {
                    var E, W = [],
                        C = [],
                        F = hn[v + " "];
                    if (!F) {
                        for (b || (b = g(v)), E = b.length; E--;) F = cr(b[E]), F[ze] ? W.push(F) : C.push(F);
                        F = hn(v, ll(C, W)), F.selector = v
                    }
                    return F
                }, y = Ve.select = function(v, b, E, W) {
                    var C, F, Y, Z, ie, pe = typeof v == "function" && v,
                        de = !W && g(v = pe.selector || v);
                    if (E = E || [], de.length === 1) {
                        if (F = de[0] = de[0].slice(0), F.length > 2 && (Y = F[0]).type === "ID" && b.nodeType === 9 && be && a.relative[F[1].type]) {
                            if (b = (a.find.ID(Y.matches[0].replace(Vt, Bt), b) || [])[0], b) pe && (b = b.parentNode);
                            else return E;
                            v = v.slice(F.shift().value.length)
                        }
                        for (C = mn.needsContext.test(v) ? 0 : F.length; C-- && (Y = F[C], !a.relative[Z = Y.type]);)
                            if ((ie = a.find[Z]) && (W = ie(Y.matches[0].replace(Vt, Bt), rr.test(F[0].type) && sr(b.parentNode) || b))) {
                                if (F.splice(C, 1), v = W.length && yn(F), !v) return ii.apply(E, W), E;
                                break
                            }
                    }
                    return (pe || _(v, de))(W, b, !be, E, !b || rr.test(v) && sr(b.parentNode) || b), E
                }, s.sortStable = ze.split("").sort(di).join("") === ze, s.detectDuplicates = !!U, L(), s.sortDetached = Lt(function(v) {
                    return v.compareDocumentPosition(M.createElement("fieldset")) & 1
                }), Lt(function(v) {
                    return v.innerHTML = "<a href='#'></a>", v.firstChild.getAttribute("href") === "#"
                }) || or("type|href|height|width", function(v, b, E) {
                    if (!E) return v.getAttribute(b, b.toLowerCase() === "type" ? 1 : 2)
                }), (!s.attributes || !Lt(function(v) {
                    return v.innerHTML = "<input/>", v.firstChild.setAttribute("value", ""), v.firstChild.getAttribute("value") === ""
                })) && or("value", function(v, b, E) {
                    if (!E && v.nodeName.toLowerCase() === "input") return v.defaultValue
                }), Lt(function(v) {
                    return v.getAttribute("disabled") == null
                }) || or(ir, function(v, b, E) {
                    var W;
                    if (!E) return v[b] === !0 ? b.toLowerCase() : (W = v.getAttributeNode(b)) && W.specified ? W.value : null
                }), Ve
            }(i);
            l.find = fe, l.expr = fe.selectors, l.expr[":"] = l.expr.pseudos, l.uniqueSort = l.unique = fe.uniqueSort, l.text = fe.getText, l.isXMLDoc = fe.isXML, l.contains = fe.contains, l.escapeSelector = fe.escape;
            var _e = function(e, n, s) {
                    for (var a = [], d = s !== void 0;
                        (e = e[n]) && e.nodeType !== 9;)
                        if (e.nodeType === 1) {
                            if (d && l(e).is(s)) break;
                            a.push(e)
                        } return a
                },
                we = function(e, n) {
                    for (var s = []; e; e = e.nextSibling) e.nodeType === 1 && e !== n && s.push(e);
                    return s
                },
                ee = l.expr.match.needsContext;

            function X(e, n) {
                return e.nodeName && e.nodeName.toLowerCase() === n.toLowerCase()
            }
            var ae = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

            function ne(e, n, s) {
                return A(n) ? l.grep(e, function(a, d) {
                    return !!n.call(a, d, a) !== s
                }) : n.nodeType ? l.grep(e, function(a) {
                    return a === n !== s
                }) : typeof n != "string" ? l.grep(e, function(a) {
                    return m.call(n, a) > -1 !== s
                }) : l.filter(n, e, s)
            }
            l.filter = function(e, n, s) {
                var a = n[0];
                return s && (e = ":not(" + e + ")"), n.length === 1 && a.nodeType === 1 ? l.find.matchesSelector(a, e) ? [a] : [] : l.find.matches(e, l.grep(n, function(d) {
                    return d.nodeType === 1
                }))
            }, l.fn.extend({
                find: function(e) {
                    var n, s, a = this.length,
                        d = this;
                    if (typeof e != "string") return this.pushStack(l(e).filter(function() {
                        for (n = 0; n < a; n++)
                            if (l.contains(d[n], this)) return !0
                    }));
                    for (s = this.pushStack([]), n = 0; n < a; n++) l.find(e, d[n], s);
                    return a > 1 ? l.uniqueSort(s) : s
                },
                filter: function(e) {
                    return this.pushStack(ne(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(ne(this, e || [], !0))
                },
                is: function(e) {
                    return !!ne(this, typeof e == "string" && ee.test(e) ? l(e) : e || [], !1).length
                }
            });
            var Ce, Ae = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
                $e = l.fn.init = function(e, n, s) {
                    var a, d;
                    if (!e) return this;
                    if (s = s || Ce, typeof e == "string")
                        if (e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? a = [null, e, null] : a = Ae.exec(e), a && (a[1] || !n))
                            if (a[1]) {
                                if (n = n instanceof l ? n[0] : n, l.merge(this, l.parseHTML(a[1], n && n.nodeType ? n.ownerDocument || n : R, !0)), ae.test(a[1]) && l.isPlainObject(n))
                                    for (a in n) A(this[a]) ? this[a](n[a]) : this.attr(a, n[a]);
                                return this
                            } else return d = R.getElementById(a[2]), d && (this[0] = d, this.length = 1), this;
                    else return !n || n.jquery ? (n || s).find(e) : this.constructor(n).find(e);
                    else {
                        if (e.nodeType) return this[0] = e, this.length = 1, this;
                        if (A(e)) return s.ready !== void 0 ? s.ready(e) : e(l)
                    }
                    return l.makeArray(e, this)
                };
            $e.prototype = l.fn, Ce = l(R);
            var et = /^(?:parents|prev(?:Until|All))/,
                Ye = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            l.fn.extend({
                has: function(e) {
                    var n = l(e, this),
                        s = n.length;
                    return this.filter(function() {
                        for (var a = 0; a < s; a++)
                            if (l.contains(this, n[a])) return !0
                    })
                },
                closest: function(e, n) {
                    var s, a = 0,
                        d = this.length,
                        p = [],
                        g = typeof e != "string" && l(e);
                    if (!ee.test(e)) {
                        for (; a < d; a++)
                            for (s = this[a]; s && s !== n; s = s.parentNode)
                                if (s.nodeType < 11 && (g ? g.index(s) > -1 : s.nodeType === 1 && l.find.matchesSelector(s, e))) {
                                    p.push(s);
                                    break
                                }
                    }
                    return this.pushStack(p.length > 1 ? l.uniqueSort(p) : p)
                },
                index: function(e) {
                    return e ? typeof e == "string" ? m.call(l(e), this[0]) : m.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, n) {
                    return this.pushStack(l.uniqueSort(l.merge(this.get(), l(e, n))))
                },
                addBack: function(e) {
                    return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
                }
            });

            function rt(e, n) {
                for (;
                    (e = e[n]) && e.nodeType !== 1;);
                return e
            }
            l.each({
                parent: function(e) {
                    var n = e.parentNode;
                    return n && n.nodeType !== 11 ? n : null
                },
                parents: function(e) {
                    return _e(e, "parentNode")
                },
                parentsUntil: function(e, n, s) {
                    return _e(e, "parentNode", s)
                },
                next: function(e) {
                    return rt(e, "nextSibling")
                },
                prev: function(e) {
                    return rt(e, "previousSibling")
                },
                nextAll: function(e) {
                    return _e(e, "nextSibling")
                },
                prevAll: function(e) {
                    return _e(e, "previousSibling")
                },
                nextUntil: function(e, n, s) {
                    return _e(e, "nextSibling", s)
                },
                prevUntil: function(e, n, s) {
                    return _e(e, "previousSibling", s)
                },
                siblings: function(e) {
                    return we((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return we(e.firstChild)
                },
                contents: function(e) {
                    return e.contentDocument != null && t(e.contentDocument) ? e.contentDocument : (X(e, "template") && (e = e.content || e), l.merge([], e.childNodes))
                }
            }, function(e, n) {
                l.fn[e] = function(s, a) {
                    var d = l.map(this, n, s);
                    return e.slice(-5) !== "Until" && (a = s), a && typeof a == "string" && (d = l.filter(a, d)), this.length > 1 && (Ye[e] || l.uniqueSort(d), et.test(e) && d.reverse()), this.pushStack(d)
                }
            });
            var Ie = /[^\x20\t\r\n\f]+/g;

            function Le(e) {
                var n = {};
                return l.each(e.match(Ie) || [], function(s, a) {
                    n[a] = !0
                }), n
            }
            l.Callbacks = function(e) {
                e = typeof e == "string" ? Le(e) : l.extend({}, e);
                var n, s, a, d, p = [],
                    g = [],
                    _ = -1,
                    y = function() {
                        for (d = d || e.once, a = n = !0; g.length; _ = -1)
                            for (s = g.shift(); ++_ < p.length;) p[_].apply(s[0], s[1]) === !1 && e.stopOnFalse && (_ = p.length, s = !1);
                        e.memory || (s = !1), n = !1, d && (s ? p = [] : p = "")
                    },
                    k = {
                        add: function() {
                            return p && (s && !n && (_ = p.length - 1, g.push(s)), function $(U) {
                                l.each(U, function(L, M) {
                                    A(M) ? (!e.unique || !k.has(M)) && p.push(M) : M && M.length && se(M) !== "string" && $(M)
                                })
                            }(arguments), s && !n && y()), this
                        },
                        remove: function() {
                            return l.each(arguments, function($, U) {
                                for (var L;
                                    (L = l.inArray(U, p, L)) > -1;) p.splice(L, 1), L <= _ && _--
                            }), this
                        },
                        has: function($) {
                            return $ ? l.inArray($, p) > -1 : p.length > 0
                        },
                        empty: function() {
                            return p && (p = []), this
                        },
                        disable: function() {
                            return d = g = [], p = s = "", this
                        },
                        disabled: function() {
                            return !p
                        },
                        lock: function() {
                            return d = g = [], !s && !n && (p = s = ""), this
                        },
                        locked: function() {
                            return !!d
                        },
                        fireWith: function($, U) {
                            return d || (U = U || [], U = [$, U.slice ? U.slice() : U], g.push(U), n || y()), this
                        },
                        fire: function() {
                            return k.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!a
                        }
                    };
                return k
            };

            function Ke(e) {
                return e
            }

            function Re(e) {
                throw e
            }

            function Ue(e, n, s, a) {
                var d;
                try {
                    e && A(d = e.promise) ? d.call(e).done(n).fail(s) : e && A(d = e.then) ? d.call(e, n, s) : n.apply(void 0, [e].slice(a))
                } catch (p) {
                    s.apply(void 0, [p])
                }
            }
            l.extend({
                Deferred: function(e) {
                    var n = [
                            ["notify", "progress", l.Callbacks("memory"), l.Callbacks("memory"), 2],
                            ["resolve", "done", l.Callbacks("once memory"), l.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", l.Callbacks("once memory"), l.Callbacks("once memory"), 1, "rejected"]
                        ],
                        s = "pending",
                        a = {
                            state: function() {
                                return s
                            },
                            always: function() {
                                return d.done(arguments).fail(arguments), this
                            },
                            catch: function(p) {
                                return a.then(null, p)
                            },
                            pipe: function() {
                                var p = arguments;
                                return l.Deferred(function(g) {
                                    l.each(n, function(_, y) {
                                        var k = A(p[y[4]]) && p[y[4]];
                                        d[y[1]](function() {
                                            var $ = k && k.apply(this, arguments);
                                            $ && A($.promise) ? $.promise().progress(g.notify).done(g.resolve).fail(g.reject) : g[y[0] + "With"](this, k ? [$] : arguments)
                                        })
                                    }), p = null
                                }).promise()
                            },
                            then: function(p, g, _) {
                                var y = 0;

                                function k($, U, L, M) {
                                    return function() {
                                        var ce = this,
                                            be = arguments,
                                            le = function() {
                                                var nt, wt;
                                                if (!($ < y)) {
                                                    if (nt = L.apply(ce, be), nt === U.promise()) throw new TypeError("Thenable self-resolution");
                                                    wt = nt && (typeof nt == "object" || typeof nt == "function") && nt.then, A(wt) ? M ? wt.call(nt, k(y, U, Ke, M), k(y, U, Re, M)) : (y++, wt.call(nt, k(y, U, Ke, M), k(y, U, Re, M), k(y, U, Ke, U.notifyWith))) : (L !== Ke && (ce = void 0, be = [nt]), (M || U.resolveWith)(ce, be))
                                                }
                                            },
                                            ot = M ? le : function() {
                                                try {
                                                    le()
                                                } catch (nt) {
                                                    l.Deferred.exceptionHook && l.Deferred.exceptionHook(nt, ot.stackTrace), $ + 1 >= y && (L !== Re && (ce = void 0, be = [nt]), U.rejectWith(ce, be))
                                                }
                                            };
                                        $ ? ot() : (l.Deferred.getStackHook && (ot.stackTrace = l.Deferred.getStackHook()), i.setTimeout(ot))
                                    }
                                }
                                return l.Deferred(function($) {
                                    n[0][3].add(k(0, $, A(_) ? _ : Ke, $.notifyWith)), n[1][3].add(k(0, $, A(p) ? p : Ke)), n[2][3].add(k(0, $, A(g) ? g : Re))
                                }).promise()
                            },
                            promise: function(p) {
                                return p != null ? l.extend(p, a) : a
                            }
                        },
                        d = {};
                    return l.each(n, function(p, g) {
                        var _ = g[2],
                            y = g[5];
                        a[g[1]] = _.add, y && _.add(function() {
                            s = y
                        }, n[3 - p][2].disable, n[3 - p][3].disable, n[0][2].lock, n[0][3].lock), _.add(g[3].fire), d[g[0]] = function() {
                            return d[g[0] + "With"](this === d ? void 0 : this, arguments), this
                        }, d[g[0] + "With"] = _.fireWith
                    }), a.promise(d), e && e.call(d, d), d
                },
                when: function(e) {
                    var n = arguments.length,
                        s = n,
                        a = Array(s),
                        d = r.call(arguments),
                        p = l.Deferred(),
                        g = function(_) {
                            return function(y) {
                                a[_] = this, d[_] = arguments.length > 1 ? r.call(arguments) : y, --n || p.resolveWith(a, d)
                            }
                        };
                    if (n <= 1 && (Ue(e, p.done(g(s)).resolve, p.reject, !n), p.state() === "pending" || A(d[s] && d[s].then))) return p.then();
                    for (; s--;) Ue(d[s], g(s), p.reject);
                    return p.promise()
                }
            });
            var tt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            l.Deferred.exceptionHook = function(e, n) {
                i.console && i.console.warn && e && tt.test(e.name) && i.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
            }, l.readyException = function(e) {
                i.setTimeout(function() {
                    throw e
                })
            };
            var We = l.Deferred();
            l.fn.ready = function(e) {
                return We.then(e).catch(function(n) {
                    l.readyException(n)
                }), this
            }, l.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (e === !0 ? --l.readyWait : l.isReady) || (l.isReady = !0, !(e !== !0 && --l.readyWait > 0) && We.resolveWith(R, [l]))
                }
            }), l.ready.then = We.then;

            function De() {
                R.removeEventListener("DOMContentLoaded", De), i.removeEventListener("load", De), l.ready()
            }
            R.readyState === "complete" || R.readyState !== "loading" && !R.documentElement.doScroll ? i.setTimeout(l.ready) : (R.addEventListener("DOMContentLoaded", De), i.addEventListener("load", De));
            var He = function(e, n, s, a, d, p, g) {
                    var _ = 0,
                        y = e.length,
                        k = s == null;
                    if (se(s) === "object") {
                        d = !0;
                        for (_ in s) He(e, n, _, s[_], !0, p, g)
                    } else if (a !== void 0 && (d = !0, A(a) || (g = !0), k && (g ? (n.call(e, a), n = null) : (k = n, n = function($, U, L) {
                            return k.call(l($), L)
                        })), n))
                        for (; _ < y; _++) n(e[_], s, g ? a : a.call(e[_], _, n(e[_], s)));
                    return d ? e : k ? n.call(e) : y ? n(e[0], s) : p
                },
                gt = /^-ms-/,
                ct = /-([a-z])/g;

            function ft(e, n) {
                return n.toUpperCase()
            }

            function Te(e) {
                return e.replace(gt, "ms-").replace(ct, ft)
            }
            var ke = function(e) {
                return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
            };

            function Xe() {
                this.expando = l.expando + Xe.uid++
            }
            Xe.uid = 1, Xe.prototype = {
                cache: function(e) {
                    var n = e[this.expando];
                    return n || (n = {}, ke(e) && (e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                        value: n,
                        configurable: !0
                    }))), n
                },
                set: function(e, n, s) {
                    var a, d = this.cache(e);
                    if (typeof n == "string") d[Te(n)] = s;
                    else
                        for (a in n) d[Te(a)] = n[a];
                    return d
                },
                get: function(e, n) {
                    return n === void 0 ? this.cache(e) : e[this.expando] && e[this.expando][Te(n)]
                },
                access: function(e, n, s) {
                    return n === void 0 || n && typeof n == "string" && s === void 0 ? this.get(e, n) : (this.set(e, n, s), s !== void 0 ? s : n)
                },
                remove: function(e, n) {
                    var s, a = e[this.expando];
                    if (a !== void 0) {
                        if (n !== void 0)
                            for (Array.isArray(n) ? n = n.map(Te) : (n = Te(n), n = n in a ? [n] : n.match(Ie) || []), s = n.length; s--;) delete a[n[s]];
                        (n === void 0 || l.isEmptyObject(a)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                },
                hasData: function(e) {
                    var n = e[this.expando];
                    return n !== void 0 && !l.isEmptyObject(n)
                }
            };
            var oe = new Xe,
                Ge = new Xe,
                Fi = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                Vi = /[A-Z]/g;

            function kt(e) {
                return e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : e === +e + "" ? +e : Fi.test(e) ? JSON.parse(e) : e
            }

            function Ft(e, n, s) {
                var a;
                if (s === void 0 && e.nodeType === 1)
                    if (a = "data-" + n.replace(Vi, "-$&").toLowerCase(), s = e.getAttribute(a), typeof s == "string") {
                        try {
                            s = kt(s)
                        } catch {}
                        Ge.set(e, n, s)
                    } else s = void 0;
                return s
            }
            l.extend({
                hasData: function(e) {
                    return Ge.hasData(e) || oe.hasData(e)
                },
                data: function(e, n, s) {
                    return Ge.access(e, n, s)
                },
                removeData: function(e, n) {
                    Ge.remove(e, n)
                },
                _data: function(e, n, s) {
                    return oe.access(e, n, s)
                },
                _removeData: function(e, n) {
                    oe.remove(e, n)
                }
            }), l.fn.extend({
                data: function(e, n) {
                    var s, a, d, p = this[0],
                        g = p && p.attributes;
                    if (e === void 0) {
                        if (this.length && (d = Ge.get(p), p.nodeType === 1 && !oe.get(p, "hasDataAttrs"))) {
                            for (s = g.length; s--;) g[s] && (a = g[s].name, a.indexOf("data-") === 0 && (a = Te(a.slice(5)), Ft(p, a, d[a])));
                            oe.set(p, "hasDataAttrs", !0)
                        }
                        return d
                    }
                    return typeof e == "object" ? this.each(function() {
                        Ge.set(this, e)
                    }) : He(this, function(_) {
                        var y;
                        if (p && _ === void 0) return y = Ge.get(p, e), y !== void 0 || (y = Ft(p, e), y !== void 0) ? y : void 0;
                        this.each(function() {
                            Ge.set(this, e, _)
                        })
                    }, null, n, arguments.length > 1, null, !0)
                },
                removeData: function(e) {
                    return this.each(function() {
                        Ge.remove(this, e)
                    })
                }
            }), l.extend({
                queue: function(e, n, s) {
                    var a;
                    if (e) return n = (n || "fx") + "queue", a = oe.get(e, n), s && (!a || Array.isArray(s) ? a = oe.access(e, n, l.makeArray(s)) : a.push(s)), a || []
                },
                dequeue: function(e, n) {
                    n = n || "fx";
                    var s = l.queue(e, n),
                        a = s.length,
                        d = s.shift(),
                        p = l._queueHooks(e, n),
                        g = function() {
                            l.dequeue(e, n)
                        };
                    d === "inprogress" && (d = s.shift(), a--), d && (n === "fx" && s.unshift("inprogress"), delete p.stop, d.call(e, g, p)), !a && p && p.empty.fire()
                },
                _queueHooks: function(e, n) {
                    var s = n + "queueHooks";
                    return oe.get(e, s) || oe.access(e, s, {
                        empty: l.Callbacks("once memory").add(function() {
                            oe.remove(e, [n + "queue", s])
                        })
                    })
                }
            }), l.fn.extend({
                queue: function(e, n) {
                    var s = 2;
                    return typeof e != "string" && (n = e, e = "fx", s--), arguments.length < s ? l.queue(this[0], e) : n === void 0 ? this : this.each(function() {
                        var a = l.queue(this, e, n);
                        l._queueHooks(this, e), e === "fx" && a[0] !== "inprogress" && l.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        l.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, n) {
                    var s, a = 1,
                        d = l.Deferred(),
                        p = this,
                        g = this.length,
                        _ = function() {
                            --a || d.resolveWith(p, [p])
                        };
                    for (typeof e != "string" && (n = e, e = void 0), e = e || "fx"; g--;) s = oe.get(p[g], e + "queueHooks"), s && s.empty && (a++, s.empty.add(_));
                    return _(), d.promise(n)
                }
            });
            var Jt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                Rt = new RegExp("^(?:([+-])=|)(" + Jt + ")([a-z%]*)$", "i"),
                at = ["Top", "Right", "Bottom", "Left"],
                bt = R.documentElement,
                x = function(e) {
                    return l.contains(e.ownerDocument, e)
                },
                T = {
                    composed: !0
                };
            bt.getRootNode && (x = function(e) {
                return l.contains(e.ownerDocument, e) || e.getRootNode(T) === e.ownerDocument
            });
            var P = function(e, n) {
                return e = n || e, e.style.display === "none" || e.style.display === "" && x(e) && l.css(e, "display") === "none"
            };

            function j(e, n, s, a) {
                var d, p, g = 20,
                    _ = a ? function() {
                        return a.cur()
                    } : function() {
                        return l.css(e, n, "")
                    },
                    y = _(),
                    k = s && s[3] || (l.cssNumber[n] ? "" : "px"),
                    $ = e.nodeType && (l.cssNumber[n] || k !== "px" && +y) && Rt.exec(l.css(e, n));
                if ($ && $[3] !== k) {
                    for (y = y / 2, k = k || $[3], $ = +y || 1; g--;) l.style(e, n, $ + k), (1 - p) * (1 - (p = _() / y || .5)) <= 0 && (g = 0), $ = $ / p;
                    $ = $ * 2, l.style(e, n, $ + k), s = s || []
                }
                return s && ($ = +$ || +y || 0, d = s[1] ? $ + (s[1] + 1) * s[2] : +s[2], a && (a.unit = k, a.start = $, a.end = d)), d
            }
            var O = {};

            function H(e) {
                var n, s = e.ownerDocument,
                    a = e.nodeName,
                    d = O[a];
                return d || (n = s.body.appendChild(s.createElement(a)), d = l.css(n, "display"), n.parentNode.removeChild(n), d === "none" && (d = "block"), O[a] = d, d)
            }

            function q(e, n) {
                for (var s, a, d = [], p = 0, g = e.length; p < g; p++) a = e[p], a.style && (s = a.style.display, n ? (s === "none" && (d[p] = oe.get(a, "display") || null, d[p] || (a.style.display = "")), a.style.display === "" && P(a) && (d[p] = H(a))) : s !== "none" && (d[p] = "none", oe.set(a, "display", s)));
                for (p = 0; p < g; p++) d[p] != null && (e[p].style.display = d[p]);
                return e
            }
            l.fn.extend({
                show: function() {
                    return q(this, !0)
                },
                hide: function() {
                    return q(this)
                },
                toggle: function(e) {
                    return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                        P(this) ? l(this).show() : l(this).hide()
                    })
                }
            });
            var V = /^(?:checkbox|radio)$/i,
                z = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                Q = /^$|^module$|\/(?:java|ecma)script/i;
            (function() {
                var e = R.createDocumentFragment(),
                    n = e.appendChild(R.createElement("div")),
                    s = R.createElement("input");
                s.setAttribute("type", "radio"), s.setAttribute("checked", "checked"), s.setAttribute("name", "t"), n.appendChild(s), D.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, n.innerHTML = "<textarea>x</textarea>", D.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue, n.innerHTML = "<option></option>", D.option = !!n.lastChild
            })();
            var J = {
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
            J.tbody = J.tfoot = J.colgroup = J.caption = J.thead, J.th = J.td, D.option || (J.optgroup = J.option = [1, "<select multiple='multiple'>", "</select>"]);

            function te(e, n) {
                var s;
                return typeof e.getElementsByTagName < "u" ? s = e.getElementsByTagName(n || "*") : typeof e.querySelectorAll < "u" ? s = e.querySelectorAll(n || "*") : s = [], n === void 0 || n && X(e, n) ? l.merge([e], s) : s
            }

            function ge(e, n) {
                for (var s = 0, a = e.length; s < a; s++) oe.set(e[s], "globalEval", !n || oe.get(n[s], "globalEval"))
            }
            var Ze = /<|&#?\w+;/;

            function Fe(e, n, s, a, d) {
                for (var p, g, _, y, k, $, U = n.createDocumentFragment(), L = [], M = 0, ce = e.length; M < ce; M++)
                    if (p = e[M], p || p === 0)
                        if (se(p) === "object") l.merge(L, p.nodeType ? [p] : p);
                        else if (!Ze.test(p)) L.push(n.createTextNode(p));
                else {
                    for (g = g || U.appendChild(n.createElement("div")), _ = (z.exec(p) || ["", ""])[1].toLowerCase(), y = J[_] || J._default, g.innerHTML = y[1] + l.htmlPrefilter(p) + y[2], $ = y[0]; $--;) g = g.lastChild;
                    l.merge(L, g.childNodes), g = U.firstChild, g.textContent = ""
                }
                for (U.textContent = "", M = 0; p = L[M++];) {
                    if (a && l.inArray(p, a) > -1) {
                        d && d.push(p);
                        continue
                    }
                    if (k = x(p), g = te(U.appendChild(p), "script"), k && ge(g), s)
                        for ($ = 0; p = g[$++];) Q.test(p.type || "") && s.push(p)
                }
                return U
            }
            var it = /^([^.]*)(?:\.(.+)|)/;

            function Ne() {
                return !0
            }

            function qe() {
                return !1
            }

            function je(e, n) {
                return e === Ot() == (n === "focus")
            }

            function Ot() {
                try {
                    return R.activeElement
                } catch {}
            }

            function lt(e, n, s, a, d, p) {
                var g, _;
                if (typeof n == "object") {
                    typeof s != "string" && (a = a || s, s = void 0);
                    for (_ in n) lt(e, _, s, a, n[_], p);
                    return e
                }
                if (a == null && d == null ? (d = s, a = s = void 0) : d == null && (typeof s == "string" ? (d = a, a = void 0) : (d = a, a = s, s = void 0)), d === !1) d = qe;
                else if (!d) return e;
                return p === 1 && (g = d, d = function(y) {
                    return l().off(y), g.apply(this, arguments)
                }, d.guid = g.guid || (g.guid = l.guid++)), e.each(function() {
                    l.event.add(this, n, d, a, s)
                })
            }
            l.event = {
                global: {},
                add: function(e, n, s, a, d) {
                    var p, g, _, y, k, $, U, L, M, ce, be, le = oe.get(e);
                    if (ke(e))
                        for (s.handler && (p = s, s = p.handler, d = p.selector), d && l.find.matchesSelector(bt, d), s.guid || (s.guid = l.guid++), (y = le.events) || (y = le.events = Object.create(null)), (g = le.handle) || (g = le.handle = function(ot) {
                                return typeof l < "u" && l.event.triggered !== ot.type ? l.event.dispatch.apply(e, arguments) : void 0
                            }), n = (n || "").match(Ie) || [""], k = n.length; k--;) _ = it.exec(n[k]) || [], M = be = _[1], ce = (_[2] || "").split(".").sort(), M && (U = l.event.special[M] || {}, M = (d ? U.delegateType : U.bindType) || M, U = l.event.special[M] || {}, $ = l.extend({
                            type: M,
                            origType: be,
                            data: a,
                            handler: s,
                            guid: s.guid,
                            selector: d,
                            needsContext: d && l.expr.match.needsContext.test(d),
                            namespace: ce.join(".")
                        }, p), (L = y[M]) || (L = y[M] = [], L.delegateCount = 0, (!U.setup || U.setup.call(e, a, ce, g) === !1) && e.addEventListener && e.addEventListener(M, g)), U.add && (U.add.call(e, $), $.handler.guid || ($.handler.guid = s.guid)), d ? L.splice(L.delegateCount++, 0, $) : L.push($), l.event.global[M] = !0)
                },
                remove: function(e, n, s, a, d) {
                    var p, g, _, y, k, $, U, L, M, ce, be, le = oe.hasData(e) && oe.get(e);
                    if (!(!le || !(y = le.events))) {
                        for (n = (n || "").match(Ie) || [""], k = n.length; k--;) {
                            if (_ = it.exec(n[k]) || [], M = be = _[1], ce = (_[2] || "").split(".").sort(), !M) {
                                for (M in y) l.event.remove(e, M + n[k], s, a, !0);
                                continue
                            }
                            for (U = l.event.special[M] || {}, M = (a ? U.delegateType : U.bindType) || M, L = y[M] || [], _ = _[2] && new RegExp("(^|\\.)" + ce.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = p = L.length; p--;) $ = L[p], (d || be === $.origType) && (!s || s.guid === $.guid) && (!_ || _.test($.namespace)) && (!a || a === $.selector || a === "**" && $.selector) && (L.splice(p, 1), $.selector && L.delegateCount--, U.remove && U.remove.call(e, $));
                            g && !L.length && ((!U.teardown || U.teardown.call(e, ce, le.handle) === !1) && l.removeEvent(e, M, le.handle), delete y[M])
                        }
                        l.isEmptyObject(y) && oe.remove(e, "handle events")
                    }
                },
                dispatch: function(e) {
                    var n, s, a, d, p, g, _ = new Array(arguments.length),
                        y = l.event.fix(e),
                        k = (oe.get(this, "events") || Object.create(null))[y.type] || [],
                        $ = l.event.special[y.type] || {};
                    for (_[0] = y, n = 1; n < arguments.length; n++) _[n] = arguments[n];
                    if (y.delegateTarget = this, !($.preDispatch && $.preDispatch.call(this, y) === !1)) {
                        for (g = l.event.handlers.call(this, y, k), n = 0;
                            (d = g[n++]) && !y.isPropagationStopped();)
                            for (y.currentTarget = d.elem, s = 0;
                                (p = d.handlers[s++]) && !y.isImmediatePropagationStopped();)(!y.rnamespace || p.namespace === !1 || y.rnamespace.test(p.namespace)) && (y.handleObj = p, y.data = p.data, a = ((l.event.special[p.origType] || {}).handle || p.handler).apply(d.elem, _), a !== void 0 && (y.result = a) === !1 && (y.preventDefault(), y.stopPropagation()));
                        return $.postDispatch && $.postDispatch.call(this, y), y.result
                    }
                },
                handlers: function(e, n) {
                    var s, a, d, p, g, _ = [],
                        y = n.delegateCount,
                        k = e.target;
                    if (y && k.nodeType && !(e.type === "click" && e.button >= 1)) {
                        for (; k !== this; k = k.parentNode || this)
                            if (k.nodeType === 1 && !(e.type === "click" && k.disabled === !0)) {
                                for (p = [], g = {}, s = 0; s < y; s++) a = n[s], d = a.selector + " ", g[d] === void 0 && (g[d] = a.needsContext ? l(d, this).index(k) > -1 : l.find(d, this, null, [k]).length), g[d] && p.push(a);
                                p.length && _.push({
                                    elem: k,
                                    handlers: p
                                })
                            }
                    }
                    return k = this, y < n.length && _.push({
                        elem: k,
                        handlers: n.slice(y)
                    }), _
                },
                addProp: function(e, n) {
                    Object.defineProperty(l.Event.prototype, e, {
                        enumerable: !0,
                        configurable: !0,
                        get: A(n) ? function() {
                            if (this.originalEvent) return n(this.originalEvent)
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[e]
                        },
                        set: function(s) {
                            Object.defineProperty(this, e, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: s
                            })
                        }
                    })
                },
                fix: function(e) {
                    return e[l.expando] ? e : new l.Event(e)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(e) {
                            var n = this || e;
                            return V.test(n.type) && n.click && X(n, "input") && _t(n, "click", Ne), !1
                        },
                        trigger: function(e) {
                            var n = this || e;
                            return V.test(n.type) && n.click && X(n, "input") && _t(n, "click"), !0
                        },
                        _default: function(e) {
                            var n = e.target;
                            return V.test(n.type) && n.click && X(n, "input") && oe.get(n, "click") || X(n, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            e.result !== void 0 && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                }
            };

            function _t(e, n, s) {
                if (!s) {
                    oe.get(e, n) === void 0 && l.event.add(e, n, Ne);
                    return
                }
                oe.set(e, n, !1), l.event.add(e, n, {
                    namespace: !1,
                    handler: function(a) {
                        var d, p, g = oe.get(this, n);
                        if (a.isTrigger & 1 && this[n]) {
                            if (g.length)(l.event.special[n] || {}).delegateType && a.stopPropagation();
                            else if (g = r.call(arguments), oe.set(this, n, g), d = s(this, n), this[n](), p = oe.get(this, n), g !== p || d ? oe.set(this, n, !1) : p = {}, g !== p) return a.stopImmediatePropagation(), a.preventDefault(), p && p.value
                        } else g.length && (oe.set(this, n, {
                            value: l.event.trigger(l.extend(g[0], l.Event.prototype), g.slice(1), this)
                        }), a.stopImmediatePropagation())
                    }
                })
            }
            l.removeEvent = function(e, n, s) {
                e.removeEventListener && e.removeEventListener(n, s)
            }, l.Event = function(e, n) {
                if (!(this instanceof l.Event)) return new l.Event(e, n);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === void 0 && e.returnValue === !1 ? Ne : qe, this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, n && l.extend(this, n), this.timeStamp = e && e.timeStamp || Date.now(), this[l.expando] = !0
            }, l.Event.prototype = {
                constructor: l.Event,
                isDefaultPrevented: qe,
                isPropagationStopped: qe,
                isImmediatePropagationStopped: qe,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = Ne, e && !this.isSimulated && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = Ne, e && !this.isSimulated && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = Ne, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, l.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, l.event.addProp), l.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, n) {
                l.event.special[e] = {
                    setup: function() {
                        return _t(this, e, je), !1
                    },
                    trigger: function() {
                        return _t(this, e), !0
                    },
                    _default: function(s) {
                        return oe.get(s.target, e)
                    },
                    delegateType: n
                }
            }), l.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, n) {
                l.event.special[e] = {
                    delegateType: n,
                    bindType: n,
                    handle: function(s) {
                        var a, d = this,
                            p = s.relatedTarget,
                            g = s.handleObj;
                        return (!p || p !== d && !l.contains(d, p)) && (s.type = g.origType, a = g.handler.apply(this, arguments), s.type = n), a
                    }
                }
            }), l.fn.extend({
                on: function(e, n, s, a) {
                    return lt(this, e, n, s, a)
                },
                one: function(e, n, s, a) {
                    return lt(this, e, n, s, a, 1)
                },
                off: function(e, n, s) {
                    var a, d;
                    if (e && e.preventDefault && e.handleObj) return a = e.handleObj, l(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler), this;
                    if (typeof e == "object") {
                        for (d in e) this.off(d, n, e[d]);
                        return this
                    }
                    return (n === !1 || typeof n == "function") && (s = n, n = void 0), s === !1 && (s = qe), this.each(function() {
                        l.event.remove(this, e, s, n)
                    })
                }
            });
            var dt = /<script|<style|<link/i,
                Zt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                ei = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

            function Bi(e, n) {
                return X(e, "table") && X(n.nodeType !== 11 ? n : n.firstChild, "tr") && l(e).children("tbody")[0] || e
            }

            function ya(e) {
                return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
            }

            function ba(e) {
                return (e.type || "").slice(0, 5) === "true/" ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
            }

            function Qr(e, n) {
                var s, a, d, p, g, _, y;
                if (n.nodeType === 1) {
                    if (oe.hasData(e) && (p = oe.get(e), y = p.events, y)) {
                        oe.remove(n, "handle events");
                        for (d in y)
                            for (s = 0, a = y[d].length; s < a; s++) l.event.add(n, d, y[d][s])
                    }
                    Ge.hasData(e) && (g = Ge.access(e), _ = l.extend({}, g), Ge.set(n, _))
                }
            }

            function _a(e, n) {
                var s = n.nodeName.toLowerCase();
                s === "input" && V.test(e.type) ? n.checked = e.checked : (s === "input" || s === "textarea") && (n.defaultValue = e.defaultValue)
            }

            function Si(e, n, s, a) {
                n = f(n);
                var d, p, g, _, y, k, $ = 0,
                    U = e.length,
                    L = U - 1,
                    M = n[0],
                    ce = A(M);
                if (ce || U > 1 && typeof M == "string" && !D.checkClone && Zt.test(M)) return e.each(function(be) {
                    var le = e.eq(be);
                    ce && (n[0] = M.call(this, be, le.html())), Si(le, n, s, a)
                });
                if (U && (d = Fe(n, e[0].ownerDocument, !1, e, a), p = d.firstChild, d.childNodes.length === 1 && (d = p), p || a)) {
                    for (g = l.map(te(d, "script"), ya), _ = g.length; $ < U; $++) y = d, $ !== L && (y = l.clone(y, !0, !0), _ && l.merge(g, te(y, "script"))), s.call(e[$], y, $);
                    if (_)
                        for (k = g[g.length - 1].ownerDocument, l.map(g, ba), $ = 0; $ < _; $++) y = g[$], Q.test(y.type || "") && !oe.access(y, "globalEval") && l.contains(k, y) && (y.src && (y.type || "").toLowerCase() !== "module" ? l._evalUrl && !y.noModule && l._evalUrl(y.src, {
                            nonce: y.nonce || y.getAttribute("nonce")
                        }, k) : ue(y.textContent.replace(ei, ""), y, k))
                }
                return e
            }

            function Jr(e, n, s) {
                for (var a, d = n ? l.filter(n, e) : e, p = 0;
                    (a = d[p]) != null; p++) !s && a.nodeType === 1 && l.cleanData(te(a)), a.parentNode && (s && x(a) && ge(te(a, "script")), a.parentNode.removeChild(a));
                return e
            }
            l.extend({
                htmlPrefilter: function(e) {
                    return e
                },
                clone: function(e, n, s) {
                    var a, d, p, g, _ = e.cloneNode(!0),
                        y = x(e);
                    if (!D.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !l.isXMLDoc(e))
                        for (g = te(_), p = te(e), a = 0, d = p.length; a < d; a++) _a(p[a], g[a]);
                    if (n)
                        if (s)
                            for (p = p || te(e), g = g || te(_), a = 0, d = p.length; a < d; a++) Qr(p[a], g[a]);
                        else Qr(e, _);
                    return g = te(_, "script"), g.length > 0 && ge(g, !y && te(e, "script")), _
                },
                cleanData: function(e) {
                    for (var n, s, a, d = l.event.special, p = 0;
                        (s = e[p]) !== void 0; p++)
                        if (ke(s)) {
                            if (n = s[oe.expando]) {
                                if (n.events)
                                    for (a in n.events) d[a] ? l.event.remove(s, a) : l.removeEvent(s, a, n.handle);
                                s[oe.expando] = void 0
                            }
                            s[Ge.expando] && (s[Ge.expando] = void 0)
                        }
                }
            }), l.fn.extend({
                detach: function(e) {
                    return Jr(this, e, !0)
                },
                remove: function(e) {
                    return Jr(this, e)
                },
                text: function(e) {
                    return He(this, function(n) {
                        return n === void 0 ? l.text(this) : this.empty().each(function() {
                            (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = n)
                        })
                    }, null, e, arguments.length)
                },
                append: function() {
                    return Si(this, arguments, function(e) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var n = Bi(this, e);
                            n.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return Si(this, arguments, function(e) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var n = Bi(this, e);
                            n.insertBefore(e, n.firstChild)
                        }
                    })
                },
                before: function() {
                    return Si(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return Si(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, n = 0;
                        (e = this[n]) != null; n++) e.nodeType === 1 && (l.cleanData(te(e, !1)), e.textContent = "");
                    return this
                },
                clone: function(e, n) {
                    return e = e ?? !1, n = n ?? e, this.map(function() {
                        return l.clone(this, e, n)
                    })
                },
                html: function(e) {
                    return He(this, function(n) {
                        var s = this[0] || {},
                            a = 0,
                            d = this.length;
                        if (n === void 0 && s.nodeType === 1) return s.innerHTML;
                        if (typeof n == "string" && !dt.test(n) && !J[(z.exec(n) || ["", ""])[1].toLowerCase()]) {
                            n = l.htmlPrefilter(n);
                            try {
                                for (; a < d; a++) s = this[a] || {}, s.nodeType === 1 && (l.cleanData(te(s, !1)), s.innerHTML = n);
                                s = 0
                            } catch {}
                        }
                        s && this.empty().append(n)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return Si(this, arguments, function(n) {
                        var s = this.parentNode;
                        l.inArray(this, e) < 0 && (l.cleanData(te(this)), s && s.replaceChild(n, this))
                    }, e)
                }
            }), l.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, n) {
                l.fn[e] = function(s) {
                    for (var a, d = [], p = l(s), g = p.length - 1, _ = 0; _ <= g; _++) a = _ === g ? this : this.clone(!0), l(p[_])[n](a), h.apply(d, a.get());
                    return this.pushStack(d)
                }
            });
            var Vn = new RegExp("^(" + Jt + ")(?!px)[a-z%]+$", "i"),
                Bn = /^--/,
                fn = function(e) {
                    var n = e.ownerDocument.defaultView;
                    return (!n || !n.opener) && (n = i), n.getComputedStyle(e)
                },
                Zr = function(e, n, s) {
                    var a, d, p = {};
                    for (d in n) p[d] = e.style[d], e.style[d] = n[d];
                    a = s.call(e);
                    for (d in n) e.style[d] = p[d];
                    return a
                },
                wa = new RegExp(at.join("|"), "i"),
                eo = "[\\x20\\t\\r\\n\\f]",
                Ta = new RegExp("^" + eo + "+|((?:^|[^\\\\])(?:\\\\.)*)" + eo + "+$", "g");
            (function() {
                function e() {
                    if (k) {
                        y.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", k.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", bt.appendChild(y).appendChild(k);
                        var $ = i.getComputedStyle(k);
                        s = $.top !== "1%", _ = n($.marginLeft) === 12, k.style.right = "60%", p = n($.right) === 36, a = n($.width) === 36, k.style.position = "absolute", d = n(k.offsetWidth / 3) === 12, bt.removeChild(y), k = null
                    }
                }

                function n($) {
                    return Math.round(parseFloat($))
                }
                var s, a, d, p, g, _, y = R.createElement("div"),
                    k = R.createElement("div");
                k.style && (k.style.backgroundClip = "content-box", k.cloneNode(!0).style.backgroundClip = "", D.clearCloneStyle = k.style.backgroundClip === "content-box", l.extend(D, {
                    boxSizingReliable: function() {
                        return e(), a
                    },
                    pixelBoxStyles: function() {
                        return e(), p
                    },
                    pixelPosition: function() {
                        return e(), s
                    },
                    reliableMarginLeft: function() {
                        return e(), _
                    },
                    scrollboxSize: function() {
                        return e(), d
                    },
                    reliableTrDimensions: function() {
                        var $, U, L, M;
                        return g == null && ($ = R.createElement("table"), U = R.createElement("tr"), L = R.createElement("div"), $.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", U.style.cssText = "border:1px solid", U.style.height = "1px", L.style.height = "9px", L.style.display = "block", bt.appendChild($).appendChild(U).appendChild(L), M = i.getComputedStyle(U), g = parseInt(M.height, 10) + parseInt(M.borderTopWidth, 10) + parseInt(M.borderBottomWidth, 10) === U.offsetHeight, bt.removeChild($)), g
                    }
                }))
            })();

            function Ui(e, n, s) {
                var a, d, p, g, _ = Bn.test(n),
                    y = e.style;
                return s = s || fn(e), s && (g = s.getPropertyValue(n) || s[n], _ && g && (g = g.replace(Ta, "$1") || void 0), g === "" && !x(e) && (g = l.style(e, n)), !D.pixelBoxStyles() && Vn.test(g) && wa.test(n) && (a = y.width, d = y.minWidth, p = y.maxWidth, y.minWidth = y.maxWidth = y.width = g, g = s.width, y.width = a, y.minWidth = d, y.maxWidth = p)), g !== void 0 ? g + "" : g
            }

            function to(e, n) {
                return {
                    get: function() {
                        if (e()) {
                            delete this.get;
                            return
                        }
                        return (this.get = n).apply(this, arguments)
                    }
                }
            }
            var io = ["Webkit", "Moz", "ms"],
                no = R.createElement("div").style,
                ro = {};

            function Ea(e) {
                for (var n = e[0].toUpperCase() + e.slice(1), s = io.length; s--;)
                    if (e = io[s] + n, e in no) return e
            }

            function Un(e) {
                var n = l.cssProps[e] || ro[e];
                return n || (e in no ? e : ro[e] = Ea(e) || e)
            }
            var Sa = /^(none|table(?!-c[ea]).+)/,
                xa = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                oo = {
                    letterSpacing: "0",
                    fontWeight: "400"
                };

            function so(e, n, s) {
                var a = Rt.exec(n);
                return a ? Math.max(0, a[2] - (s || 0)) + (a[3] || "px") : n
            }

            function Yn(e, n, s, a, d, p) {
                var g = n === "width" ? 1 : 0,
                    _ = 0,
                    y = 0;
                if (s === (a ? "border" : "content")) return 0;
                for (; g < 4; g += 2) s === "margin" && (y += l.css(e, s + at[g], !0, d)), a ? (s === "content" && (y -= l.css(e, "padding" + at[g], !0, d)), s !== "margin" && (y -= l.css(e, "border" + at[g] + "Width", !0, d))) : (y += l.css(e, "padding" + at[g], !0, d), s !== "padding" ? y += l.css(e, "border" + at[g] + "Width", !0, d) : _ += l.css(e, "border" + at[g] + "Width", !0, d));
                return !a && p >= 0 && (y += Math.max(0, Math.ceil(e["offset" + n[0].toUpperCase() + n.slice(1)] - p - y - _ - .5)) || 0), y
            }

            function ao(e, n, s) {
                var a = fn(e),
                    d = !D.boxSizingReliable() || s,
                    p = d && l.css(e, "boxSizing", !1, a) === "border-box",
                    g = p,
                    _ = Ui(e, n, a),
                    y = "offset" + n[0].toUpperCase() + n.slice(1);
                if (Vn.test(_)) {
                    if (!s) return _;
                    _ = "auto"
                }
                return (!D.boxSizingReliable() && p || !D.reliableTrDimensions() && X(e, "tr") || _ === "auto" || !parseFloat(_) && l.css(e, "display", !1, a) === "inline") && e.getClientRects().length && (p = l.css(e, "boxSizing", !1, a) === "border-box", g = y in e, g && (_ = e[y])), _ = parseFloat(_) || 0, _ + Yn(e, n, s || (p ? "border" : "content"), g, a, _) + "px"
            }
            l.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, n) {
                            if (n) {
                                var s = Ui(e, "opacity");
                                return s === "" ? "1" : s
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {},
                style: function(e, n, s, a) {
                    if (!(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)) {
                        var d, p, g, _ = Te(n),
                            y = Bn.test(n),
                            k = e.style;
                        if (y || (n = Un(_)), g = l.cssHooks[n] || l.cssHooks[_], s !== void 0) {
                            if (p = typeof s, p === "string" && (d = Rt.exec(s)) && d[1] && (s = j(e, n, d), p = "number"), s == null || s !== s) return;
                            p === "number" && !y && (s += d && d[3] || (l.cssNumber[_] ? "" : "px")), !D.clearCloneStyle && s === "" && n.indexOf("background") === 0 && (k[n] = "inherit"), (!g || !("set" in g) || (s = g.set(e, s, a)) !== void 0) && (y ? k.setProperty(n, s) : k[n] = s)
                        } else return g && "get" in g && (d = g.get(e, !1, a)) !== void 0 ? d : k[n]
                    }
                },
                css: function(e, n, s, a) {
                    var d, p, g, _ = Te(n),
                        y = Bn.test(n);
                    return y || (n = Un(_)), g = l.cssHooks[n] || l.cssHooks[_], g && "get" in g && (d = g.get(e, !0, s)), d === void 0 && (d = Ui(e, n, a)), d === "normal" && n in oo && (d = oo[n]), s === "" || s ? (p = parseFloat(d), s === !0 || isFinite(p) ? p || 0 : d) : d
                }
            }), l.each(["height", "width"], function(e, n) {
                l.cssHooks[n] = {
                    get: function(s, a, d) {
                        if (a) return Sa.test(l.css(s, "display")) && (!s.getClientRects().length || !s.getBoundingClientRect().width) ? Zr(s, xa, function() {
                            return ao(s, n, d)
                        }) : ao(s, n, d)
                    },
                    set: function(s, a, d) {
                        var p, g = fn(s),
                            _ = !D.scrollboxSize() && g.position === "absolute",
                            y = _ || d,
                            k = y && l.css(s, "boxSizing", !1, g) === "border-box",
                            $ = d ? Yn(s, n, d, k, g) : 0;
                        return k && _ && ($ -= Math.ceil(s["offset" + n[0].toUpperCase() + n.slice(1)] - parseFloat(g[n]) - Yn(s, n, "border", !1, g) - .5)), $ && (p = Rt.exec(a)) && (p[3] || "px") !== "px" && (s.style[n] = a, a = l.css(s, n)), so(s, a, $)
                    }
                }
            }), l.cssHooks.marginLeft = to(D.reliableMarginLeft, function(e, n) {
                if (n) return (parseFloat(Ui(e, "marginLeft")) || e.getBoundingClientRect().left - Zr(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
            }), l.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, n) {
                l.cssHooks[e + n] = {
                    expand: function(s) {
                        for (var a = 0, d = {}, p = typeof s == "string" ? s.split(" ") : [s]; a < 4; a++) d[e + at[a] + n] = p[a] || p[a - 2] || p[0];
                        return d
                    }
                }, e !== "margin" && (l.cssHooks[e + n].set = so)
            }), l.fn.extend({
                css: function(e, n) {
                    return He(this, function(s, a, d) {
                        var p, g, _ = {},
                            y = 0;
                        if (Array.isArray(a)) {
                            for (p = fn(s), g = a.length; y < g; y++) _[a[y]] = l.css(s, a[y], !1, p);
                            return _
                        }
                        return d !== void 0 ? l.style(s, a, d) : l.css(s, a)
                    }, e, n, arguments.length > 1)
                }
            });

            function mt(e, n, s, a, d) {
                return new mt.prototype.init(e, n, s, a, d)
            }
            l.Tween = mt, mt.prototype = {
                constructor: mt,
                init: function(e, n, s, a, d, p) {
                    this.elem = e, this.prop = s, this.easing = d || l.easing._default, this.options = n, this.start = this.now = this.cur(), this.end = a, this.unit = p || (l.cssNumber[s] ? "" : "px")
                },
                cur: function() {
                    var e = mt.propHooks[this.prop];
                    return e && e.get ? e.get(this) : mt.propHooks._default.get(this)
                },
                run: function(e) {
                    var n, s = mt.propHooks[this.prop];
                    return this.options.duration ? this.pos = n = l.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = n = e, this.now = (this.end - this.start) * n + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), s && s.set ? s.set(this) : mt.propHooks._default.set(this), this
                }
            }, mt.prototype.init.prototype = mt.prototype, mt.propHooks = {
                _default: {
                    get: function(e) {
                        var n;
                        return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (n = l.css(e.elem, e.prop, ""), !n || n === "auto" ? 0 : n)
                    },
                    set: function(e) {
                        l.fx.step[e.prop] ? l.fx.step[e.prop](e) : e.elem.nodeType === 1 && (l.cssHooks[e.prop] || e.elem.style[Un(e.prop)] != null) ? l.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                    }
                }
            }, mt.propHooks.scrollTop = mt.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, l.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            }, l.fx = mt.prototype.init, l.fx.step = {};
            var xi, dn, Ca = /^(?:toggle|show|hide)$/,
                Aa = /queueHooks$/;

            function Kn() {
                dn && (R.hidden === !1 && i.requestAnimationFrame ? i.requestAnimationFrame(Kn) : i.setTimeout(Kn, l.fx.interval), l.fx.tick())
            }

            function lo() {
                return i.setTimeout(function() {
                    xi = void 0
                }), xi = Date.now()
            }

            function pn(e, n) {
                var s, a = 0,
                    d = {
                        height: e
                    };
                for (n = n ? 1 : 0; a < 4; a += 2 - n) s = at[a], d["margin" + s] = d["padding" + s] = e;
                return n && (d.opacity = d.width = e), d
            }

            function co(e, n, s) {
                for (var a, d = (It.tweeners[n] || []).concat(It.tweeners["*"]), p = 0, g = d.length; p < g; p++)
                    if (a = d[p].call(s, n, e)) return a
            }

            function ka(e, n, s) {
                var a, d, p, g, _, y, k, $, U = "width" in n || "height" in n,
                    L = this,
                    M = {},
                    ce = e.style,
                    be = e.nodeType && P(e),
                    le = oe.get(e, "fxshow");
                s.queue || (g = l._queueHooks(e, "fx"), g.unqueued == null && (g.unqueued = 0, _ = g.empty.fire, g.empty.fire = function() {
                    g.unqueued || _()
                }), g.unqueued++, L.always(function() {
                    L.always(function() {
                        g.unqueued--, l.queue(e, "fx").length || g.empty.fire()
                    })
                }));
                for (a in n)
                    if (d = n[a], Ca.test(d)) {
                        if (delete n[a], p = p || d === "toggle", d === (be ? "hide" : "show"))
                            if (d === "show" && le && le[a] !== void 0) be = !0;
                            else continue;
                        M[a] = le && le[a] || l.style(e, a)
                    } if (y = !l.isEmptyObject(n), !(!y && l.isEmptyObject(M))) {
                    U && e.nodeType === 1 && (s.overflow = [ce.overflow, ce.overflowX, ce.overflowY], k = le && le.display, k == null && (k = oe.get(e, "display")), $ = l.css(e, "display"), $ === "none" && (k ? $ = k : (q([e], !0), k = e.style.display || k, $ = l.css(e, "display"), q([e]))), ($ === "inline" || $ === "inline-block" && k != null) && l.css(e, "float") === "none" && (y || (L.done(function() {
                        ce.display = k
                    }), k == null && ($ = ce.display, k = $ === "none" ? "" : $)), ce.display = "inline-block")), s.overflow && (ce.overflow = "hidden", L.always(function() {
                        ce.overflow = s.overflow[0], ce.overflowX = s.overflow[1], ce.overflowY = s.overflow[2]
                    })), y = !1;
                    for (a in M) y || (le ? "hidden" in le && (be = le.hidden) : le = oe.access(e, "fxshow", {
                        display: k
                    }), p && (le.hidden = !be), be && q([e], !0), L.done(function() {
                        be || q([e]), oe.remove(e, "fxshow");
                        for (a in M) l.style(e, a, M[a])
                    })), y = co(be ? le[a] : 0, a, L), a in le || (le[a] = y.start, be && (y.end = y.start, y.start = 0))
                }
            }

            function Oa(e, n) {
                var s, a, d, p, g;
                for (s in e)
                    if (a = Te(s), d = n[a], p = e[s], Array.isArray(p) && (d = p[1], p = e[s] = p[0]), s !== a && (e[a] = p, delete e[s]), g = l.cssHooks[a], g && "expand" in g) {
                        p = g.expand(p), delete e[a];
                        for (s in p) s in e || (e[s] = p[s], n[s] = d)
                    } else n[a] = d
            }

            function It(e, n, s) {
                var a, d, p = 0,
                    g = It.prefilters.length,
                    _ = l.Deferred().always(function() {
                        delete y.elem
                    }),
                    y = function() {
                        if (d) return !1;
                        for (var U = xi || lo(), L = Math.max(0, k.startTime + k.duration - U), M = L / k.duration || 0, ce = 1 - M, be = 0, le = k.tweens.length; be < le; be++) k.tweens[be].run(ce);
                        return _.notifyWith(e, [k, ce, L]), ce < 1 && le ? L : (le || _.notifyWith(e, [k, 1, 0]), _.resolveWith(e, [k]), !1)
                    },
                    k = _.promise({
                        elem: e,
                        props: l.extend({}, n),
                        opts: l.extend(!0, {
                            specialEasing: {},
                            easing: l.easing._default
                        }, s),
                        originalProperties: n,
                        originalOptions: s,
                        startTime: xi || lo(),
                        duration: s.duration,
                        tweens: [],
                        createTween: function(U, L) {
                            var M = l.Tween(e, k.opts, U, L, k.opts.specialEasing[U] || k.opts.easing);
                            return k.tweens.push(M), M
                        },
                        stop: function(U) {
                            var L = 0,
                                M = U ? k.tweens.length : 0;
                            if (d) return this;
                            for (d = !0; L < M; L++) k.tweens[L].run(1);
                            return U ? (_.notifyWith(e, [k, 1, 0]), _.resolveWith(e, [k, U])) : _.rejectWith(e, [k, U]), this
                        }
                    }),
                    $ = k.props;
                for (Oa($, k.opts.specialEasing); p < g; p++)
                    if (a = It.prefilters[p].call(k, e, $, k.opts), a) return A(a.stop) && (l._queueHooks(k.elem, k.opts.queue).stop = a.stop.bind(a)), a;
                return l.map($, co, k), A(k.opts.start) && k.opts.start.call(e, k), k.progress(k.opts.progress).done(k.opts.done, k.opts.complete).fail(k.opts.fail).always(k.opts.always), l.fx.timer(l.extend(y, {
                    elem: e,
                    anim: k,
                    queue: k.opts.queue
                })), k
            }
            l.Animation = l.extend(It, {
                    tweeners: {
                        "*": [function(e, n) {
                            var s = this.createTween(e, n);
                            return j(s.elem, e, Rt.exec(n), s), s
                        }]
                    },
                    tweener: function(e, n) {
                        A(e) ? (n = e, e = ["*"]) : e = e.match(Ie);
                        for (var s, a = 0, d = e.length; a < d; a++) s = e[a], It.tweeners[s] = It.tweeners[s] || [], It.tweeners[s].unshift(n)
                    },
                    prefilters: [ka],
                    prefilter: function(e, n) {
                        n ? It.prefilters.unshift(e) : It.prefilters.push(e)
                    }
                }), l.speed = function(e, n, s) {
                    var a = e && typeof e == "object" ? l.extend({}, e) : {
                        complete: s || !s && n || A(e) && e,
                        duration: e,
                        easing: s && n || n && !A(n) && n
                    };
                    return l.fx.off ? a.duration = 0 : typeof a.duration != "number" && (a.duration in l.fx.speeds ? a.duration = l.fx.speeds[a.duration] : a.duration = l.fx.speeds._default), (a.queue == null || a.queue === !0) && (a.queue = "fx"), a.old = a.complete, a.complete = function() {
                        A(a.old) && a.old.call(this), a.queue && l.dequeue(this, a.queue)
                    }, a
                }, l.fn.extend({
                    fadeTo: function(e, n, s, a) {
                        return this.filter(P).css("opacity", 0).show().end().animate({
                            opacity: n
                        }, e, s, a)
                    },
                    animate: function(e, n, s, a) {
                        var d = l.isEmptyObject(e),
                            p = l.speed(n, s, a),
                            g = function() {
                                var _ = It(this, l.extend({}, e), p);
                                (d || oe.get(this, "finish")) && _.stop(!0)
                            };
                        return g.finish = g, d || p.queue === !1 ? this.each(g) : this.queue(p.queue, g)
                    },
                    stop: function(e, n, s) {
                        var a = function(d) {
                            var p = d.stop;
                            delete d.stop, p(s)
                        };
                        return typeof e != "string" && (s = n, n = e, e = void 0), n && this.queue(e || "fx", []), this.each(function() {
                            var d = !0,
                                p = e != null && e + "queueHooks",
                                g = l.timers,
                                _ = oe.get(this);
                            if (p) _[p] && _[p].stop && a(_[p]);
                            else
                                for (p in _) _[p] && _[p].stop && Aa.test(p) && a(_[p]);
                            for (p = g.length; p--;) g[p].elem === this && (e == null || g[p].queue === e) && (g[p].anim.stop(s), d = !1, g.splice(p, 1));
                            (d || !s) && l.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"), this.each(function() {
                            var n, s = oe.get(this),
                                a = s[e + "queue"],
                                d = s[e + "queueHooks"],
                                p = l.timers,
                                g = a ? a.length : 0;
                            for (s.finish = !0, l.queue(this, e, []), d && d.stop && d.stop.call(this, !0), n = p.length; n--;) p[n].elem === this && p[n].queue === e && (p[n].anim.stop(!0), p.splice(n, 1));
                            for (n = 0; n < g; n++) a[n] && a[n].finish && a[n].finish.call(this);
                            delete s.finish
                        })
                    }
                }), l.each(["toggle", "show", "hide"], function(e, n) {
                    var s = l.fn[n];
                    l.fn[n] = function(a, d, p) {
                        return a == null || typeof a == "boolean" ? s.apply(this, arguments) : this.animate(pn(n, !0), a, d, p)
                    }
                }), l.each({
                    slideDown: pn("show"),
                    slideUp: pn("hide"),
                    slideToggle: pn("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, n) {
                    l.fn[e] = function(s, a, d) {
                        return this.animate(n, s, a, d)
                    }
                }), l.timers = [], l.fx.tick = function() {
                    var e, n = 0,
                        s = l.timers;
                    for (xi = Date.now(); n < s.length; n++) e = s[n], !e() && s[n] === e && s.splice(n--, 1);
                    s.length || l.fx.stop(), xi = void 0
                }, l.fx.timer = function(e) {
                    l.timers.push(e), l.fx.start()
                }, l.fx.interval = 13, l.fx.start = function() {
                    dn || (dn = !0, Kn())
                }, l.fx.stop = function() {
                    dn = null
                }, l.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, l.fn.delay = function(e, n) {
                    return e = l.fx && l.fx.speeds[e] || e, n = n || "fx", this.queue(n, function(s, a) {
                        var d = i.setTimeout(s, e);
                        a.stop = function() {
                            i.clearTimeout(d)
                        }
                    })
                },
                function() {
                    var e = R.createElement("input"),
                        n = R.createElement("select"),
                        s = n.appendChild(R.createElement("option"));
                    e.type = "checkbox", D.checkOn = e.value !== "", D.optSelected = s.selected, e = R.createElement("input"), e.value = "t", e.type = "radio", D.radioValue = e.value === "t"
                }();
            var uo, Yi = l.expr.attrHandle;
            l.fn.extend({
                attr: function(e, n) {
                    return He(this, l.attr, e, n, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        l.removeAttr(this, e)
                    })
                }
            }), l.extend({
                attr: function(e, n, s) {
                    var a, d, p = e.nodeType;
                    if (!(p === 3 || p === 8 || p === 2)) {
                        if (typeof e.getAttribute > "u") return l.prop(e, n, s);
                        if ((p !== 1 || !l.isXMLDoc(e)) && (d = l.attrHooks[n.toLowerCase()] || (l.expr.match.bool.test(n) ? uo : void 0)), s !== void 0) {
                            if (s === null) {
                                l.removeAttr(e, n);
                                return
                            }
                            return d && "set" in d && (a = d.set(e, s, n)) !== void 0 ? a : (e.setAttribute(n, s + ""), s)
                        }
                        return d && "get" in d && (a = d.get(e, n)) !== null ? a : (a = l.find.attr(e, n), a ?? void 0)
                    }
                },
                attrHooks: {
                    type: {
                        set: function(e, n) {
                            if (!D.radioValue && n === "radio" && X(e, "input")) {
                                var s = e.value;
                                return e.setAttribute("type", n), s && (e.value = s), n
                            }
                        }
                    }
                },
                removeAttr: function(e, n) {
                    var s, a = 0,
                        d = n && n.match(Ie);
                    if (d && e.nodeType === 1)
                        for (; s = d[a++];) e.removeAttribute(s)
                }
            }), uo = {
                set: function(e, n, s) {
                    return n === !1 ? l.removeAttr(e, s) : e.setAttribute(s, s), s
                }
            }, l.each(l.expr.match.bool.source.match(/\w+/g), function(e, n) {
                var s = Yi[n] || l.find.attr;
                Yi[n] = function(a, d, p) {
                    var g, _, y = d.toLowerCase();
                    return p || (_ = Yi[y], Yi[y] = g, g = s(a, d, p) != null ? y : null, Yi[y] = _), g
                }
            });
            var Na = /^(?:input|select|textarea|button)$/i,
                La = /^(?:a|area)$/i;
            l.fn.extend({
                prop: function(e, n) {
                    return He(this, l.prop, e, n, arguments.length > 1)
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[l.propFix[e] || e]
                    })
                }
            }), l.extend({
                prop: function(e, n, s) {
                    var a, d, p = e.nodeType;
                    if (!(p === 3 || p === 8 || p === 2)) return (p !== 1 || !l.isXMLDoc(e)) && (n = l.propFix[n] || n, d = l.propHooks[n]), s !== void 0 ? d && "set" in d && (a = d.set(e, s, n)) !== void 0 ? a : e[n] = s : d && "get" in d && (a = d.get(e, n)) !== null ? a : e[n]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var n = l.find.attr(e, "tabindex");
                            return n ? parseInt(n, 10) : Na.test(e.nodeName) || La.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), D.optSelected || (l.propHooks.selected = {
                get: function(e) {
                    var n = e.parentNode;
                    return n && n.parentNode && n.parentNode.selectedIndex, null
                },
                set: function(e) {
                    var n = e.parentNode;
                    n && (n.selectedIndex, n.parentNode && n.parentNode.selectedIndex)
                }
            }), l.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                l.propFix[this.toLowerCase()] = this
            });

            function ui(e) {
                var n = e.match(Ie) || [];
                return n.join(" ")
            }

            function fi(e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }

            function Xn(e) {
                return Array.isArray(e) ? e : typeof e == "string" ? e.match(Ie) || [] : []
            }
            l.fn.extend({
                addClass: function(e) {
                    var n, s, a, d, p, g;
                    return A(e) ? this.each(function(_) {
                        l(this).addClass(e.call(this, _, fi(this)))
                    }) : (n = Xn(e), n.length ? this.each(function() {
                        if (a = fi(this), s = this.nodeType === 1 && " " + ui(a) + " ", s) {
                            for (p = 0; p < n.length; p++) d = n[p], s.indexOf(" " + d + " ") < 0 && (s += d + " ");
                            g = ui(s), a !== g && this.setAttribute("class", g)
                        }
                    }) : this)
                },
                removeClass: function(e) {
                    var n, s, a, d, p, g;
                    return A(e) ? this.each(function(_) {
                        l(this).removeClass(e.call(this, _, fi(this)))
                    }) : arguments.length ? (n = Xn(e), n.length ? this.each(function() {
                        if (a = fi(this), s = this.nodeType === 1 && " " + ui(a) + " ", s) {
                            for (p = 0; p < n.length; p++)
                                for (d = n[p]; s.indexOf(" " + d + " ") > -1;) s = s.replace(" " + d + " ", " ");
                            g = ui(s), a !== g && this.setAttribute("class", g)
                        }
                    }) : this) : this.attr("class", "")
                },
                toggleClass: function(e, n) {
                    var s, a, d, p, g = typeof e,
                        _ = g === "string" || Array.isArray(e);
                    return A(e) ? this.each(function(y) {
                        l(this).toggleClass(e.call(this, y, fi(this), n), n)
                    }) : typeof n == "boolean" && _ ? n ? this.addClass(e) : this.removeClass(e) : (s = Xn(e), this.each(function() {
                        if (_)
                            for (p = l(this), d = 0; d < s.length; d++) a = s[d], p.hasClass(a) ? p.removeClass(a) : p.addClass(a);
                        else(e === void 0 || g === "boolean") && (a = fi(this), a && oe.set(this, "__className__", a), this.setAttribute && this.setAttribute("class", a || e === !1 ? "" : oe.get(this, "__className__") || ""))
                    }))
                },
                hasClass: function(e) {
                    var n, s, a = 0;
                    for (n = " " + e + " "; s = this[a++];)
                        if (s.nodeType === 1 && (" " + ui(fi(s)) + " ").indexOf(n) > -1) return !0;
                    return !1
                }
            });
            var Da = /\r/g;
            l.fn.extend({
                val: function(e) {
                    var n, s, a, d = this[0];
                    return arguments.length ? (a = A(e), this.each(function(p) {
                        var g;
                        this.nodeType === 1 && (a ? g = e.call(this, p, l(this).val()) : g = e, g == null ? g = "" : typeof g == "number" ? g += "" : Array.isArray(g) && (g = l.map(g, function(_) {
                            return _ == null ? "" : _ + ""
                        })), n = l.valHooks[this.type] || l.valHooks[this.nodeName.toLowerCase()], (!n || !("set" in n) || n.set(this, g, "value") === void 0) && (this.value = g))
                    })) : d ? (n = l.valHooks[d.type] || l.valHooks[d.nodeName.toLowerCase()], n && "get" in n && (s = n.get(d, "value")) !== void 0 ? s : (s = d.value, typeof s == "string" ? s.replace(Da, "") : s ?? "")) : void 0
                }
            }), l.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var n = l.find.attr(e, "value");
                            return n ?? ui(l.text(e))
                        }
                    },
                    select: {
                        get: function(e) {
                            var n, s, a, d = e.options,
                                p = e.selectedIndex,
                                g = e.type === "select-one",
                                _ = g ? null : [],
                                y = g ? p + 1 : d.length;
                            for (p < 0 ? a = y : a = g ? p : 0; a < y; a++)
                                if (s = d[a], (s.selected || a === p) && !s.disabled && (!s.parentNode.disabled || !X(s.parentNode, "optgroup"))) {
                                    if (n = l(s).val(), g) return n;
                                    _.push(n)
                                } return _
                        },
                        set: function(e, n) {
                            for (var s, a, d = e.options, p = l.makeArray(n), g = d.length; g--;) a = d[g], (a.selected = l.inArray(l.valHooks.option.get(a), p) > -1) && (s = !0);
                            return s || (e.selectedIndex = -1), p
                        }
                    }
                }
            }), l.each(["radio", "checkbox"], function() {
                l.valHooks[this] = {
                    set: function(e, n) {
                        if (Array.isArray(n)) return e.checked = l.inArray(l(e).val(), n) > -1
                    }
                }, D.checkOn || (l.valHooks[this].get = function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                })
            }), D.focusin = "onfocusin" in i;
            var fo = /^(?:focusinfocus|focusoutblur)$/,
                po = function(e) {
                    e.stopPropagation()
                };
            l.extend(l.event, {
                trigger: function(e, n, s, a) {
                    var d, p, g, _, y, k, $, U, L = [s || R],
                        M = I.call(e, "type") ? e.type : e,
                        ce = I.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (p = U = g = s = s || R, !(s.nodeType === 3 || s.nodeType === 8) && !fo.test(M + l.event.triggered) && (M.indexOf(".") > -1 && (ce = M.split("."), M = ce.shift(), ce.sort()), y = M.indexOf(":") < 0 && "on" + M, e = e[l.expando] ? e : new l.Event(M, typeof e == "object" && e), e.isTrigger = a ? 2 : 3, e.namespace = ce.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + ce.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = s), n = n == null ? [e] : l.makeArray(n, [e]), $ = l.event.special[M] || {}, !(!a && $.trigger && $.trigger.apply(s, n) === !1))) {
                        if (!a && !$.noBubble && !B(s)) {
                            for (_ = $.delegateType || M, fo.test(_ + M) || (p = p.parentNode); p; p = p.parentNode) L.push(p), g = p;
                            g === (s.ownerDocument || R) && L.push(g.defaultView || g.parentWindow || i)
                        }
                        for (d = 0;
                            (p = L[d++]) && !e.isPropagationStopped();) U = p, e.type = d > 1 ? _ : $.bindType || M, k = (oe.get(p, "events") || Object.create(null))[e.type] && oe.get(p, "handle"), k && k.apply(p, n), k = y && p[y], k && k.apply && ke(p) && (e.result = k.apply(p, n), e.result === !1 && e.preventDefault());
                        return e.type = M, !a && !e.isDefaultPrevented() && (!$._default || $._default.apply(L.pop(), n) === !1) && ke(s) && y && A(s[M]) && !B(s) && (g = s[y], g && (s[y] = null), l.event.triggered = M, e.isPropagationStopped() && U.addEventListener(M, po), s[M](), e.isPropagationStopped() && U.removeEventListener(M, po), l.event.triggered = void 0, g && (s[y] = g)), e.result
                    }
                },
                simulate: function(e, n, s) {
                    var a = l.extend(new l.Event, s, {
                        type: e,
                        isSimulated: !0
                    });
                    l.event.trigger(a, null, n)
                }
            }), l.fn.extend({
                trigger: function(e, n) {
                    return this.each(function() {
                        l.event.trigger(e, n, this)
                    })
                },
                triggerHandler: function(e, n) {
                    var s = this[0];
                    if (s) return l.event.trigger(e, n, s, !0)
                }
            }), D.focusin || l.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, n) {
                var s = function(a) {
                    l.event.simulate(n, a.target, l.event.fix(a))
                };
                l.event.special[n] = {
                    setup: function() {
                        var a = this.ownerDocument || this.document || this,
                            d = oe.access(a, n);
                        d || a.addEventListener(e, s, !0), oe.access(a, n, (d || 0) + 1)
                    },
                    teardown: function() {
                        var a = this.ownerDocument || this.document || this,
                            d = oe.access(a, n) - 1;
                        d ? oe.access(a, n, d) : (a.removeEventListener(e, s, !0), oe.remove(a, n))
                    }
                }
            });
            var Ki = i.location,
                ho = {
                    guid: Date.now()
                },
                Gn = /\?/;
            l.parseXML = function(e) {
                var n, s;
                if (!e || typeof e != "string") return null;
                try {
                    n = new i.DOMParser().parseFromString(e, "text/xml")
                } catch {}
                return s = n && n.getElementsByTagName("parsererror")[0], (!n || s) && l.error("Invalid XML: " + (s ? l.map(s.childNodes, function(a) {
                    return a.textContent
                }).join(`
`) : e)), n
            };
            var $a = /\[\]$/,
                go = /\r?\n/g,
                Pa = /^(?:submit|button|image|reset|file)$/i,
                Ia = /^(?:input|select|textarea|keygen)/i;

            function Qn(e, n, s, a) {
                var d;
                if (Array.isArray(n)) l.each(n, function(p, g) {
                    s || $a.test(e) ? a(e, g) : Qn(e + "[" + (typeof g == "object" && g != null ? p : "") + "]", g, s, a)
                });
                else if (!s && se(n) === "object")
                    for (d in n) Qn(e + "[" + d + "]", n[d], s, a);
                else a(e, n)
            }
            l.param = function(e, n) {
                var s, a = [],
                    d = function(p, g) {
                        var _ = A(g) ? g() : g;
                        a[a.length] = encodeURIComponent(p) + "=" + encodeURIComponent(_ ?? "")
                    };
                if (e == null) return "";
                if (Array.isArray(e) || e.jquery && !l.isPlainObject(e)) l.each(e, function() {
                    d(this.name, this.value)
                });
                else
                    for (s in e) Qn(s, e[s], n, d);
                return a.join("&")
            }, l.fn.extend({
                serialize: function() {
                    return l.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = l.prop(this, "elements");
                        return e ? l.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !l(this).is(":disabled") && Ia.test(this.nodeName) && !Pa.test(e) && (this.checked || !V.test(e))
                    }).map(function(e, n) {
                        var s = l(this).val();
                        return s == null ? null : Array.isArray(s) ? l.map(s, function(a) {
                            return {
                                name: n.name,
                                value: a.replace(go, `\r
`)
                            }
                        }) : {
                            name: n.name,
                            value: s.replace(go, `\r
`)
                        }
                    }).get()
                }
            });
            var Ma = /%20/g,
                Ha = /#.*$/,
                ja = /([?&])_=[^&]*/,
                Ra = /^(.*?):[ \t]*([^\r\n]*)$/mg,
                Wa = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                qa = /^(?:GET|HEAD)$/,
                za = /^\/\//,
                mo = {},
                Jn = {},
                vo = "*/".concat("*"),
                Zn = R.createElement("a");
            Zn.href = Ki.href;

            function yo(e) {
                return function(n, s) {
                    typeof n != "string" && (s = n, n = "*");
                    var a, d = 0,
                        p = n.toLowerCase().match(Ie) || [];
                    if (A(s))
                        for (; a = p[d++];) a[0] === "+" ? (a = a.slice(1) || "*", (e[a] = e[a] || []).unshift(s)) : (e[a] = e[a] || []).push(s)
                }
            }

            function bo(e, n, s, a) {
                var d = {},
                    p = e === Jn;

                function g(_) {
                    var y;
                    return d[_] = !0, l.each(e[_] || [], function(k, $) {
                        var U = $(n, s, a);
                        if (typeof U == "string" && !p && !d[U]) return n.dataTypes.unshift(U), g(U), !1;
                        if (p) return !(y = U)
                    }), y
                }
                return g(n.dataTypes[0]) || !d["*"] && g("*")
            }

            function er(e, n) {
                var s, a, d = l.ajaxSettings.flatOptions || {};
                for (s in n) n[s] !== void 0 && ((d[s] ? e : a || (a = {}))[s] = n[s]);
                return a && l.extend(!0, e, a), e
            }

            function Fa(e, n, s) {
                for (var a, d, p, g, _ = e.contents, y = e.dataTypes; y[0] === "*";) y.shift(), a === void 0 && (a = e.mimeType || n.getResponseHeader("Content-Type"));
                if (a) {
                    for (d in _)
                        if (_[d] && _[d].test(a)) {
                            y.unshift(d);
                            break
                        }
                }
                if (y[0] in s) p = y[0];
                else {
                    for (d in s) {
                        if (!y[0] || e.converters[d + " " + y[0]]) {
                            p = d;
                            break
                        }
                        g || (g = d)
                    }
                    p = p || g
                }
                if (p) return p !== y[0] && y.unshift(p), s[p]
            }

            function Va(e, n, s, a) {
                var d, p, g, _, y, k = {},
                    $ = e.dataTypes.slice();
                if ($[1])
                    for (g in e.converters) k[g.toLowerCase()] = e.converters[g];
                for (p = $.shift(); p;)
                    if (e.responseFields[p] && (s[e.responseFields[p]] = n), !y && a && e.dataFilter && (n = e.dataFilter(n, e.dataType)), y = p, p = $.shift(), p) {
                        if (p === "*") p = y;
                        else if (y !== "*" && y !== p) {
                            if (g = k[y + " " + p] || k["* " + p], !g) {
                                for (d in k)
                                    if (_ = d.split(" "), _[1] === p && (g = k[y + " " + _[0]] || k["* " + _[0]], g)) {
                                        g === !0 ? g = k[d] : k[d] !== !0 && (p = _[0], $.unshift(_[1]));
                                        break
                                    }
                            }
                            if (g !== !0)
                                if (g && e.throws) n = g(n);
                                else try {
                                    n = g(n)
                                } catch (U) {
                                    return {
                                        state: "parsererror",
                                        error: g ? U : "No conversion from " + y + " to " + p
                                    }
                                }
                        }
                    } return {
                    state: "success",
                    data: n
                }
            }
            l.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Ki.href,
                    type: "GET",
                    isLocal: Wa.test(Ki.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": vo,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": l.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, n) {
                    return n ? er(er(e, l.ajaxSettings), n) : er(l.ajaxSettings, e)
                },
                ajaxPrefilter: yo(mo),
                ajaxTransport: yo(Jn),
                ajax: function(e, n) {
                    typeof e == "object" && (n = e, e = void 0), n = n || {};
                    var s, a, d, p, g, _, y, k, $, U, L = l.ajaxSetup({}, n),
                        M = L.context || L,
                        ce = L.context && (M.nodeType || M.jquery) ? l(M) : l.event,
                        be = l.Deferred(),
                        le = l.Callbacks("once memory"),
                        ot = L.statusCode || {},
                        nt = {},
                        wt = {},
                        ze = "canceled",
                        ye = {
                            readyState: 0,
                            getResponseHeader: function(Pe) {
                                var Je;
                                if (y) {
                                    if (!p)
                                        for (p = {}; Je = Ra.exec(d);) p[Je[1].toLowerCase() + " "] = (p[Je[1].toLowerCase() + " "] || []).concat(Je[2]);
                                    Je = p[Pe.toLowerCase() + " "]
                                }
                                return Je == null ? null : Je.join(", ")
                            },
                            getAllResponseHeaders: function() {
                                return y ? d : null
                            },
                            setRequestHeader: function(Pe, Je) {
                                return y == null && (Pe = wt[Pe.toLowerCase()] = wt[Pe.toLowerCase()] || Pe, nt[Pe] = Je), this
                            },
                            overrideMimeType: function(Pe) {
                                return y == null && (L.mimeType = Pe), this
                            },
                            statusCode: function(Pe) {
                                var Je;
                                if (Pe)
                                    if (y) ye.always(Pe[ye.status]);
                                    else
                                        for (Je in Pe) ot[Je] = [ot[Je], Pe[Je]];
                                return this
                            },
                            abort: function(Pe) {
                                var Je = Pe || ze;
                                return s && s.abort(Je), vt(0, Je), this
                            }
                        };
                    if (be.promise(ye), L.url = ((e || L.url || Ki.href) + "").replace(za, Ki.protocol + "//"), L.type = n.method || n.type || L.method || L.type, L.dataTypes = (L.dataType || "*").toLowerCase().match(Ie) || [""], L.crossDomain == null) {
                        _ = R.createElement("a");
                        try {
                            _.href = L.url, _.href = _.href, L.crossDomain = Zn.protocol + "//" + Zn.host != _.protocol + "//" + _.host
                        } catch {
                            L.crossDomain = !0
                        }
                    }
                    if (L.data && L.processData && typeof L.data != "string" && (L.data = l.param(L.data, L.traditional)), bo(mo, L, n, ye), y) return ye;
                    k = l.event && L.global, k && l.active++ === 0 && l.event.trigger("ajaxStart"), L.type = L.type.toUpperCase(), L.hasContent = !qa.test(L.type), a = L.url.replace(Ha, ""), L.hasContent ? L.data && L.processData && (L.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (L.data = L.data.replace(Ma, "+")) : (U = L.url.slice(a.length), L.data && (L.processData || typeof L.data == "string") && (a += (Gn.test(a) ? "&" : "?") + L.data, delete L.data), L.cache === !1 && (a = a.replace(ja, "$1"), U = (Gn.test(a) ? "&" : "?") + "_=" + ho.guid++ + U), L.url = a + U), L.ifModified && (l.lastModified[a] && ye.setRequestHeader("If-Modified-Since", l.lastModified[a]), l.etag[a] && ye.setRequestHeader("If-None-Match", l.etag[a])), (L.data && L.hasContent && L.contentType !== !1 || n.contentType) && ye.setRequestHeader("Content-Type", L.contentType), ye.setRequestHeader("Accept", L.dataTypes[0] && L.accepts[L.dataTypes[0]] ? L.accepts[L.dataTypes[0]] + (L.dataTypes[0] !== "*" ? ", " + vo + "; q=0.01" : "") : L.accepts["*"]);
                    for ($ in L.headers) ye.setRequestHeader($, L.headers[$]);
                    if (L.beforeSend && (L.beforeSend.call(M, ye, L) === !1 || y)) return ye.abort();
                    if (ze = "abort", le.add(L.complete), ye.done(L.success), ye.fail(L.error), s = bo(Jn, L, n, ye), !s) vt(-1, "No Transport");
                    else {
                        if (ye.readyState = 1, k && ce.trigger("ajaxSend", [ye, L]), y) return ye;
                        L.async && L.timeout > 0 && (g = i.setTimeout(function() {
                            ye.abort("timeout")
                        }, L.timeout));
                        try {
                            y = !1, s.send(nt, vt)
                        } catch (Pe) {
                            if (y) throw Pe;
                            vt(-1, Pe)
                        }
                    }

                    function vt(Pe, Je, Gi, hn) {
                        var Tt, di, pi, yt, ti, Nt = Je;
                        y || (y = !0, g && i.clearTimeout(g), s = void 0, d = hn || "", ye.readyState = Pe > 0 ? 4 : 0, Tt = Pe >= 200 && Pe < 300 || Pe === 304, Gi && (yt = Fa(L, ye, Gi)), !Tt && l.inArray("script", L.dataTypes) > -1 && l.inArray("json", L.dataTypes) < 0 && (L.converters["text script"] = function() {}), yt = Va(L, yt, ye, Tt), Tt ? (L.ifModified && (ti = ye.getResponseHeader("Last-Modified"), ti && (l.lastModified[a] = ti), ti = ye.getResponseHeader("etag"), ti && (l.etag[a] = ti)), Pe === 204 || L.type === "HEAD" ? Nt = "nocontent" : Pe === 304 ? Nt = "notmodified" : (Nt = yt.state, di = yt.data, pi = yt.error, Tt = !pi)) : (pi = Nt, (Pe || !Nt) && (Nt = "error", Pe < 0 && (Pe = 0))), ye.status = Pe, ye.statusText = (Je || Nt) + "", Tt ? be.resolveWith(M, [di, Nt, ye]) : be.rejectWith(M, [ye, Nt, pi]), ye.statusCode(ot), ot = void 0, k && ce.trigger(Tt ? "ajaxSuccess" : "ajaxError", [ye, L, Tt ? di : pi]), le.fireWith(M, [ye, Nt]), k && (ce.trigger("ajaxComplete", [ye, L]), --l.active || l.event.trigger("ajaxStop")))
                    }
                    return ye
                },
                getJSON: function(e, n, s) {
                    return l.get(e, n, s, "json")
                },
                getScript: function(e, n) {
                    return l.get(e, void 0, n, "script")
                }
            }), l.each(["get", "post"], function(e, n) {
                l[n] = function(s, a, d, p) {
                    return A(a) && (p = p || d, d = a, a = void 0), l.ajax(l.extend({
                        url: s,
                        type: n,
                        dataType: p,
                        data: a,
                        success: d
                    }, l.isPlainObject(s) && s))
                }
            }), l.ajaxPrefilter(function(e) {
                var n;
                for (n in e.headers) n.toLowerCase() === "content-type" && (e.contentType = e.headers[n] || "")
            }), l._evalUrl = function(e, n, s) {
                return l.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(a) {
                        l.globalEval(a, n, s)
                    }
                })
            }, l.fn.extend({
                wrapAll: function(e) {
                    var n;
                    return this[0] && (A(e) && (e = e.call(this[0])), n = l(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && n.insertBefore(this[0]), n.map(function() {
                        for (var s = this; s.firstElementChild;) s = s.firstElementChild;
                        return s
                    }).append(this)), this
                },
                wrapInner: function(e) {
                    return A(e) ? this.each(function(n) {
                        l(this).wrapInner(e.call(this, n))
                    }) : this.each(function() {
                        var n = l(this),
                            s = n.contents();
                        s.length ? s.wrapAll(e) : n.append(e)
                    })
                },
                wrap: function(e) {
                    var n = A(e);
                    return this.each(function(s) {
                        l(this).wrapAll(n ? e.call(this, s) : e)
                    })
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each(function() {
                        l(this).replaceWith(this.childNodes)
                    }), this
                }
            }), l.expr.pseudos.hidden = function(e) {
                return !l.expr.pseudos.visible(e)
            }, l.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
            }, l.ajaxSettings.xhr = function() {
                try {
                    return new i.XMLHttpRequest
                } catch {}
            };
            var Ba = {
                    0: 200,
                    1223: 204
                },
                Xi = l.ajaxSettings.xhr();
            D.cors = !!Xi && "withCredentials" in Xi, D.ajax = Xi = !!Xi, l.ajaxTransport(function(e) {
                var n, s;
                if (D.cors || Xi && !e.crossDomain) return {
                    send: function(a, d) {
                        var p, g = e.xhr();
                        if (g.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                            for (p in e.xhrFields) g[p] = e.xhrFields[p];
                        e.mimeType && g.overrideMimeType && g.overrideMimeType(e.mimeType), !e.crossDomain && !a["X-Requested-With"] && (a["X-Requested-With"] = "XMLHttpRequest");
                        for (p in a) g.setRequestHeader(p, a[p]);
                        n = function(_) {
                            return function() {
                                n && (n = s = g.onload = g.onerror = g.onabort = g.ontimeout = g.onreadystatechange = null, _ === "abort" ? g.abort() : _ === "error" ? typeof g.status != "number" ? d(0, "error") : d(g.status, g.statusText) : d(Ba[g.status] || g.status, g.statusText, (g.responseType || "text") !== "text" || typeof g.responseText != "string" ? {
                                    binary: g.response
                                } : {
                                    text: g.responseText
                                }, g.getAllResponseHeaders()))
                            }
                        }, g.onload = n(), s = g.onerror = g.ontimeout = n("error"), g.onabort !== void 0 ? g.onabort = s : g.onreadystatechange = function() {
                            g.readyState === 4 && i.setTimeout(function() {
                                n && s()
                            })
                        }, n = n("abort");
                        try {
                            g.send(e.hasContent && e.data || null)
                        } catch (_) {
                            if (n) throw _
                        }
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }), l.ajaxPrefilter(function(e) {
                e.crossDomain && (e.contents.script = !1)
            }), l.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return l.globalEval(e), e
                    }
                }
            }), l.ajaxPrefilter("script", function(e) {
                e.cache === void 0 && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), l.ajaxTransport("script", function(e) {
                if (e.crossDomain || e.scriptAttrs) {
                    var n, s;
                    return {
                        send: function(a, d) {
                            n = l("<script>").attr(e.scriptAttrs || {}).prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", s = function(p) {
                                n.remove(), s = null, p && d(p.type === "error" ? 404 : 200, p.type)
                            }), R.head.appendChild(n[0])
                        },
                        abort: function() {
                            s && s()
                        }
                    }
                }
            });
            var _o = [],
                tr = /(=)\?(?=&|$)|\?\?/;
            l.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = _o.pop() || l.expando + "_" + ho.guid++;
                    return this[e] = !0, e
                }
            }), l.ajaxPrefilter("json jsonp", function(e, n, s) {
                var a, d, p, g = e.jsonp !== !1 && (tr.test(e.url) ? "url" : typeof e.data == "string" && (e.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && tr.test(e.data) && "data");
                if (g || e.dataTypes[0] === "jsonp") return a = e.jsonpCallback = A(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, g ? e[g] = e[g].replace(tr, "$1" + a) : e.jsonp !== !1 && (e.url += (Gn.test(e.url) ? "&" : "?") + e.jsonp + "=" + a), e.converters["script json"] = function() {
                    return p || l.error(a + " was not called"), p[0]
                }, e.dataTypes[0] = "json", d = i[a], i[a] = function() {
                    p = arguments
                }, s.always(function() {
                    d === void 0 ? l(i).removeProp(a) : i[a] = d, e[a] && (e.jsonpCallback = n.jsonpCallback, _o.push(a)), p && A(d) && d(p[0]), p = d = void 0
                }), "script"
            }), D.createHTMLDocument = function() {
                var e = R.implementation.createHTMLDocument("").body;
                return e.innerHTML = "<form></form><form></form>", e.childNodes.length === 2
            }(), l.parseHTML = function(e, n, s) {
                if (typeof e != "string") return [];
                typeof n == "boolean" && (s = n, n = !1);
                var a, d, p;
                return n || (D.createHTMLDocument ? (n = R.implementation.createHTMLDocument(""), a = n.createElement("base"), a.href = R.location.href, n.head.appendChild(a)) : n = R), d = ae.exec(e), p = !s && [], d ? [n.createElement(d[1])] : (d = Fe([e], n, p), p && p.length && l(p).remove(), l.merge([], d.childNodes))
            }, l.fn.load = function(e, n, s) {
                var a, d, p, g = this,
                    _ = e.indexOf(" ");
                return _ > -1 && (a = ui(e.slice(_)), e = e.slice(0, _)), A(n) ? (s = n, n = void 0) : n && typeof n == "object" && (d = "POST"), g.length > 0 && l.ajax({
                    url: e,
                    type: d || "GET",
                    dataType: "html",
                    data: n
                }).done(function(y) {
                    p = arguments, g.html(a ? l("<div>").append(l.parseHTML(y)).find(a) : y)
                }).always(s && function(y, k) {
                    g.each(function() {
                        s.apply(this, p || [y.responseText, k, y])
                    })
                }), this
            }, l.expr.pseudos.animated = function(e) {
                return l.grep(l.timers, function(n) {
                    return e === n.elem
                }).length
            }, l.offset = {
                setOffset: function(e, n, s) {
                    var a, d, p, g, _, y, k, $ = l.css(e, "position"),
                        U = l(e),
                        L = {};
                    $ === "static" && (e.style.position = "relative"), _ = U.offset(), p = l.css(e, "top"), y = l.css(e, "left"), k = ($ === "absolute" || $ === "fixed") && (p + y).indexOf("auto") > -1, k ? (a = U.position(), g = a.top, d = a.left) : (g = parseFloat(p) || 0, d = parseFloat(y) || 0), A(n) && (n = n.call(e, s, l.extend({}, _))), n.top != null && (L.top = n.top - _.top + g), n.left != null && (L.left = n.left - _.left + d), "using" in n ? n.using.call(e, L) : U.css(L)
                }
            }, l.fn.extend({
                offset: function(e) {
                    if (arguments.length) return e === void 0 ? this : this.each(function(d) {
                        l.offset.setOffset(this, e, d)
                    });
                    var n, s, a = this[0];
                    if (a) return a.getClientRects().length ? (n = a.getBoundingClientRect(), s = a.ownerDocument.defaultView, {
                        top: n.top + s.pageYOffset,
                        left: n.left + s.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    }
                },
                position: function() {
                    if (this[0]) {
                        var e, n, s, a = this[0],
                            d = {
                                top: 0,
                                left: 0
                            };
                        if (l.css(a, "position") === "fixed") n = a.getBoundingClientRect();
                        else {
                            for (n = this.offset(), s = a.ownerDocument, e = a.offsetParent || s.documentElement; e && (e === s.body || e === s.documentElement) && l.css(e, "position") === "static";) e = e.parentNode;
                            e && e !== a && e.nodeType === 1 && (d = l(e).offset(), d.top += l.css(e, "borderTopWidth", !0), d.left += l.css(e, "borderLeftWidth", !0))
                        }
                        return {
                            top: n.top - d.top - l.css(a, "marginTop", !0),
                            left: n.left - d.left - l.css(a, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && l.css(e, "position") === "static";) e = e.offsetParent;
                        return e || bt
                    })
                }
            }), l.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, n) {
                var s = n === "pageYOffset";
                l.fn[e] = function(a) {
                    return He(this, function(d, p, g) {
                        var _;
                        if (B(d) ? _ = d : d.nodeType === 9 && (_ = d.defaultView), g === void 0) return _ ? _[n] : d[p];
                        _ ? _.scrollTo(s ? _.pageXOffset : g, s ? g : _.pageYOffset) : d[p] = g
                    }, e, a, arguments.length)
                }
            }), l.each(["top", "left"], function(e, n) {
                l.cssHooks[n] = to(D.pixelPosition, function(s, a) {
                    if (a) return a = Ui(s, n), Vn.test(a) ? l(s).position()[n] + "px" : a
                })
            }), l.each({
                Height: "height",
                Width: "width"
            }, function(e, n) {
                l.each({
                    padding: "inner" + e,
                    content: n,
                    "": "outer" + e
                }, function(s, a) {
                    l.fn[a] = function(d, p) {
                        var g = arguments.length && (s || typeof d != "boolean"),
                            _ = s || (d === !0 || p === !0 ? "margin" : "border");
                        return He(this, function(y, k, $) {
                            var U;
                            return B(y) ? a.indexOf("outer") === 0 ? y["inner" + e] : y.document.documentElement["client" + e] : y.nodeType === 9 ? (U = y.documentElement, Math.max(y.body["scroll" + e], U["scroll" + e], y.body["offset" + e], U["offset" + e], U["client" + e])) : $ === void 0 ? l.css(y, k, _) : l.style(y, k, $, _)
                        }, n, g ? d : void 0, g)
                    }
                })
            }), l.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, n) {
                l.fn[n] = function(s) {
                    return this.on(n, s)
                }
            }), l.fn.extend({
                bind: function(e, n, s) {
                    return this.on(e, null, n, s)
                },
                unbind: function(e, n) {
                    return this.off(e, null, n)
                },
                delegate: function(e, n, s, a) {
                    return this.on(n, e, s, a)
                },
                undelegate: function(e, n, s) {
                    return arguments.length === 1 ? this.off(e, "**") : this.off(n, e || "**", s)
                },
                hover: function(e, n) {
                    return this.mouseenter(e).mouseleave(n || e)
                }
            }), l.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
                l.fn[n] = function(s, a) {
                    return arguments.length > 0 ? this.on(n, null, s, a) : this.trigger(n)
                }
            });
            var Ua = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
            l.proxy = function(e, n) {
                var s, a, d;
                if (typeof n == "string" && (s = e[n], n = e, e = s), !!A(e)) return a = r.call(arguments, 2), d = function() {
                    return e.apply(n || this, a.concat(r.call(arguments)))
                }, d.guid = e.guid = e.guid || l.guid++, d
            }, l.holdReady = function(e) {
                e ? l.readyWait++ : l.ready(!0)
            }, l.isArray = Array.isArray, l.parseJSON = JSON.parse, l.nodeName = X, l.isFunction = A, l.isWindow = B, l.camelCase = Te, l.type = se, l.now = Date.now, l.isNumeric = function(e) {
                var n = l.type(e);
                return (n === "number" || n === "string") && !isNaN(e - parseFloat(e))
            }, l.trim = function(e) {
                return e == null ? "" : (e + "").replace(Ua, "$1")
            };
            var Ya = i.jQuery,
                Ka = i.$;
            return l.noConflict = function(e) {
                return i.$ === l && (i.$ = Ka), e && i.jQuery === l && (i.jQuery = Ya), l
            }, typeof o > "u" && (i.jQuery = i.$ = l), l
        })
    }(pp)), In
}(function(c, i) {
    (function(o) {
        c.exports = o(ma())
    })(function(o) {
        var u = window.Slick || {};
        u = function() {
            var t = 0;

            function r(f, h) {
                var m = this,
                    w;
                m.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: o(f),
                    appendDots: o(f),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(S, I) {
                        return o('<button type="button" />').text(I + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, m.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, o.extend(m, m.initials), m.activeBreakpoint = null, m.animType = null, m.animProp = null, m.breakpoints = [], m.breakpointSettings = [], m.cssTransitions = !1, m.focussed = !1, m.interrupted = !1, m.hidden = "hidden", m.paused = !0, m.positionProp = null, m.respondTo = null, m.rowCount = 1, m.shouldClick = !0, m.$slider = o(f), m.$slidesCache = null, m.transformType = null, m.transitionType = null, m.visibilityChange = "visibilitychange", m.windowWidth = 0, m.windowTimer = null, w = o(f).data("slick") || {}, m.options = o.extend({}, m.defaults, h, w), m.currentSlide = m.options.initialSlide, m.originalSettings = m.options, typeof document.mozHidden < "u" ? (m.hidden = "mozHidden", m.visibilityChange = "mozvisibilitychange") : typeof document.webkitHidden < "u" && (m.hidden = "webkitHidden", m.visibilityChange = "webkitvisibilitychange"), m.autoPlay = o.proxy(m.autoPlay, m), m.autoPlayClear = o.proxy(m.autoPlayClear, m), m.autoPlayIterator = o.proxy(m.autoPlayIterator, m), m.changeSlide = o.proxy(m.changeSlide, m), m.clickHandler = o.proxy(m.clickHandler, m), m.selectHandler = o.proxy(m.selectHandler, m), m.setPosition = o.proxy(m.setPosition, m), m.swipeHandler = o.proxy(m.swipeHandler, m), m.dragHandler = o.proxy(m.dragHandler, m), m.keyHandler = o.proxy(m.keyHandler, m), m.instanceUid = t++, m.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, m.registerBreakpoints(), m.init(!0)
            }
            return r
        }(), u.prototype.activateADA = function() {
            var t = this;
            t.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, u.prototype.addSlide = u.prototype.slickAdd = function(t, r, f) {
            var h = this;
            if (typeof r == "boolean") f = r, r = null;
            else if (r < 0 || r >= h.slideCount) return !1;
            h.unload(), typeof r == "number" ? r === 0 && h.$slides.length === 0 ? o(t).appendTo(h.$slideTrack) : f ? o(t).insertBefore(h.$slides.eq(r)) : o(t).insertAfter(h.$slides.eq(r)) : f === !0 ? o(t).prependTo(h.$slideTrack) : o(t).appendTo(h.$slideTrack), h.$slides = h.$slideTrack.children(this.options.slide), h.$slideTrack.children(this.options.slide).detach(), h.$slideTrack.append(h.$slides), h.$slides.each(function(m, w) {
                o(w).attr("data-slick-index", m)
            }), h.$slidesCache = h.$slides, h.reinit()
        }, u.prototype.animateHeight = function() {
            var t = this;
            if (t.options.slidesToShow === 1 && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var r = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: r
                }, t.options.speed)
            }
        }, u.prototype.animateSlide = function(t, r) {
            var f = {},
                h = this;
            h.animateHeight(), h.options.rtl === !0 && h.options.vertical === !1 && (t = -t), h.transformsEnabled === !1 ? h.options.vertical === !1 ? h.$slideTrack.animate({
                left: t
            }, h.options.speed, h.options.easing, r) : h.$slideTrack.animate({
                top: t
            }, h.options.speed, h.options.easing, r) : h.cssTransitions === !1 ? (h.options.rtl === !0 && (h.currentLeft = -h.currentLeft), o({
                animStart: h.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: h.options.speed,
                easing: h.options.easing,
                step: function(m) {
                    m = Math.ceil(m), h.options.vertical === !1 ? (f[h.animType] = "translate(" + m + "px, 0px)", h.$slideTrack.css(f)) : (f[h.animType] = "translate(0px," + m + "px)", h.$slideTrack.css(f))
                },
                complete: function() {
                    r && r.call()
                }
            })) : (h.applyTransition(), t = Math.ceil(t), h.options.vertical === !1 ? f[h.animType] = "translate3d(" + t + "px, 0px, 0px)" : f[h.animType] = "translate3d(0px," + t + "px, 0px)", h.$slideTrack.css(f), r && setTimeout(function() {
                h.disableTransition(), r.call()
            }, h.options.speed))
        }, u.prototype.getNavTarget = function() {
            var t = this,
                r = t.options.asNavFor;
            return r && r !== null && (r = o(r).not(t.$slider)), r
        }, u.prototype.asNavFor = function(t) {
            var r = this,
                f = r.getNavTarget();
            f !== null && typeof f == "object" && f.each(function() {
                var h = o(this).slick("getSlick");
                h.unslicked || h.slideHandler(t, !0)
            })
        }, u.prototype.applyTransition = function(t) {
            var r = this,
                f = {};
            r.options.fade === !1 ? f[r.transitionType] = r.transformType + " " + r.options.speed + "ms " + r.options.cssEase : f[r.transitionType] = "opacity " + r.options.speed + "ms " + r.options.cssEase, r.options.fade === !1 ? r.$slideTrack.css(f) : r.$slides.eq(t).css(f)
        }, u.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, u.prototype.autoPlayClear = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer)
        }, u.prototype.autoPlayIterator = function() {
            var t = this,
                r = t.currentSlide + t.options.slidesToScroll;
            !t.paused && !t.interrupted && !t.focussed && (t.options.infinite === !1 && (t.direction === 1 && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : t.direction === 0 && (r = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 === 0 && (t.direction = 1))), t.slideHandler(r))
        }, u.prototype.buildArrows = function() {
            var t = this;
            t.options.arrows === !0 && (t.$prevArrow = o(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = o(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, u.prototype.buildDots = function() {
            var t = this,
                r, f;
            if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
                for (t.$slider.addClass("slick-dotted"), f = o("<ul />").addClass(t.options.dotsClass), r = 0; r <= t.getDotCount(); r += 1) f.append(o("<li />").append(t.options.customPaging.call(this, t, r)));
                t.$dots = f.appendTo(t.options.appendDots), t.$dots.find("li").first().addClass("slick-active")
            }
        }, u.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(r, f) {
                o(f).attr("data-slick-index", r).data("originalStyling", o(f).attr("style") || "")
            }), t.$slider.addClass("slick-slider"), t.$slideTrack = t.slideCount === 0 ? o('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1), o("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
        }, u.prototype.buildRows = function() {
            var t = this,
                r, f, h, m, w, S, I;
            if (m = document.createDocumentFragment(), S = t.$slider.children(), t.options.rows > 0) {
                for (I = t.options.slidesPerRow * t.options.rows, w = Math.ceil(S.length / I), r = 0; r < w; r++) {
                    var N = document.createElement("div");
                    for (f = 0; f < t.options.rows; f++) {
                        var K = document.createElement("div");
                        for (h = 0; h < t.options.slidesPerRow; h++) {
                            var D = r * I + (f * t.options.slidesPerRow + h);
                            S.get(D) && K.appendChild(S.get(D))
                        }
                        N.appendChild(K)
                    }
                    m.appendChild(N)
                }
                t.$slider.empty().append(m), t.$slider.children().children().children().css({
                    width: 100 / t.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, u.prototype.checkResponsive = function(t, r) {
            var f = this,
                h, m, w, S = !1,
                I = f.$slider.width(),
                N = window.innerWidth || o(window).width();
            if (f.respondTo === "window" ? w = N : f.respondTo === "slider" ? w = I : f.respondTo === "min" && (w = Math.min(N, I)), f.options.responsive && f.options.responsive.length && f.options.responsive !== null) {
                m = null;
                for (h in f.breakpoints) f.breakpoints.hasOwnProperty(h) && (f.originalSettings.mobileFirst === !1 ? w < f.breakpoints[h] && (m = f.breakpoints[h]) : w > f.breakpoints[h] && (m = f.breakpoints[h]));
                m !== null ? f.activeBreakpoint !== null ? (m !== f.activeBreakpoint || r) && (f.activeBreakpoint = m, f.breakpointSettings[m] === "unslick" ? f.unslick(m) : (f.options = o.extend({}, f.originalSettings, f.breakpointSettings[m]), t === !0 && (f.currentSlide = f.options.initialSlide), f.refresh(t)), S = m) : (f.activeBreakpoint = m, f.breakpointSettings[m] === "unslick" ? f.unslick(m) : (f.options = o.extend({}, f.originalSettings, f.breakpointSettings[m]), t === !0 && (f.currentSlide = f.options.initialSlide), f.refresh(t)), S = m) : f.activeBreakpoint !== null && (f.activeBreakpoint = null, f.options = f.originalSettings, t === !0 && (f.currentSlide = f.options.initialSlide), f.refresh(t), S = m), !t && S !== !1 && f.$slider.trigger("breakpoint", [f, S])
            }
        }, u.prototype.changeSlide = function(t, r) {
            var f = this,
                h = o(t.currentTarget),
                m, w, S;
            switch (h.is("a") && t.preventDefault(), h.is("li") || (h = h.closest("li")), S = f.slideCount % f.options.slidesToScroll !== 0, m = S ? 0 : (f.slideCount - f.currentSlide) % f.options.slidesToScroll, t.data.message) {
                case "previous":
                    w = m === 0 ? f.options.slidesToScroll : f.options.slidesToShow - m, f.slideCount > f.options.slidesToShow && f.slideHandler(f.currentSlide - w, !1, r);
                    break;
                case "next":
                    w = m === 0 ? f.options.slidesToScroll : m, f.slideCount > f.options.slidesToShow && f.slideHandler(f.currentSlide + w, !1, r);
                    break;
                case "index":
                    var I = t.data.index === 0 ? 0 : t.data.index || h.index() * f.options.slidesToScroll;
                    f.slideHandler(f.checkNavigable(I), !1, r), h.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, u.prototype.checkNavigable = function(t) {
            var r = this,
                f, h;
            if (f = r.getNavigableIndexes(), h = 0, t > f[f.length - 1]) t = f[f.length - 1];
            else
                for (var m in f) {
                    if (t < f[m]) {
                        t = h;
                        break
                    }
                    h = f[m]
                }
            return t
        }, u.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && t.$dots !== null && (o("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", o.proxy(t.interrupt, t, !0)).off("mouseleave.slick", o.proxy(t.interrupt, t, !1)), t.options.accessibility === !0 && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), t.options.accessibility === !0 && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), o(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && o(t.$slideTrack).children().off("click.slick", t.selectHandler), o(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), o(window).off("resize.slick.slick-" + t.instanceUid, t.resize), o("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), o(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
        }, u.prototype.cleanUpSlideEvents = function() {
            var t = this;
            t.$list.off("mouseenter.slick", o.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", o.proxy(t.interrupt, t, !1))
        }, u.prototype.cleanUpRows = function() {
            var t = this,
                r;
            t.options.rows > 0 && (r = t.$slides.children().children(), r.removeAttr("style"), t.$slider.empty().append(r))
        }, u.prototype.clickHandler = function(t) {
            var r = this;
            r.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, u.prototype.destroy = function(t) {
            var r = this;
            r.autoPlayClear(), r.touchObject = {}, r.cleanUpEvents(), o(".slick-cloned", r.$slider).detach(), r.$dots && r.$dots.remove(), r.$prevArrow && r.$prevArrow.length && (r.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), r.htmlExpr.test(r.options.prevArrow) && r.$prevArrow.remove()), r.$nextArrow && r.$nextArrow.length && (r.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), r.htmlExpr.test(r.options.nextArrow) && r.$nextArrow.remove()), r.$slides && (r.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                o(this).attr("style", o(this).data("originalStyling"))
            }), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.detach(), r.$list.detach(), r.$slider.append(r.$slides)), r.cleanUpRows(), r.$slider.removeClass("slick-slider"), r.$slider.removeClass("slick-initialized"), r.$slider.removeClass("slick-dotted"), r.unslicked = !0, t || r.$slider.trigger("destroy", [r])
        }, u.prototype.disableTransition = function(t) {
            var r = this,
                f = {};
            f[r.transitionType] = "", r.options.fade === !1 ? r.$slideTrack.css(f) : r.$slides.eq(t).css(f)
        }, u.prototype.fadeSlide = function(t, r) {
            var f = this;
            f.cssTransitions === !1 ? (f.$slides.eq(t).css({
                zIndex: f.options.zIndex
            }), f.$slides.eq(t).animate({
                opacity: 1
            }, f.options.speed, f.options.easing, r)) : (f.applyTransition(t), f.$slides.eq(t).css({
                opacity: 1,
                zIndex: f.options.zIndex
            }), r && setTimeout(function() {
                f.disableTransition(t), r.call()
            }, f.options.speed))
        }, u.prototype.fadeSlideOut = function(t) {
            var r = this;
            r.cssTransitions === !1 ? r.$slides.eq(t).animate({
                opacity: 0,
                zIndex: r.options.zIndex - 2
            }, r.options.speed, r.options.easing) : (r.applyTransition(t), r.$slides.eq(t).css({
                opacity: 0,
                zIndex: r.options.zIndex - 2
            }))
        }, u.prototype.filterSlides = u.prototype.slickFilter = function(t) {
            var r = this;
            t !== null && (r.$slidesCache = r.$slides, r.unload(), r.$slideTrack.children(this.options.slide).detach(), r.$slidesCache.filter(t).appendTo(r.$slideTrack), r.reinit())
        }, u.prototype.focusHandler = function() {
            var t = this;
            t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(r) {
                r.stopImmediatePropagation();
                var f = o(this);
                setTimeout(function() {
                    t.options.pauseOnFocus && (t.focussed = f.is(":focus"), t.autoPlay())
                }, 0)
            })
        }, u.prototype.getCurrent = u.prototype.slickCurrentSlide = function() {
            var t = this;
            return t.currentSlide
        }, u.prototype.getDotCount = function() {
            var t = this,
                r = 0,
                f = 0,
                h = 0;
            if (t.options.infinite === !0)
                if (t.slideCount <= t.options.slidesToShow) ++h;
                else
                    for (; r < t.slideCount;) ++h, r = f + t.options.slidesToScroll, f += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (t.options.centerMode === !0) h = t.slideCount;
            else if (!t.options.asNavFor) h = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
            else
                for (; r < t.slideCount;) ++h, r = f + t.options.slidesToScroll, f += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return h - 1
        }, u.prototype.getLeft = function(t) {
            var r = this,
                f, h, m = 0,
                w, S;
            return r.slideOffset = 0, h = r.$slides.first().outerHeight(!0), r.options.infinite === !0 ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, S = -1, r.options.vertical === !0 && r.options.centerMode === !0 && (r.options.slidesToShow === 2 ? S = -1.5 : r.options.slidesToShow === 1 && (S = -2)), m = h * r.options.slidesToShow * S), r.slideCount % r.options.slidesToScroll !== 0 && t + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (t > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (t - r.slideCount)) * r.slideWidth * -1, m = (r.options.slidesToShow - (t - r.slideCount)) * h * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, m = r.slideCount % r.options.slidesToScroll * h * -1))) : t + r.options.slidesToShow > r.slideCount && (r.slideOffset = (t + r.options.slidesToShow - r.slideCount) * r.slideWidth, m = (t + r.options.slidesToShow - r.slideCount) * h), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, m = 0), r.options.centerMode === !0 && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : r.options.centerMode === !0 && r.options.infinite === !0 ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : r.options.centerMode === !0 && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), r.options.vertical === !1 ? f = t * r.slideWidth * -1 + r.slideOffset : f = t * h * -1 + m, r.options.variableWidth === !0 && (r.slideCount <= r.options.slidesToShow || r.options.infinite === !1 ? w = r.$slideTrack.children(".slick-slide").eq(t) : w = r.$slideTrack.children(".slick-slide").eq(t + r.options.slidesToShow), r.options.rtl === !0 ? w[0] ? f = (r.$slideTrack.width() - w[0].offsetLeft - w.width()) * -1 : f = 0 : f = w[0] ? w[0].offsetLeft * -1 : 0, r.options.centerMode === !0 && (r.slideCount <= r.options.slidesToShow || r.options.infinite === !1 ? w = r.$slideTrack.children(".slick-slide").eq(t) : w = r.$slideTrack.children(".slick-slide").eq(t + r.options.slidesToShow + 1), r.options.rtl === !0 ? w[0] ? f = (r.$slideTrack.width() - w[0].offsetLeft - w.width()) * -1 : f = 0 : f = w[0] ? w[0].offsetLeft * -1 : 0, f += (r.$list.width() - w.outerWidth()) / 2)), f
        }, u.prototype.getOption = u.prototype.slickGetOption = function(t) {
            var r = this;
            return r.options[t]
        }, u.prototype.getNavigableIndexes = function() {
            var t = this,
                r = 0,
                f = 0,
                h = [],
                m;
            for (t.options.infinite === !1 ? m = t.slideCount : (r = t.options.slidesToScroll * -1, f = t.options.slidesToScroll * -1, m = t.slideCount * 2); r < m;) h.push(r), r = f + t.options.slidesToScroll, f += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return h
        }, u.prototype.getSlick = function() {
            return this
        }, u.prototype.getSlideCount = function() {
            var t = this,
                r, f, h;
            return h = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0, t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function(m, w) {
                if (w.offsetLeft - h + o(w).outerWidth() / 2 > t.swipeLeft * -1) return f = w, !1
            }), r = Math.abs(o(f).attr("data-slick-index") - t.currentSlide) || 1, r) : t.options.slidesToScroll
        }, u.prototype.goTo = u.prototype.slickGoTo = function(t, r) {
            var f = this;
            f.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, r)
        }, u.prototype.init = function(t) {
            var r = this;
            o(r.$slider).hasClass("slick-initialized") || (o(r.$slider).addClass("slick-initialized"), r.buildRows(), r.buildOut(), r.setProps(), r.startLoad(), r.loadSlider(), r.initializeEvents(), r.updateArrows(), r.updateDots(), r.checkResponsive(!0), r.focusHandler()), t && r.$slider.trigger("init", [r]), r.options.accessibility === !0 && r.initADA(), r.options.autoplay && (r.paused = !1, r.autoPlay())
        }, u.prototype.initADA = function() {
            var t = this,
                r = Math.ceil(t.slideCount / t.options.slidesToShow),
                f = t.getNavigableIndexes().filter(function(w) {
                    return w >= 0 && w < t.slideCount
                });
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), t.$dots !== null && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(w) {
                var S = f.indexOf(w);
                if (o(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + t.instanceUid + w,
                        tabindex: -1
                    }), S !== -1) {
                    var I = "slick-slide-control" + t.instanceUid + S;
                    o("#" + I).length && o(this).attr({
                        "aria-describedby": I
                    })
                }
            }), t.$dots.attr("role", "tablist").find("li").each(function(w) {
                var S = f[w];
                o(this).attr({
                    role: "presentation"
                }), o(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + t.instanceUid + w,
                    "aria-controls": "slick-slide" + t.instanceUid + S,
                    "aria-label": w + 1 + " of " + r,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(t.currentSlide).find("button").attr({
                "aria-selected": "true",
                tabindex: "0"
            }).end());
            for (var h = t.currentSlide, m = h + t.options.slidesToShow; h < m; h++) t.options.focusOnChange ? t.$slides.eq(h).attr({
                tabindex: "0"
            }) : t.$slides.eq(h).removeAttr("tabindex");
            t.activateADA()
        }, u.prototype.initArrowEvents = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, t.changeSlide), t.options.accessibility === !0 && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
        }, u.prototype.initDotEvents = function() {
            var t = this;
            t.options.dots === !0 && t.slideCount > t.options.slidesToShow && (o("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide), t.options.accessibility === !0 && t.$dots.on("keydown.slick", t.keyHandler)), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.slideCount > t.options.slidesToShow && o("li", t.$dots).on("mouseenter.slick", o.proxy(t.interrupt, t, !0)).on("mouseleave.slick", o.proxy(t.interrupt, t, !1))
        }, u.prototype.initSlideEvents = function() {
            var t = this;
            t.options.pauseOnHover && (t.$list.on("mouseenter.slick", o.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", o.proxy(t.interrupt, t, !1)))
        }, u.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), o(document).on(t.visibilityChange, o.proxy(t.visibility, t)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && o(t.$slideTrack).children().on("click.slick", t.selectHandler), o(window).on("orientationchange.slick.slick-" + t.instanceUid, o.proxy(t.orientationChange, t)), o(window).on("resize.slick.slick-" + t.instanceUid, o.proxy(t.resize, t)), o("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), o(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), o(t.setPosition)
        }, u.prototype.initUI = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show()
        }, u.prototype.keyHandler = function(t) {
            var r = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (t.keyCode === 37 && r.options.accessibility === !0 ? r.changeSlide({
                data: {
                    message: r.options.rtl === !0 ? "next" : "previous"
                }
            }) : t.keyCode === 39 && r.options.accessibility === !0 && r.changeSlide({
                data: {
                    message: r.options.rtl === !0 ? "previous" : "next"
                }
            }))
        }, u.prototype.lazyLoad = function() {
            var t = this,
                r, f, h, m;

            function w(D) {
                o("img[data-lazy]", D).each(function() {
                    var A = o(this),
                        B = o(this).attr("data-lazy"),
                        R = o(this).attr("data-srcset"),
                        re = o(this).attr("data-sizes") || t.$slider.attr("data-sizes"),
                        ue = document.createElement("img");
                    ue.onload = function() {
                        A.animate({
                            opacity: 0
                        }, 100, function() {
                            R && (A.attr("srcset", R), re && A.attr("sizes", re)), A.attr("src", B).animate({
                                opacity: 1
                            }, 200, function() {
                                A.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                            }), t.$slider.trigger("lazyLoaded", [t, A, B])
                        })
                    }, ue.onerror = function() {
                        A.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), t.$slider.trigger("lazyLoadError", [t, A, B])
                    }, ue.src = B
                })
            }
            if (t.options.centerMode === !0 ? t.options.infinite === !0 ? (h = t.currentSlide + (t.options.slidesToShow / 2 + 1), m = h + t.options.slidesToShow + 2) : (h = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), m = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (h = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, m = Math.ceil(h + t.options.slidesToShow), t.options.fade === !0 && (h > 0 && h--, m <= t.slideCount && m++)), r = t.$slider.find(".slick-slide").slice(h, m), t.options.lazyLoad === "anticipated")
                for (var S = h - 1, I = m, N = t.$slider.find(".slick-slide"), K = 0; K < t.options.slidesToScroll; K++) S < 0 && (S = t.slideCount - 1), r = r.add(N.eq(S)), r = r.add(N.eq(I)), S--, I++;
            w(r), t.slideCount <= t.options.slidesToShow ? (f = t.$slider.find(".slick-slide"), w(f)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (f = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), w(f)) : t.currentSlide === 0 && (f = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), w(f))
        }, u.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), t.options.lazyLoad === "progressive" && t.progressiveLazyLoad()
        }, u.prototype.next = u.prototype.slickNext = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, u.prototype.orientationChange = function() {
            var t = this;
            t.checkResponsive(), t.setPosition()
        }, u.prototype.pause = u.prototype.slickPause = function() {
            var t = this;
            t.autoPlayClear(), t.paused = !0
        }, u.prototype.play = u.prototype.slickPlay = function() {
            var t = this;
            t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
        }, u.prototype.postSlide = function(t) {
            var r = this;
            if (!r.unslicked && (r.$slider.trigger("afterChange", [r, t]), r.animating = !1, r.slideCount > r.options.slidesToShow && r.setPosition(), r.swipeLeft = null, r.options.autoplay && r.autoPlay(), r.options.accessibility === !0 && (r.initADA(), r.options.focusOnChange))) {
                var f = o(r.$slides.get(r.currentSlide));
                f.attr("tabindex", 0).focus()
            }
        }, u.prototype.prev = u.prototype.slickPrev = function() {
            var t = this;
            t.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, u.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, u.prototype.progressiveLazyLoad = function(t) {
            t = t || 1;
            var r = this,
                f = o("img[data-lazy]", r.$slider),
                h, m, w, S, I;
            f.length ? (h = f.first(), m = h.attr("data-lazy"), w = h.attr("data-srcset"), S = h.attr("data-sizes") || r.$slider.attr("data-sizes"), I = document.createElement("img"), I.onload = function() {
                w && (h.attr("srcset", w), S && h.attr("sizes", S)), h.attr("src", m).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), r.options.adaptiveHeight === !0 && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, h, m]), r.progressiveLazyLoad()
            }, I.onerror = function() {
                t < 3 ? setTimeout(function() {
                    r.progressiveLazyLoad(t + 1)
                }, 500) : (h.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, h, m]), r.progressiveLazyLoad())
            }, I.src = m) : r.$slider.trigger("allImagesLoaded", [r])
        }, u.prototype.refresh = function(t) {
            var r = this,
                f, h;
            h = r.slideCount - r.options.slidesToShow, !r.options.infinite && r.currentSlide > h && (r.currentSlide = h), r.slideCount <= r.options.slidesToShow && (r.currentSlide = 0), f = r.currentSlide, r.destroy(!0), o.extend(r, r.initials, {
                currentSlide: f
            }), r.init(), t || r.changeSlide({
                data: {
                    message: "index",
                    index: f
                }
            }, !1)
        }, u.prototype.registerBreakpoints = function() {
            var t = this,
                r, f, h, m = t.options.responsive || null;
            if (o.type(m) === "array" && m.length) {
                t.respondTo = t.options.respondTo || "window";
                for (r in m)
                    if (h = t.breakpoints.length - 1, m.hasOwnProperty(r)) {
                        for (f = m[r].breakpoint; h >= 0;) t.breakpoints[h] && t.breakpoints[h] === f && t.breakpoints.splice(h, 1), h--;
                        t.breakpoints.push(f), t.breakpointSettings[f] = m[r].settings
                    } t.breakpoints.sort(function(w, S) {
                    return t.options.mobileFirst ? w - S : S - w
                })
            }
        }, u.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && t.currentSlide !== 0 && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 && o(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
        }, u.prototype.resize = function() {
            var t = this;
            o(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = o(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
            }, 50))
        }, u.prototype.removeSlide = u.prototype.slickRemove = function(t, r, f) {
            var h = this;
            if (typeof t == "boolean" ? (r = t, t = r === !0 ? 0 : h.slideCount - 1) : t = r === !0 ? --t : t, h.slideCount < 1 || t < 0 || t > h.slideCount - 1) return !1;
            h.unload(), f === !0 ? h.$slideTrack.children().remove() : h.$slideTrack.children(this.options.slide).eq(t).remove(), h.$slides = h.$slideTrack.children(this.options.slide), h.$slideTrack.children(this.options.slide).detach(), h.$slideTrack.append(h.$slides), h.$slidesCache = h.$slides, h.reinit()
        }, u.prototype.setCSS = function(t) {
            var r = this,
                f = {},
                h, m;
            r.options.rtl === !0 && (t = -t), h = r.positionProp == "left" ? Math.ceil(t) + "px" : "0px", m = r.positionProp == "top" ? Math.ceil(t) + "px" : "0px", f[r.positionProp] = t, r.transformsEnabled === !1 ? r.$slideTrack.css(f) : (f = {}, r.cssTransitions === !1 ? (f[r.animType] = "translate(" + h + ", " + m + ")", r.$slideTrack.css(f)) : (f[r.animType] = "translate3d(" + h + ", " + m + ", 0px)", r.$slideTrack.css(f)))
        }, u.prototype.setDimensions = function() {
            var t = this;
            t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var r = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - r)
        }, u.prototype.setFade = function() {
            var t = this,
                r;
            t.$slides.each(function(f, h) {
                r = t.slideWidth * f * -1, t.options.rtl === !0 ? o(h).css({
                    position: "relative",
                    right: r,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0
                }) : o(h).css({
                    position: "relative",
                    left: r,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0
                })
            }), t.$slides.eq(t.currentSlide).css({
                zIndex: t.options.zIndex - 1,
                opacity: 1
            })
        }, u.prototype.setHeight = function() {
            var t = this;
            if (t.options.slidesToShow === 1 && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
                var r = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", r)
            }
        }, u.prototype.setOption = u.prototype.slickSetOption = function() {
            var t = this,
                r, f, h, m, w = !1,
                S;
            if (o.type(arguments[0]) === "object" ? (h = arguments[0], w = arguments[1], S = "multiple") : o.type(arguments[0]) === "string" && (h = arguments[0], m = arguments[1], w = arguments[2], arguments[0] === "responsive" && o.type(arguments[1]) === "array" ? S = "responsive" : typeof arguments[1] < "u" && (S = "single")), S === "single") t.options[h] = m;
            else if (S === "multiple") o.each(h, function(I, N) {
                t.options[I] = N
            });
            else if (S === "responsive")
                for (f in m)
                    if (o.type(t.options.responsive) !== "array") t.options.responsive = [m[f]];
                    else {
                        for (r = t.options.responsive.length - 1; r >= 0;) t.options.responsive[r].breakpoint === m[f].breakpoint && t.options.responsive.splice(r, 1), r--;
                        t.options.responsive.push(m[f])
                    } w && (t.unload(), t.reinit())
        }, u.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, u.prototype.setProps = function() {
            var t = this,
                r = document.body.style;
            t.positionProp = t.options.vertical === !0 ? "top" : "left", t.positionProp === "top" ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (r.WebkitTransition !== void 0 || r.MozTransition !== void 0 || r.msTransition !== void 0) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && (typeof t.options.zIndex == "number" ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), r.OTransform !== void 0 && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", r.perspectiveProperty === void 0 && r.webkitPerspective === void 0 && (t.animType = !1)), r.MozTransform !== void 0 && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", r.perspectiveProperty === void 0 && r.MozPerspective === void 0 && (t.animType = !1)), r.webkitTransform !== void 0 && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", r.perspectiveProperty === void 0 && r.webkitPerspective === void 0 && (t.animType = !1)), r.msTransform !== void 0 && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", r.msTransform === void 0 && (t.animType = !1)), r.transform !== void 0 && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && t.animType !== null && t.animType !== !1
        }, u.prototype.setSlideClasses = function(t) {
            var r = this,
                f, h, m, w;
            if (h = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(t).addClass("slick-current"), r.options.centerMode === !0) {
                var S = r.options.slidesToShow % 2 === 0 ? 1 : 0;
                f = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (t >= f && t <= r.slideCount - 1 - f ? r.$slides.slice(t - f + S, t + f + 1).addClass("slick-active").attr("aria-hidden", "false") : (m = r.options.slidesToShow + t, h.slice(m - f + 1 + S, m + f + 2).addClass("slick-active").attr("aria-hidden", "false")), t === 0 ? h.eq(h.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && h.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(t).addClass("slick-center")
            } else t >= 0 && t <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(t, t + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : h.length <= r.options.slidesToShow ? h.addClass("slick-active").attr("aria-hidden", "false") : (w = r.slideCount % r.options.slidesToShow, m = r.options.infinite === !0 ? r.options.slidesToShow + t : t, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow ? h.slice(m - (r.options.slidesToShow - w), m + w).addClass("slick-active").attr("aria-hidden", "false") : h.slice(m, m + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            (r.options.lazyLoad === "ondemand" || r.options.lazyLoad === "anticipated") && r.lazyLoad()
        }, u.prototype.setupInfinite = function() {
            var t = this,
                r, f, h;
            if (t.options.fade === !0 && (t.options.centerMode = !1), t.options.infinite === !0 && t.options.fade === !1 && (f = null, t.slideCount > t.options.slidesToShow)) {
                for (t.options.centerMode === !0 ? h = t.options.slidesToShow + 1 : h = t.options.slidesToShow, r = t.slideCount; r > t.slideCount - h; r -= 1) f = r - 1, o(t.$slides[f]).clone(!0).attr("id", "").attr("data-slick-index", f - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
                for (r = 0; r < h + t.slideCount; r += 1) f = r, o(t.$slides[f]).clone(!0).attr("id", "").attr("data-slick-index", f + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
                t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    o(this).attr("id", "")
                })
            }
        }, u.prototype.interrupt = function(t) {
            var r = this;
            t || r.autoPlay(), r.interrupted = t
        }, u.prototype.selectHandler = function(t) {
            var r = this,
                f = o(t.target).is(".slick-slide") ? o(t.target) : o(t.target).parents(".slick-slide"),
                h = parseInt(f.attr("data-slick-index"));
            if (h || (h = 0), r.slideCount <= r.options.slidesToShow) {
                r.slideHandler(h, !1, !0);
                return
            }
            r.slideHandler(h)
        }, u.prototype.slideHandler = function(t, r, f) {
            var h, m, w, S, I = null,
                N = this,
                K;
            if (r = r || !1, !(N.animating === !0 && N.options.waitForAnimate === !0) && !(N.options.fade === !0 && N.currentSlide === t)) {
                if (r === !1 && N.asNavFor(t), h = t, I = N.getLeft(h), S = N.getLeft(N.currentSlide), N.currentLeft = N.swipeLeft === null ? S : N.swipeLeft, N.options.infinite === !1 && N.options.centerMode === !1 && (t < 0 || t > N.getDotCount() * N.options.slidesToScroll)) {
                    N.options.fade === !1 && (h = N.currentSlide, f !== !0 && N.slideCount > N.options.slidesToShow ? N.animateSlide(S, function() {
                        N.postSlide(h)
                    }) : N.postSlide(h));
                    return
                } else if (N.options.infinite === !1 && N.options.centerMode === !0 && (t < 0 || t > N.slideCount - N.options.slidesToScroll)) {
                    N.options.fade === !1 && (h = N.currentSlide, f !== !0 && N.slideCount > N.options.slidesToShow ? N.animateSlide(S, function() {
                        N.postSlide(h)
                    }) : N.postSlide(h));
                    return
                }
                if (N.options.autoplay && clearInterval(N.autoPlayTimer), h < 0 ? N.slideCount % N.options.slidesToScroll !== 0 ? m = N.slideCount - N.slideCount % N.options.slidesToScroll : m = N.slideCount + h : h >= N.slideCount ? N.slideCount % N.options.slidesToScroll !== 0 ? m = 0 : m = h - N.slideCount : m = h, N.animating = !0, N.$slider.trigger("beforeChange", [N, N.currentSlide, m]), w = N.currentSlide, N.currentSlide = m, N.setSlideClasses(N.currentSlide), N.options.asNavFor && (K = N.getNavTarget(), K = K.slick("getSlick"), K.slideCount <= K.options.slidesToShow && K.setSlideClasses(N.currentSlide)), N.updateDots(), N.updateArrows(), N.options.fade === !0) {
                    f !== !0 ? (N.fadeSlideOut(w), N.fadeSlide(m, function() {
                        N.postSlide(m)
                    })) : N.postSlide(m), N.animateHeight();
                    return
                }
                f !== !0 && N.slideCount > N.options.slidesToShow ? N.animateSlide(I, function() {
                    N.postSlide(m)
                }) : N.postSlide(m)
            }
        }, u.prototype.startLoad = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, u.prototype.swipeDirection = function() {
            var t, r, f, h, m = this;
            return t = m.touchObject.startX - m.touchObject.curX, r = m.touchObject.startY - m.touchObject.curY, f = Math.atan2(r, t), h = Math.round(f * 180 / Math.PI), h < 0 && (h = 360 - Math.abs(h)), h <= 45 && h >= 0 || h <= 360 && h >= 315 ? m.options.rtl === !1 ? "left" : "right" : h >= 135 && h <= 225 ? m.options.rtl === !1 ? "right" : "left" : m.options.verticalSwiping === !0 ? h >= 35 && h <= 135 ? "down" : "up" : "vertical"
        }, u.prototype.swipeEnd = function(t) {
            var r = this,
                f, h;
            if (r.dragging = !1, r.swiping = !1, r.scrolling) return r.scrolling = !1, !1;
            if (r.interrupted = !1, r.shouldClick = !(r.touchObject.swipeLength > 10), r.touchObject.curX === void 0) return !1;
            if (r.touchObject.edgeHit === !0 && r.$slider.trigger("edge", [r, r.swipeDirection()]), r.touchObject.swipeLength >= r.touchObject.minSwipe) {
                switch (h = r.swipeDirection(), h) {
                    case "left":
                    case "down":
                        f = r.options.swipeToSlide ? r.checkNavigable(r.currentSlide + r.getSlideCount()) : r.currentSlide + r.getSlideCount(), r.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        f = r.options.swipeToSlide ? r.checkNavigable(r.currentSlide - r.getSlideCount()) : r.currentSlide - r.getSlideCount(), r.currentDirection = 1;
                        break
                }
                h != "vertical" && (r.slideHandler(f), r.touchObject = {}, r.$slider.trigger("swipe", [r, h]))
            } else r.touchObject.startX !== r.touchObject.curX && (r.slideHandler(r.currentSlide), r.touchObject = {})
        }, u.prototype.swipeHandler = function(t) {
            var r = this;
            if (!(r.options.swipe === !1 || "ontouchend" in document && r.options.swipe === !1) && !(r.options.draggable === !1 && t.type.indexOf("mouse") !== -1)) switch (r.touchObject.fingerCount = t.originalEvent && t.originalEvent.touches !== void 0 ? t.originalEvent.touches.length : 1, r.touchObject.minSwipe = r.listWidth / r.options.touchThreshold, r.options.verticalSwiping === !0 && (r.touchObject.minSwipe = r.listHeight / r.options.touchThreshold), t.data.action) {
                case "start":
                    r.swipeStart(t);
                    break;
                case "move":
                    r.swipeMove(t);
                    break;
                case "end":
                    r.swipeEnd(t);
                    break
            }
        }, u.prototype.swipeMove = function(t) {
            var r = this,
                f, h, m, w, S, I;
            if (S = t.originalEvent !== void 0 ? t.originalEvent.touches : null, !r.dragging || r.scrolling || S && S.length !== 1) return !1;
            if (f = r.getLeft(r.currentSlide), r.touchObject.curX = S !== void 0 ? S[0].pageX : t.clientX, r.touchObject.curY = S !== void 0 ? S[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), I = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))), !r.options.verticalSwiping && !r.swiping && I > 4) return r.scrolling = !0, !1;
            if (r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = I), h = r.swipeDirection(), t.originalEvent !== void 0 && r.touchObject.swipeLength > 4 && (r.swiping = !0, t.preventDefault()), w = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (w = r.touchObject.curY > r.touchObject.startY ? 1 : -1), m = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (r.currentSlide === 0 && h === "right" || r.currentSlide >= r.getDotCount() && h === "left") && (m = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = f + m * w : r.swipeLeft = f + m * (r.$list.height() / r.listWidth) * w, r.options.verticalSwiping === !0 && (r.swipeLeft = f + m * w), r.options.fade === !0 || r.options.touchMove === !1) return !1;
            if (r.animating === !0) return r.swipeLeft = null, !1;
            r.setCSS(r.swipeLeft)
        }, u.prototype.swipeStart = function(t) {
            var r = this,
                f;
            if (r.interrupted = !0, r.touchObject.fingerCount !== 1 || r.slideCount <= r.options.slidesToShow) return r.touchObject = {}, !1;
            t.originalEvent !== void 0 && t.originalEvent.touches !== void 0 && (f = t.originalEvent.touches[0]), r.touchObject.startX = r.touchObject.curX = f !== void 0 ? f.pageX : t.clientX, r.touchObject.startY = r.touchObject.curY = f !== void 0 ? f.pageY : t.clientY, r.dragging = !0
        }, u.prototype.unfilterSlides = u.prototype.slickUnfilter = function() {
            var t = this;
            t.$slidesCache !== null && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, u.prototype.unload = function() {
            var t = this;
            o(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, u.prototype.unslick = function(t) {
            var r = this;
            r.$slider.trigger("unslick", [r, t]), r.destroy()
        }, u.prototype.updateArrows = function() {
            var t = this;
            Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.currentSlide === 0 ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 || t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0) && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, u.prototype.updateDots = function() {
            var t = this;
            t.$dots !== null && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
        }, u.prototype.visibility = function() {
            var t = this;
            t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
        }, o.fn.slick = function() {
            var t = this,
                r = arguments[0],
                f = Array.prototype.slice.call(arguments, 1),
                h = t.length,
                m, w;
            for (m = 0; m < h; m++)
                if (typeof r == "object" || typeof r > "u" ? t[m].slick = new u(t[m], r) : w = t[m].slick[r].apply(t[m].slick, f), typeof w < "u") return w;
            return t
        }
    })
})(dp);
var hp = ma();
const Ee = ga(hp);
var ps = {},
    gp = {
        get exports() {
            return ps
        },
        set exports(c) {
            ps = c
        }
    };
(function(c, i) {
    (function(o, u) {
        c.exports = u()
    })(window, function() {
        return function(o) {
            var u = {};

            function t(r) {
                if (u[r]) return u[r].exports;
                var f = u[r] = {
                    i: r,
                    l: !1,
                    exports: {}
                };
                return o[r].call(f.exports, f, f.exports, t), f.l = !0, f.exports
            }
            return t.m = o, t.c = u, t.d = function(r, f, h) {
                t.o(r, f) || Object.defineProperty(r, f, {
                    enumerable: !0,
                    get: h
                })
            }, t.r = function(r) {
                typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(r, "__esModule", {
                    value: !0
                })
            }, t.t = function(r, f) {
                if (1 & f && (r = t(r)), 8 & f || 4 & f && typeof r == "object" && r && r.__esModule) return r;
                var h = Object.create(null);
                if (t.r(h), Object.defineProperty(h, "default", {
                        enumerable: !0,
                        value: r
                    }), 2 & f && typeof r != "string")
                    for (var m in r) t.d(h, m, function(w) {
                        return r[w]
                    }.bind(null, m));
                return h
            }, t.n = function(r) {
                var f = r && r.__esModule ? function() {
                    return r.default
                } : function() {
                    return r
                };
                return t.d(f, "a", f), f
            }, t.o = function(r, f) {
                return Object.prototype.hasOwnProperty.call(r, f)
            }, t.p = "", t(t.s = 0)
        }([function(o, u, t) {
            t.r(u);
            var r, f = "fslightbox-",
                h = "".concat(f, "styles"),
                m = "".concat(f, "cursor-grabbing"),
                w = "".concat(f, "full-dimension"),
                S = "".concat(f, "flex-centered"),
                I = "".concat(f, "open"),
                N = "".concat(f, "transform-transition"),
                K = "".concat(f, "absoluted"),
                D = "".concat(f, "slide-btn"),
                A = "".concat(D, "-container"),
                B = "".concat(f, "fade-in"),
                R = "".concat(f, "fade-out"),
                re = B + "-strong",
                ue = R + "-strong",
                se = "".concat(f, "opacity-"),
                ve = "".concat(se, "1"),
                l = "".concat(f, "source");

            function xe(x) {
                return (xe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(T) {
                    return typeof T
                } : function(T) {
                    return T && typeof Symbol == "function" && T.constructor === Symbol && T !== Symbol.prototype ? "symbol" : typeof T
                })(x)
            }

            function fe(x) {
                var T = x.stageIndexes,
                    P = x.core.stageManager,
                    j = x.props.sources.length - 1;
                P.getPreviousSlideIndex = function() {
                    return T.current === 0 ? j : T.current - 1
                }, P.getNextSlideIndex = function() {
                    return T.current === j ? 0 : T.current + 1
                }, P.updateStageIndexes = j === 0 ? function() {} : j === 1 ? function() {
                    T.current === 0 ? (T.next = 1, delete T.previous) : (T.previous = 0, delete T.next)
                } : function() {
                    T.previous = P.getPreviousSlideIndex(), T.next = P.getNextSlideIndex()
                }, P.i = j <= 2 ? function() {
                    return !0
                } : function(O) {
                    var H = T.current;
                    if (H === 0 && O === j || H === j && O === 0) return !0;
                    var q = H - O;
                    return q === -1 || q === 0 || q === 1
                }
            }(typeof document > "u" ? "undefined" : xe(document)) === "object" && ((r = document.createElement("style")).className = h, r.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")), document.head.appendChild(r));

            function _e(x) {
                var T, P = x.props,
                    j = 0,
                    O = {};
                this.getSourceTypeFromLocalStorageByUrl = function(q) {
                    return T[q] ? T[q] : H(q)
                }, this.handleReceivedSourceTypeForUrl = function(q, V) {
                    if (O[V] === !1 && (j--, q !== "invalid" ? O[V] = q : delete O[V], j === 0)) {
                        (function(z, Q) {
                            for (var J in Q) z[J] = Q[J]
                        })(T, O);
                        try {
                            localStorage.setItem("fslightbox-types", JSON.stringify(T))
                        } catch {}
                    }
                };
                var H = function(q) {
                    j++, O[q] = !1
                };
                if (P.disableLocalStorage) this.getSourceTypeFromLocalStorageByUrl = function() {}, this.handleReceivedSourceTypeForUrl = function() {};
                else {
                    try {
                        T = JSON.parse(localStorage.getItem("fslightbox-types"))
                    } catch {}
                    T || (T = {}, this.getSourceTypeFromLocalStorageByUrl = H)
                }
            }

            function we(x, T, P, j) {
                var O = x.data,
                    H = x.elements.sources,
                    q = P / j,
                    V = 0;
                this.adjustSize = function() {
                    if ((V = O.maxSourceWidth / q) < O.maxSourceHeight) return P < O.maxSourceWidth && (V = j), z();
                    V = j > O.maxSourceHeight ? O.maxSourceHeight : j, z()
                };
                var z = function() {
                    H[T].style.width = V * q + "px", H[T].style.height = V + "px"
                }
            }

            function ee(x, T) {
                var P = this,
                    j = x.collections.sourceSizers,
                    O = x.elements,
                    H = O.sourceAnimationWrappers,
                    q = O.sources,
                    V = x.isl,
                    z = x.resolve;

                function Q(J, te) {
                    j[T] = z(we, [T, J, te]), j[T].adjustSize()
                }
                this.runActions = function(J, te) {
                    V[T] = !0, q[T].classList.add(ve), H[T].classList.add(re), H[T].removeChild(H[T].firstChild), Q(J, te), P.runActions = Q
                }
            }

            function X(x, T) {
                var P, j = this,
                    O = x.elements.sources,
                    H = x.props,
                    q = (0, x.resolve)(ee, [T]);
                this.handleImageLoad = function(V) {
                    var z = V.target,
                        Q = z.naturalWidth,
                        J = z.naturalHeight;
                    q.runActions(Q, J)
                }, this.handleVideoLoad = function(V) {
                    var z = V.target,
                        Q = z.videoWidth,
                        J = z.videoHeight;
                    P = !0, q.runActions(Q, J)
                }, this.handleNotMetaDatedVideoLoad = function() {
                    P || j.handleYoutubeLoad()
                }, this.handleYoutubeLoad = function() {
                    var V = 1920,
                        z = 1080;
                    H.maxYoutubeDimensions && (V = H.maxYoutubeDimensions.width, z = H.maxYoutubeDimensions.height), q.runActions(V, z)
                }, this.handleCustomLoad = function() {
                    var V = O[T],
                        z = V.offsetWidth,
                        Q = V.offsetHeight;
                    z && Q ? q.runActions(z, Q) : setTimeout(j.handleCustomLoad)
                }
            }

            function ae(x, T, P) {
                var j = x.elements.sources,
                    O = x.props.customClasses,
                    H = O[T] ? O[T] : "";
                j[T].className = P + " " + H
            }

            function ne(x, T) {
                var P = x.elements.sources,
                    j = x.props.customAttributes;
                for (var O in j[T]) P[T].setAttribute(O, j[T][O])
            }

            function Ce(x, T) {
                var P = x.collections.sourceLoadHandlers,
                    j = x.elements,
                    O = j.sources,
                    H = j.sourceAnimationWrappers,
                    q = x.props.sources;
                O[T] = document.createElement("img"), ae(x, T, l), O[T].src = q[T], O[T].onload = P[T].handleImageLoad, ne(x, T), H[T].appendChild(O[T])
            }

            function Ae(x, T) {
                var P = x.collections.sourceLoadHandlers,
                    j = x.elements,
                    O = j.sources,
                    H = j.sourceAnimationWrappers,
                    q = x.props,
                    V = q.sources,
                    z = q.videosPosters;
                O[T] = document.createElement("video"), ae(x, T, l), O[T].src = V[T], O[T].onloadedmetadata = function(J) {
                    P[T].handleVideoLoad(J)
                }, O[T].controls = !0, ne(x, T), z[T] && (O[T].poster = z[T]);
                var Q = document.createElement("source");
                Q.src = V[T], O[T].appendChild(Q), setTimeout(P[T].handleNotMetaDatedVideoLoad, 3e3), H[T].appendChild(O[T])
            }

            function $e(x, T) {
                var P = x.collections.sourceLoadHandlers,
                    j = x.elements,
                    O = j.sources,
                    H = j.sourceAnimationWrappers,
                    q = x.props.sources;
                O[T] = document.createElement("iframe"), ae(x, T, "".concat(l, " ").concat(f, "youtube-iframe"));
                var V = q[T],
                    z = V.split("?")[1];
                O[T].src = "https://www.youtube.com/embed/".concat(V.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(z || ""), O[T].allowFullscreen = !0, ne(x, T), H[T].appendChild(O[T]), P[T].handleYoutubeLoad()
            }

            function et(x, T) {
                var P = x.collections.sourceLoadHandlers,
                    j = x.elements,
                    O = j.sources,
                    H = j.sourceAnimationWrappers,
                    q = x.props.sources;
                O[T] = q[T], ae(x, T, "".concat(O[T].className, " ").concat(l)), H[T].appendChild(O[T]), P[T].handleCustomLoad()
            }

            function Ye(x, T) {
                var P = x.elements,
                    j = P.sources,
                    O = P.sourceAnimationWrappers;
                x.props.sources, j[T] = document.createElement("div"), j[T].className = "".concat(f, "invalid-file-wrapper ").concat(S), j[T].innerHTML = "Invalid source", O[T].classList.add(re), O[T].removeChild(O[T].firstChild), O[T].appendChild(j[T])
            }

            function rt(x) {
                var T = x.collections,
                    P = T.sourceLoadHandlers,
                    j = T.sourcesRenderFunctions,
                    O = x.core.sourceDisplayFacade,
                    H = x.resolve;
                this.runActionsForSourceTypeAndIndex = function(q, V) {
                    var z;
                    switch (q !== "invalid" && (P[V] = H(X, [V])), q) {
                        case "image":
                            z = Ce;
                            break;
                        case "video":
                            z = Ae;
                            break;
                        case "youtube":
                            z = $e;
                            break;
                        case "custom":
                            z = et;
                            break;
                        default:
                            z = Ye
                    }
                    j[V] = function() {
                        return z(x, V)
                    }, O.displaySourcesWhichShouldBeDisplayed()
                }
            }

            function Ie() {
                var x, T, P, j = {
                    isUrlYoutubeOne: function(H) {
                        var q = document.createElement("a");
                        return q.href = H, q.hostname === "www.youtube.com" || q.hostname === "youtu.be"
                    },
                    getTypeFromResponseContentType: function(H) {
                        return H.slice(0, H.indexOf("/"))
                    }
                };

                function O() {
                    if (P.readyState !== 4) {
                        if (P.readyState === 2) {
                            var H;
                            switch (j.getTypeFromResponseContentType(P.getResponseHeader("content-type"))) {
                                case "image":
                                    H = "image";
                                    break;
                                case "video":
                                    H = "video";
                                    break;
                                default:
                                    H = "invalid"
                            }
                            P.onreadystatechange = null, P.abort(), T(H)
                        }
                    } else T("invalid")
                }
                this.setUrlToCheck = function(H) {
                    x = H
                }, this.getSourceType = function(H) {
                    if (j.isUrlYoutubeOne(x)) return H("youtube");
                    T = H, (P = new XMLHttpRequest).onreadystatechange = O, P.open("GET", x, !0), P.send()
                }
            }

            function Le(x, T, P) {
                var j = x.props,
                    O = j.types,
                    H = j.type,
                    q = j.sources,
                    V = x.resolve;
                this.getTypeSetByClientForIndex = function(z) {
                    var Q;
                    return O && O[z] ? Q = O[z] : H && (Q = H), Q
                }, this.retrieveTypeWithXhrForIndex = function(z) {
                    var Q = V(Ie);
                    Q.setUrlToCheck(q[z]), Q.getSourceType(function(J) {
                        T.handleReceivedSourceTypeForUrl(J, q[z]), P.runActionsForSourceTypeAndIndex(J, z)
                    })
                }
            }

            function Ke(x, T) {
                var P = x.core.stageManager,
                    j = x.elements,
                    O = j.smw,
                    H = j.sourceWrappersContainer,
                    q = x.props,
                    V = 0,
                    z = document.createElement("div");

                function Q(te) {
                    z.style.transform = "translateX(".concat(te + V, "px)"), V = 0
                }

                function J() {
                    return (1 + q.slideDistance) * innerWidth
                }
                z.className = "".concat(K, " ").concat(w, " ").concat(S), z.s = function() {
                        z.style.display = "flex"
                    }, z.h = function() {
                        z.style.display = "none"
                    }, z.a = function() {
                        z.classList.add(N)
                    }, z.d = function() {
                        z.classList.remove(N)
                    }, z.n = function() {
                        z.style.removeProperty("transform")
                    }, z.v = function(te) {
                        return V = te, z
                    }, z.ne = function() {
                        Q(-J())
                    }, z.z = function() {
                        Q(0)
                    }, z.p = function() {
                        Q(J())
                    }, P.i(T) || z.h(), O[T] = z, H.appendChild(z),
                    function(te, ge) {
                        var Ze = te.elements,
                            Fe = Ze.smw,
                            it = Ze.sourceAnimationWrappers,
                            Ne = document.createElement("div"),
                            qe = document.createElement("div");
                        qe.className = "fslightboxl";
                        for (var je = 0; je < 3; je++) {
                            var Ot = document.createElement("div");
                            qe.appendChild(Ot)
                        }
                        Ne.appendChild(qe), Fe[ge].appendChild(Ne), it[ge] = Ne
                    }(x, T)
            }

            function Re(x, T, P, j) {
                var O = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                O.setAttributeNS(null, "width", T), O.setAttributeNS(null, "height", T), O.setAttributeNS(null, "viewBox", P);
                var H = document.createElementNS("http://www.w3.org/2000/svg", "path");
                return H.setAttributeNS(null, "class", "".concat(f, "svg-path")), H.setAttributeNS(null, "d", j), O.appendChild(H), x.appendChild(O), O
            }

            function Ue(x, T) {
                var P = document.createElement("div");
                return P.className = "".concat(f, "toolbar-button ").concat(S), P.title = T, x.appendChild(P), P
            }

            function tt(x, T) {
                var P = document.createElement("div");
                P.className = "".concat(f, "toolbar"), T.appendChild(P),
                    function(j, O) {
                        var H = j.componentsServices,
                            q = j.data,
                            V = j.fs,
                            z = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z",
                            Q = Ue(O);
                        Q.title = "Enter fullscreen";
                        var J = Re(Q, "20px", "0 0 18 18", z);
                        H.ofs = function() {
                            q.ifs = !0, Q.title = "Exit fullscreen", J.setAttributeNS(null, "width", "24px"), J.setAttributeNS(null, "height", "24px"), J.setAttributeNS(null, "viewBox", "0 0 950 1024"), J.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z")
                        }, H.xfs = function() {
                            q.ifs = !1, Q.title = "Enter fullscreen", J.setAttributeNS(null, "width", "20px"), J.setAttributeNS(null, "height", "20px"), J.setAttributeNS(null, "viewBox", "0 0 18 18"), J.firstChild.setAttributeNS(null, "d", z)
                        }, Q.onclick = V.t
                    }(x, P),
                    function(j, O) {
                        var H = Ue(O, "Close");
                        H.onclick = j.core.lightboxCloser.closeLightbox, Re(H, "20px", "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")
                    }(x, P)
            }

            function We(x) {
                var T = x.props.sources,
                    P = x.elements.container,
                    j = document.createElement("div");
                j.className = "".concat(f, "nav"), P.appendChild(j), tt(x, j), T.length > 1 && function(O, H) {
                    var q = O.componentsServices,
                        V = O.props.sources,
                        z = (O.stageIndexes, document.createElement("div"));
                    z.className = "".concat(f, "slide-number-container");
                    var Q = document.createElement("div");
                    Q.className = S;
                    var J = document.createElement("span");
                    q.setSlideNumber = function(Ze) {
                        return J.innerHTML = Ze
                    };
                    var te = document.createElement("span");
                    te.className = "".concat(f, "slash");
                    var ge = document.createElement("div");
                    ge.innerHTML = V.length, z.appendChild(Q), Q.appendChild(J), Q.appendChild(te), Q.appendChild(ge), H.appendChild(z), setTimeout(function() {
                        Q.offsetWidth > 55 && (z.style.justifyContent = "flex-start")
                    })
                }(x, j)
            }

            function De(x, T, P, j) {
                var O = x.elements.container,
                    H = P.charAt(0).toUpperCase() + P.slice(1),
                    q = document.createElement("div");
                q.className = "".concat(A, " ").concat(A, "-").concat(P), q.title = "".concat(H, " slide"), q.onclick = T,
                    function(V, z) {
                        var Q = document.createElement("div");
                        Q.className = "".concat(D, " ").concat(S), Re(Q, "20px", "0 0 20 20", z), V.appendChild(Q)
                    }(q, j), O.appendChild(q)
            }

            function He(x) {
                var T = x.core,
                    P = T.lightboxCloser,
                    j = T.slideChangeFacade,
                    O = x.fs;
                this.listener = function(H) {
                    switch (H.key) {
                        case "Escape":
                            P.closeLightbox();
                            break;
                        case "ArrowLeft":
                            j.changeToPrevious();
                            break;
                        case "ArrowRight":
                            j.changeToNext();
                            break;
                        case "F11":
                            H.preventDefault(), O.t()
                    }
                }
            }

            function gt(x) {
                var T = x.elements,
                    P = x.sourcePointerProps,
                    j = x.stageIndexes;

                function O(H, q) {
                    T.smw[H].v(P.swipedX)[q]()
                }
                this.runActionsForEvent = function(H) {
                    var q, V, z;
                    T.container.contains(T.slideSwipingHoverer) || T.container.appendChild(T.slideSwipingHoverer), q = T.container, V = m, (z = q.classList).contains(V) || z.add(V), P.swipedX = H.screenX - P.downScreenX;
                    var Q = j.previous,
                        J = j.next;
                    O(j.current, "z"), Q !== void 0 && P.swipedX > 0 ? O(Q, "ne") : J !== void 0 && P.swipedX < 0 && O(J, "p")
                }
            }

            function ct(x) {
                var T = x.props.sources,
                    P = x.resolve,
                    j = x.sourcePointerProps,
                    O = P(gt);
                T.length === 1 ? this.listener = function() {
                    j.swipedX = 1
                } : this.listener = function(H) {
                    j.isPointering && O.runActionsForEvent(H)
                }
            }

            function ft(x) {
                var T = x.core.slideIndexChanger,
                    P = x.elements.smw,
                    j = x.stageIndexes,
                    O = x.sws;

                function H(V) {
                    var z = P[j.current];
                    z.a(), z[V]()
                }

                function q(V, z) {
                    V !== void 0 && (P[V].s(), P[V][z]())
                }
                this.runPositiveSwipedXActions = function() {
                    var V = j.previous;
                    if (V === void 0) H("z");
                    else {
                        H("p");
                        var z = j.next;
                        T.changeTo(V);
                        var Q = j.previous;
                        O.d(Q), O.b(z), H("z"), q(Q, "ne")
                    }
                }, this.runNegativeSwipedXActions = function() {
                    var V = j.next;
                    if (V === void 0) H("z");
                    else {
                        H("ne");
                        var z = j.previous;
                        T.changeTo(V);
                        var Q = j.next;
                        O.d(Q), O.b(z), H("z"), q(Q, "p")
                    }
                }
            }

            function Te(x, T) {
                x.contains(T) && x.removeChild(T)
            }

            function ke(x) {
                var T = x.core.lightboxCloser,
                    P = x.elements,
                    j = x.resolve,
                    O = x.sourcePointerProps,
                    H = j(ft);
                this.runNoSwipeActions = function() {
                    Te(P.container, P.slideSwipingHoverer), O.isSourceDownEventTarget || T.closeLightbox(), O.isPointering = !1
                }, this.runActions = function() {
                    O.swipedX > 0 ? H.runPositiveSwipedXActions() : H.runNegativeSwipedXActions(), Te(P.container, P.slideSwipingHoverer), P.container.classList.remove(m), O.isPointering = !1
                }
            }

            function Xe(x) {
                var T = x.resolve,
                    P = x.sourcePointerProps,
                    j = T(ke);
                this.listener = function() {
                    P.isPointering && (P.swipedX ? j.runActions() : j.runNoSwipeActions())
                }
            }

            function oe(x) {
                var T = this,
                    P = x.core,
                    j = P.eventsDispatcher,
                    O = P.globalEventsController,
                    H = P.scrollbarRecompensor,
                    q = x.data,
                    V = x.elements,
                    z = x.fs,
                    Q = x.props,
                    J = x.sourcePointerProps;
                this.isLightboxFadingOut = !1, this.runActions = function() {
                    T.isLightboxFadingOut = !0, V.container.classList.add(ue), O.removeListeners(), Q.exitFullscreenOnClose && q.ifs && z.x(), setTimeout(function() {
                        T.isLightboxFadingOut = !1, J.isPointering = !1, V.container.classList.remove(ue), document.documentElement.classList.remove(I), H.removeRecompense(), document.body.removeChild(V.container), j.dispatch("onClose")
                    }, 270)
                }
            }

            function Ge(x, T) {
                var P = x.classList;
                P.contains(T) && P.remove(T)
            }

            function Fi(x) {
                var T, P, j;
                P = (T = x).core.eventsDispatcher, j = T.props, P.dispatch = function(O) {
                        j[O] && j[O]()
                    },
                    function(O) {
                        var H = O.componentsServices,
                            q = O.data,
                            V = O.fs,
                            z = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];

                        function Q(te) {
                            for (var ge = 0; ge < z.length; ge++) document[te](z[ge], J)
                        }

                        function J() {
                            document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? H.ofs() : H.xfs()
                        }
                        V.o = function() {
                            H.ofs();
                            var te = document.documentElement;
                            te.requestFullscreen ? te.requestFullscreen() : te.mozRequestFullScreen ? te.mozRequestFullScreen() : te.webkitRequestFullscreen ? te.webkitRequestFullscreen() : te.msRequestFullscreen && te.msRequestFullscreen()
                        }, V.x = function() {
                            H.xfs(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
                        }, V.t = function() {
                            q.ifs ? V.x() : V.o()
                        }, V.l = function() {
                            Q("addEventListener")
                        }, V.q = function() {
                            Q("removeEventListener")
                        }
                    }(x),
                    function(O) {
                        var H = O.core,
                            q = H.globalEventsController,
                            V = H.windowResizeActioner,
                            z = O.fs,
                            Q = O.resolve,
                            J = Q(He),
                            te = Q(ct),
                            ge = Q(Xe);
                        q.attachListeners = function() {
                            document.addEventListener("pointermove", te.listener), document.addEventListener("pointerup", ge.listener), addEventListener("resize", V.runActions), document.addEventListener("keydown", J.listener), z.l()
                        }, q.removeListeners = function() {
                            document.removeEventListener("pointermove", te.listener), document.removeEventListener("pointerup", ge.listener), removeEventListener("resize", V.runActions), document.removeEventListener("keydown", J.listener), z.q()
                        }
                    }(x),
                    function(O) {
                        var H = O.core.lightboxCloser,
                            q = (0, O.resolve)(oe);
                        H.closeLightbox = function() {
                            q.isLightboxFadingOut || q.runActions()
                        }
                    }(x),
                    function(O) {
                        var H = O.data,
                            q = O.core.scrollbarRecompensor;

                        function V() {
                            document.body.offsetHeight > innerHeight && (document.body.style.marginRight = H.scrollbarWidth + "px")
                        }
                        q.addRecompense = function() {
                            document.readyState === "complete" ? V() : addEventListener("load", function() {
                                V(), q.addRecompense = V
                            })
                        }, q.removeRecompense = function() {
                            document.body.style.removeProperty("margin-right")
                        }
                    }(x),
                    function(O) {
                        var H = O.core,
                            q = H.slideChangeFacade,
                            V = H.slideIndexChanger,
                            z = H.stageManager;
                        O.props.sources.length > 1 ? (q.changeToPrevious = function() {
                            V.jumpTo(z.getPreviousSlideIndex())
                        }, q.changeToNext = function() {
                            V.jumpTo(z.getNextSlideIndex())
                        }) : (q.changeToPrevious = function() {}, q.changeToNext = function() {})
                    }(x),
                    function(O) {
                        var H = O.componentsServices,
                            q = O.core,
                            V = q.slideIndexChanger,
                            z = q.sourceDisplayFacade,
                            Q = q.stageManager,
                            J = O.elements,
                            te = J.smw,
                            ge = J.sourceAnimationWrappers,
                            Ze = O.isl,
                            Fe = O.stageIndexes,
                            it = O.sws;
                        V.changeTo = function(Ne) {
                            Fe.current = Ne, Q.updateStageIndexes(), H.setSlideNumber(Ne + 1), z.displaySourcesWhichShouldBeDisplayed()
                        }, V.jumpTo = function(Ne) {
                            var qe = Fe.previous,
                                je = Fe.current,
                                Ot = Fe.next,
                                lt = Ze[je],
                                _t = Ze[Ne];
                            V.changeTo(Ne);
                            for (var dt = 0; dt < te.length; dt++) te[dt].d();
                            it.d(je), it.c(), requestAnimationFrame(function() {
                                requestAnimationFrame(function() {
                                    var Zt = Fe.previous,
                                        ei = Fe.next;

                                    function Bi() {
                                        Q.i(je) ? je === Fe.previous ? te[je].ne() : je === Fe.next && te[je].p() : (te[je].h(), te[je].n())
                                    }
                                    lt && ge[je].classList.add(R), _t && ge[Fe.current].classList.add(B), it.a(), Zt !== void 0 && Zt !== je && te[Zt].ne(), te[Fe.current].n(), ei !== void 0 && ei !== je && te[ei].p(), it.b(qe), it.b(Ot), Ze[je] ? setTimeout(Bi, 260) : Bi()
                                })
                            })
                        }
                    }(x),
                    function(O) {
                        var H = O.core.sourcesPointerDown,
                            q = O.elements,
                            V = q.smw,
                            z = q.sources,
                            Q = O.sourcePointerProps,
                            J = O.stageIndexes;
                        H.listener = function(te) {
                            te.target.tagName !== "VIDEO" && te.preventDefault(), Q.isPointering = !0, Q.downScreenX = te.screenX, Q.swipedX = 0;
                            var ge = z[J.current];
                            ge && ge.contains(te.target) ? Q.isSourceDownEventTarget = !0 : Q.isSourceDownEventTarget = !1;
                            for (var Ze = 0; Ze < V.length; Ze++) V[Ze].d()
                        }
                    }(x),
                    function(O) {
                        var H = O.collections.sourcesRenderFunctions,
                            q = O.core.sourceDisplayFacade,
                            V = O.props,
                            z = O.stageIndexes;

                        function Q(J) {
                            H[J] && (H[J](), delete H[J])
                        }
                        q.displaySourcesWhichShouldBeDisplayed = function() {
                            if (V.loadOnlyCurrentSource) Q(z.current);
                            else
                                for (var J in z) Q(z[J])
                        }
                    }(x),
                    function(O) {
                        var H = O.core.stageManager,
                            q = O.elements,
                            V = q.smw,
                            z = q.sourceAnimationWrappers,
                            Q = O.isl,
                            J = O.stageIndexes,
                            te = O.sws;
                        te.a = function() {
                            for (var ge in J) V[J[ge]].s()
                        }, te.b = function(ge) {
                            ge === void 0 || H.i(ge) || (V[ge].h(), V[ge].n())
                        }, te.c = function() {
                            for (var ge in J) te.d(J[ge])
                        }, te.d = function(ge) {
                            if (Q[ge]) {
                                var Ze = z[ge];
                                Ge(Ze, re), Ge(Ze, B), Ge(Ze, R)
                            }
                        }
                    }(x),
                    function(O) {
                        var H = O.collections.sourceSizers,
                            q = O.core.windowResizeActioner,
                            V = O.data,
                            z = O.elements.smw,
                            Q = O.stageIndexes;
                        q.runActions = function() {
                            innerWidth < 992 ? V.maxSourceWidth = innerWidth : V.maxSourceWidth = .9 * innerWidth, V.maxSourceHeight = .9 * innerHeight;
                            for (var J = 0; J < z.length; J++) z[J].d(), H[J] && H[J].adjustSize();
                            var te = Q.previous,
                                ge = Q.next;
                            te !== void 0 && z[te].ne(), ge !== void 0 && z[ge].p()
                        }
                    }(x)
            }

            function Vi(x) {
                var T = x.componentsServices,
                    P = x.core,
                    j = P.eventsDispatcher,
                    O = P.globalEventsController,
                    H = P.scrollbarRecompensor,
                    q = P.sourceDisplayFacade,
                    V = P.stageManager,
                    z = P.windowResizeActioner,
                    Q = x.data,
                    J = x.elements,
                    te = (x.props, x.stageIndexes),
                    ge = x.sws;

                function Ze() {
                    var Fe, it;
                    Q.i = !0, Q.scrollbarWidth = function() {
                            var Ne = document.createElement("div"),
                                qe = Ne.style,
                                je = document.createElement("div");
                            qe.visibility = "hidden", qe.width = "100px", qe.msOverflowStyle = "scrollbar", qe.overflow = "scroll", je.style.width = "100%", document.body.appendChild(Ne);
                            var Ot = Ne.offsetWidth;
                            Ne.appendChild(je);
                            var lt = je.offsetWidth;
                            return document.body.removeChild(Ne), Ot - lt
                        }(), Fi(x), J.container = document.createElement("div"), J.container.className = "".concat(f, "container ").concat(w, " ").concat(re),
                        function(Ne) {
                            var qe = Ne.elements;
                            qe.slideSwipingHoverer = document.createElement("div"), qe.slideSwipingHoverer.className = "".concat(f, "slide-swiping-hoverer ").concat(w, " ").concat(K)
                        }(x), We(x),
                        function(Ne) {
                            var qe = Ne.core.sourcesPointerDown,
                                je = Ne.elements,
                                Ot = Ne.props.sources,
                                lt = document.createElement("div");
                            lt.className = "".concat(K, " ").concat(w), je.container.appendChild(lt), lt.addEventListener("pointerdown", qe.listener), je.sourceWrappersContainer = lt;
                            for (var _t = 0; _t < Ot.length; _t++) Ke(Ne, _t)
                        }(x), x.props.sources.length > 1 && (it = (Fe = x).core.slideChangeFacade, De(Fe, it.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"), De(Fe, it.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")),
                        function(Ne) {
                            for (var qe = Ne.props.sources, je = Ne.resolve, Ot = je(_e), lt = je(rt), _t = je(Le, [Ot, lt]), dt = 0; dt < qe.length; dt++)
                                if (typeof qe[dt] == "string") {
                                    var Zt = _t.getTypeSetByClientForIndex(dt);
                                    if (Zt) lt.runActionsForSourceTypeAndIndex(Zt, dt);
                                    else {
                                        var ei = Ot.getSourceTypeFromLocalStorageByUrl(qe[dt]);
                                        ei ? lt.runActionsForSourceTypeAndIndex(ei, dt) : _t.retrieveTypeWithXhrForIndex(dt)
                                    }
                                } else lt.runActionsForSourceTypeAndIndex("custom", dt)
                        }(x), j.dispatch("onInit")
                }
                x.open = function() {
                    var Fe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
                        it = te.previous,
                        Ne = te.current,
                        qe = te.next;
                    te.current = Fe, Q.i || fe(x), V.updateStageIndexes(), Q.i ? (ge.c(), ge.a(), ge.b(it), ge.b(Ne), ge.b(qe), j.dispatch("onShow")) : Ze(), q.displaySourcesWhichShouldBeDisplayed(), T.setSlideNumber(Fe + 1), document.body.appendChild(J.container), document.documentElement.classList.add(I), H.addRecompense(), O.attachListeners(), z.runActions(), J.smw[te.current].n(), j.dispatch("onOpen")
                }
            }

            function kt(x, T, P) {
                return (kt = Ft() ? Reflect.construct.bind() : function(j, O, H) {
                    var q = [null];
                    q.push.apply(q, O);
                    var V = new(Function.bind.apply(j, q));
                    return H && Jt(V, H.prototype), V
                }).apply(null, arguments)
            }

            function Ft() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                } catch {
                    return !1
                }
            }

            function Jt(x, T) {
                return (Jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(P, j) {
                    return P.__proto__ = j, P
                })(x, T)
            }

            function Rt(x) {
                return function(T) {
                    if (Array.isArray(T)) return at(T)
                }(x) || function(T) {
                    if (typeof Symbol < "u" && T[Symbol.iterator] != null || T["@@iterator"] != null) return Array.from(T)
                }(x) || function(T, P) {
                    if (T) {
                        if (typeof T == "string") return at(T, P);
                        var j = Object.prototype.toString.call(T).slice(8, -1);
                        if (j === "Object" && T.constructor && (j = T.constructor.name), j === "Map" || j === "Set") return Array.from(T);
                        if (j === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(j)) return at(T, P)
                    }
                }(x) || function() {
                    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
                }()
            }

            function at(x, T) {
                (T == null || T > x.length) && (T = x.length);
                for (var P = 0, j = new Array(T); P < T; P++) j[P] = x[P];
                return j
            }

            function bt() {
                for (var x = document.getElementsByTagName("a"), T = function(O) {
                        if (!x[O].hasAttribute("data-fslightbox")) return "continue";
                        var H = x[O].hasAttribute("data-href") ? x[O].getAttribute("data-href") : x[O].getAttribute("href");
                        if (!H) return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'), "continue";
                        var q = x[O].getAttribute("data-fslightbox");
                        fsLightboxInstances[q] || (fsLightboxInstances[q] = new FsLightbox);
                        var V = null;
                        H.charAt(0) === "#" ? (V = document.getElementById(H.substring(1)).cloneNode(!0)).removeAttribute("id") : V = H, fsLightboxInstances[q].props.sources.push(V), fsLightboxInstances[q].elements.a.push(x[O]);
                        var z = fsLightboxInstances[q].props.sources.length - 1;
                        x[O].onclick = function(it) {
                            it.preventDefault(), fsLightboxInstances[q].open(z)
                        }, Fe("types", "data-type"), Fe("videosPosters", "data-video-poster"), Fe("customClasses", "data-class"), Fe("customClasses", "data-custom-class");
                        for (var Q = ["href", "data-fslightbox", "data-href", "data-type", "data-video-poster", "data-class", "data-custom-class"], J = x[O].attributes, te = fsLightboxInstances[q].props.customAttributes, ge = 0; ge < J.length; ge++)
                            if (Q.indexOf(J[ge].name) === -1 && J[ge].name.substr(0, 5) === "data-") {
                                te[z] || (te[z] = {});
                                var Ze = J[ge].name.substr(5);
                                te[z][Ze] = J[ge].value
                            }
                        function Fe(it, Ne) {
                            x[O].hasAttribute(Ne) && (fsLightboxInstances[q].props[it][z] = x[O].getAttribute(Ne))
                        }
                    }, P = 0; P < x.length; P++) T(P);
                var j = Object.keys(fsLightboxInstances);
                window.fsLightbox = fsLightboxInstances[j[j.length - 1]]
            }
            window.FsLightbox = function() {
                var x = this;
                this.props = {
                    sources: [],
                    customAttributes: [],
                    customClasses: [],
                    types: [],
                    videosPosters: [],
                    slideDistance: .3
                }, this.data = {
                    isFullscreenOpen: !1,
                    maxSourceWidth: 0,
                    maxSourceHeight: 0,
                    scrollbarWidth: 0
                }, this.isl = [], this.sourcePointerProps = {
                    downScreenX: null,
                    isPointering: !1,
                    isSourceDownEventTarget: !1,
                    swipedX: 0
                }, this.stageIndexes = {}, this.elements = {
                    a: [],
                    container: null,
                    slideSwipingHoverer: null,
                    smw: [],
                    sourceWrappersContainer: null,
                    sources: [],
                    sourceAnimationWrappers: []
                }, this.componentsServices = {
                    setSlideNumber: function() {}
                }, this.resolve = function(T) {
                    var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
                    return P.unshift(x), kt(T, Rt(P))
                }, this.collections = {
                    sourceLoadHandlers: [],
                    sourcesRenderFunctions: [],
                    sourceSizers: []
                }, this.core = {
                    eventsDispatcher: {},
                    globalEventsController: {},
                    lightboxCloser: {},
                    lightboxUpdater: {},
                    scrollbarRecompensor: {},
                    slideChangeFacade: {},
                    slideIndexChanger: {},
                    sourcesPointerDown: {},
                    sourceDisplayFacade: {},
                    stageManager: {},
                    windowResizeActioner: {}
                }, this.fs = {}, this.sws = {}, Vi(this), this.close = function() {
                    return x.core.lightboxCloser.closeLightbox()
                }
            }, window.fsLightboxInstances = {}, bt(), window.refreshFsLightbox = function() {
                for (var x in fsLightboxInstances) {
                    var T = fsLightboxInstances[x].props;
                    fsLightboxInstances[x] = new FsLightbox, fsLightboxInstances[x].props = T, fsLightboxInstances[x].props.sources = [], fsLightboxInstances[x].elements.a = []
                }
                bt()
            }
        }])
    })
})(gp);
var Lr = {},
    mp = {
        get exports() {
            return Lr
        },
        set exports(c) {
            Lr = c
        }
    };
(function(c, i) {
    (function(o, u) {
        c.exports = u()
    })(ha, function() {
        return function(o) {
            function u(r) {
                if (t[r]) return t[r].exports;
                var f = t[r] = {
                    exports: {},
                    id: r,
                    loaded: !1
                };
                return o[r].call(f.exports, f, f.exports, u), f.loaded = !0, f.exports
            }
            var t = {};
            return u.m = o, u.c = t, u.p = "dist/", u(0)
        }([function(o, u, t) {
            function r(ne) {
                return ne && ne.__esModule ? ne : {
                    default: ne
                }
            }
            var f = Object.assign || function(ne) {
                    for (var Ce = 1; Ce < arguments.length; Ce++) {
                        var Ae = arguments[Ce];
                        for (var $e in Ae) Object.prototype.hasOwnProperty.call(Ae, $e) && (ne[$e] = Ae[$e])
                    }
                    return ne
                },
                h = t(1),
                m = (r(h), t(6)),
                w = r(m),
                S = t(7),
                I = r(S),
                N = t(8),
                K = r(N),
                D = t(9),
                A = r(D),
                B = t(10),
                R = r(B),
                re = t(11),
                ue = r(re),
                se = t(14),
                ve = r(se),
                l = [],
                xe = !1,
                fe = {
                    offset: 120,
                    delay: 0,
                    easing: "ease",
                    duration: 400,
                    disable: !1,
                    once: !1,
                    startEvent: "DOMContentLoaded",
                    throttleDelay: 99,
                    debounceDelay: 50,
                    disableMutationObserver: !1
                },
                _e = function() {
                    var ne = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
                    if (ne && (xe = !0), xe) return l = (0, ue.default)(l, fe), (0, R.default)(l, fe.once), l
                },
                we = function() {
                    l = (0, ve.default)(), _e()
                },
                ee = function() {
                    l.forEach(function(ne, Ce) {
                        ne.node.removeAttribute("data-aos"), ne.node.removeAttribute("data-aos-easing"), ne.node.removeAttribute("data-aos-duration"), ne.node.removeAttribute("data-aos-delay")
                    })
                },
                X = function(ne) {
                    return ne === !0 || ne === "mobile" && A.default.mobile() || ne === "phone" && A.default.phone() || ne === "tablet" && A.default.tablet() || typeof ne == "function" && ne() === !0
                },
                ae = function(ne) {
                    fe = f(fe, ne), l = (0, ve.default)();
                    var Ce = document.all && !window.atob;
                    return X(fe.disable) || Ce ? ee() : (fe.disableMutationObserver || K.default.isSupported() || (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `), fe.disableMutationObserver = !0), document.querySelector("body").setAttribute("data-aos-easing", fe.easing), document.querySelector("body").setAttribute("data-aos-duration", fe.duration), document.querySelector("body").setAttribute("data-aos-delay", fe.delay), fe.startEvent === "DOMContentLoaded" && ["complete", "interactive"].indexOf(document.readyState) > -1 ? _e(!0) : fe.startEvent === "load" ? window.addEventListener(fe.startEvent, function() {
                        _e(!0)
                    }) : document.addEventListener(fe.startEvent, function() {
                        _e(!0)
                    }), window.addEventListener("resize", (0, I.default)(_e, fe.debounceDelay, !0)), window.addEventListener("orientationchange", (0, I.default)(_e, fe.debounceDelay, !0)), window.addEventListener("scroll", (0, w.default)(function() {
                        (0, R.default)(l, fe.once)
                    }, fe.throttleDelay)), fe.disableMutationObserver || K.default.ready("[data-aos]", we), l)
                };
            o.exports = {
                init: ae,
                refresh: _e,
                refreshHard: we
            }
        }, function(o, u) {}, , , , , function(o, u) {
            (function(t) {
                function r(X, ae, ne) {
                    function Ce(ke) {
                        var Xe = Re,
                            oe = Ue;
                        return Re = Ue = void 0, gt = ke, We = X.apply(oe, Xe)
                    }

                    function Ae(ke) {
                        return gt = ke, De = setTimeout(Ye, ae), ct ? Ce(ke) : We
                    }

                    function $e(ke) {
                        var Xe = ke - He,
                            oe = ke - gt,
                            Ge = ae - Xe;
                        return ft ? we(Ge, tt - oe) : Ge
                    }

                    function et(ke) {
                        var Xe = ke - He,
                            oe = ke - gt;
                        return He === void 0 || Xe >= ae || Xe < 0 || ft && oe >= tt
                    }

                    function Ye() {
                        var ke = ee();
                        return et(ke) ? rt(ke) : void(De = setTimeout(Ye, $e(ke)))
                    }

                    function rt(ke) {
                        return De = void 0, Te && Re ? Ce(ke) : (Re = Ue = void 0, We)
                    }

                    function Ie() {
                        De !== void 0 && clearTimeout(De), gt = 0, Re = He = Ue = De = void 0
                    }

                    function Le() {
                        return De === void 0 ? We : rt(ee())
                    }

                    function Ke() {
                        var ke = ee(),
                            Xe = et(ke);
                        if (Re = arguments, Ue = this, He = ke, Xe) {
                            if (De === void 0) return Ae(He);
                            if (ft) return De = setTimeout(Ye, ae), Ce(He)
                        }
                        return De === void 0 && (De = setTimeout(Ye, ae)), We
                    }
                    var Re, Ue, tt, We, De, He, gt = 0,
                        ct = !1,
                        ft = !1,
                        Te = !0;
                    if (typeof X != "function") throw new TypeError(N);
                    return ae = S(ae) || 0, h(ne) && (ct = !!ne.leading, ft = "maxWait" in ne, tt = ft ? _e(S(ne.maxWait) || 0, ae) : tt, Te = "trailing" in ne ? !!ne.trailing : Te), Ke.cancel = Ie, Ke.flush = Le, Ke
                }

                function f(X, ae, ne) {
                    var Ce = !0,
                        Ae = !0;
                    if (typeof X != "function") throw new TypeError(N);
                    return h(ne) && (Ce = "leading" in ne ? !!ne.leading : Ce, Ae = "trailing" in ne ? !!ne.trailing : Ae), r(X, ae, {
                        leading: Ce,
                        maxWait: ae,
                        trailing: Ae
                    })
                }

                function h(X) {
                    var ae = typeof X > "u" ? "undefined" : I(X);
                    return !!X && (ae == "object" || ae == "function")
                }

                function m(X) {
                    return !!X && (typeof X > "u" ? "undefined" : I(X)) == "object"
                }

                function w(X) {
                    return (typeof X > "u" ? "undefined" : I(X)) == "symbol" || m(X) && fe.call(X) == D
                }

                function S(X) {
                    if (typeof X == "number") return X;
                    if (w(X)) return K;
                    if (h(X)) {
                        var ae = typeof X.valueOf == "function" ? X.valueOf() : X;
                        X = h(ae) ? ae + "" : ae
                    }
                    if (typeof X != "string") return X === 0 ? X : +X;
                    X = X.replace(A, "");
                    var ne = R.test(X);
                    return ne || re.test(X) ? ue(X.slice(2), ne ? 2 : 8) : B.test(X) ? K : +X
                }
                var I = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(X) {
                        return typeof X
                    } : function(X) {
                        return X && typeof Symbol == "function" && X.constructor === Symbol && X !== Symbol.prototype ? "symbol" : typeof X
                    },
                    N = "Expected a function",
                    K = NaN,
                    D = "[object Symbol]",
                    A = /^\s+|\s+$/g,
                    B = /^[-+]0x[0-9a-f]+$/i,
                    R = /^0b[01]+$/i,
                    re = /^0o[0-7]+$/i,
                    ue = parseInt,
                    se = (typeof t > "u" ? "undefined" : I(t)) == "object" && t && t.Object === Object && t,
                    ve = (typeof self > "u" ? "undefined" : I(self)) == "object" && self && self.Object === Object && self,
                    l = se || ve || Function("return this")(),
                    xe = Object.prototype,
                    fe = xe.toString,
                    _e = Math.max,
                    we = Math.min,
                    ee = function() {
                        return l.Date.now()
                    };
                o.exports = f
            }).call(u, function() {
                return this
            }())
        }, function(o, u) {
            (function(t) {
                function r(ee, X, ae) {
                    function ne(Te) {
                        var ke = Ke,
                            Xe = Re;
                        return Ke = Re = void 0, He = Te, tt = ee.apply(Xe, ke)
                    }

                    function Ce(Te) {
                        return He = Te, We = setTimeout(et, X), gt ? ne(Te) : tt
                    }

                    function Ae(Te) {
                        var ke = Te - De,
                            Xe = Te - He,
                            oe = X - ke;
                        return ct ? _e(oe, Ue - Xe) : oe
                    }

                    function $e(Te) {
                        var ke = Te - De,
                            Xe = Te - He;
                        return De === void 0 || ke >= X || ke < 0 || ct && Xe >= Ue
                    }

                    function et() {
                        var Te = we();
                        return $e(Te) ? Ye(Te) : void(We = setTimeout(et, Ae(Te)))
                    }

                    function Ye(Te) {
                        return We = void 0, ft && Ke ? ne(Te) : (Ke = Re = void 0, tt)
                    }

                    function rt() {
                        We !== void 0 && clearTimeout(We), He = 0, Ke = De = Re = We = void 0
                    }

                    function Ie() {
                        return We === void 0 ? tt : Ye(we())
                    }

                    function Le() {
                        var Te = we(),
                            ke = $e(Te);
                        if (Ke = arguments, Re = this, De = Te, ke) {
                            if (We === void 0) return Ce(De);
                            if (ct) return We = setTimeout(et, X), ne(De)
                        }
                        return We === void 0 && (We = setTimeout(et, X)), tt
                    }
                    var Ke, Re, Ue, tt, We, De, He = 0,
                        gt = !1,
                        ct = !1,
                        ft = !0;
                    if (typeof ee != "function") throw new TypeError(I);
                    return X = w(X) || 0, f(ae) && (gt = !!ae.leading, ct = "maxWait" in ae, Ue = ct ? fe(w(ae.maxWait) || 0, X) : Ue, ft = "trailing" in ae ? !!ae.trailing : ft), Le.cancel = rt, Le.flush = Ie, Le
                }

                function f(ee) {
                    var X = typeof ee > "u" ? "undefined" : S(ee);
                    return !!ee && (X == "object" || X == "function")
                }

                function h(ee) {
                    return !!ee && (typeof ee > "u" ? "undefined" : S(ee)) == "object"
                }

                function m(ee) {
                    return (typeof ee > "u" ? "undefined" : S(ee)) == "symbol" || h(ee) && xe.call(ee) == K
                }

                function w(ee) {
                    if (typeof ee == "number") return ee;
                    if (m(ee)) return N;
                    if (f(ee)) {
                        var X = typeof ee.valueOf == "function" ? ee.valueOf() : ee;
                        ee = f(X) ? X + "" : X
                    }
                    if (typeof ee != "string") return ee === 0 ? ee : +ee;
                    ee = ee.replace(D, "");
                    var ae = B.test(ee);
                    return ae || R.test(ee) ? re(ee.slice(2), ae ? 2 : 8) : A.test(ee) ? N : +ee
                }
                var S = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(ee) {
                        return typeof ee
                    } : function(ee) {
                        return ee && typeof Symbol == "function" && ee.constructor === Symbol && ee !== Symbol.prototype ? "symbol" : typeof ee
                    },
                    I = "Expected a function",
                    N = NaN,
                    K = "[object Symbol]",
                    D = /^\s+|\s+$/g,
                    A = /^[-+]0x[0-9a-f]+$/i,
                    B = /^0b[01]+$/i,
                    R = /^0o[0-7]+$/i,
                    re = parseInt,
                    ue = (typeof t > "u" ? "undefined" : S(t)) == "object" && t && t.Object === Object && t,
                    se = (typeof self > "u" ? "undefined" : S(self)) == "object" && self && self.Object === Object && self,
                    ve = ue || se || Function("return this")(),
                    l = Object.prototype,
                    xe = l.toString,
                    fe = Math.max,
                    _e = Math.min,
                    we = function() {
                        return ve.Date.now()
                    };
                o.exports = r
            }).call(u, function() {
                return this
            }())
        }, function(o, u) {
            function t(S) {
                var I = void 0,
                    N = void 0;
                for (I = 0; I < S.length; I += 1)
                    if (N = S[I], N.dataset && N.dataset.aos || N.children && t(N.children)) return !0;
                return !1
            }

            function r() {
                return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
            }

            function f() {
                return !!r()
            }

            function h(S, I) {
                var N = window.document,
                    K = r(),
                    D = new K(m);
                w = I, D.observe(N.documentElement, {
                    childList: !0,
                    subtree: !0,
                    removedNodes: !0
                })
            }

            function m(S) {
                S && S.forEach(function(I) {
                    var N = Array.prototype.slice.call(I.addedNodes),
                        K = Array.prototype.slice.call(I.removedNodes),
                        D = N.concat(K);
                    if (t(D)) return w()
                })
            }
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var w = function() {};
            u.default = {
                isSupported: f,
                ready: h
            }
        }, function(o, u) {
            function t(N, K) {
                if (!(N instanceof K)) throw new TypeError("Cannot call a class as a function")
            }

            function r() {
                return navigator.userAgent || navigator.vendor || window.opera || ""
            }
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var f = function() {
                    function N(K, D) {
                        for (var A = 0; A < D.length; A++) {
                            var B = D[A];
                            B.enumerable = B.enumerable || !1, B.configurable = !0, "value" in B && (B.writable = !0), Object.defineProperty(K, B.key, B)
                        }
                    }
                    return function(K, D, A) {
                        return D && N(K.prototype, D), A && N(K, A), K
                    }
                }(),
                h = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                m = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                w = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
                S = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                I = function() {
                    function N() {
                        t(this, N)
                    }
                    return f(N, [{
                        key: "phone",
                        value: function() {
                            var K = r();
                            return !(!h.test(K) && !m.test(K.substr(0, 4)))
                        }
                    }, {
                        key: "mobile",
                        value: function() {
                            var K = r();
                            return !(!w.test(K) && !S.test(K.substr(0, 4)))
                        }
                    }, {
                        key: "tablet",
                        value: function() {
                            return this.mobile() && !this.phone()
                        }
                    }]), N
                }();
            u.default = new I
        }, function(o, u) {
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var t = function(f, h, m) {
                    var w = f.node.getAttribute("data-aos-once");
                    h > f.position ? f.node.classList.add("aos-animate") : typeof w < "u" && (w === "false" || !m && w !== "true") && f.node.classList.remove("aos-animate")
                },
                r = function(f, h) {
                    var m = window.pageYOffset,
                        w = window.innerHeight;
                    f.forEach(function(S, I) {
                        t(S, w + m, h)
                    })
                };
            u.default = r
        }, function(o, u, t) {
            function r(w) {
                return w && w.__esModule ? w : {
                    default: w
                }
            }
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var f = t(12),
                h = r(f),
                m = function(w, S) {
                    return w.forEach(function(I, N) {
                        I.node.classList.add("aos-init"), I.position = (0, h.default)(I.node, S.offset)
                    }), w
                };
            u.default = m
        }, function(o, u, t) {
            function r(w) {
                return w && w.__esModule ? w : {
                    default: w
                }
            }
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var f = t(13),
                h = r(f),
                m = function(w, S) {
                    var I = 0,
                        N = 0,
                        K = window.innerHeight,
                        D = {
                            offset: w.getAttribute("data-aos-offset"),
                            anchor: w.getAttribute("data-aos-anchor"),
                            anchorPlacement: w.getAttribute("data-aos-anchor-placement")
                        };
                    switch (D.offset && !isNaN(D.offset) && (N = parseInt(D.offset)), D.anchor && document.querySelectorAll(D.anchor) && (w = document.querySelectorAll(D.anchor)[0]), I = (0, h.default)(w).top, D.anchorPlacement) {
                        case "top-bottom":
                            break;
                        case "center-bottom":
                            I += w.offsetHeight / 2;
                            break;
                        case "bottom-bottom":
                            I += w.offsetHeight;
                            break;
                        case "top-center":
                            I += K / 2;
                            break;
                        case "bottom-center":
                            I += K / 2 + w.offsetHeight;
                            break;
                        case "center-center":
                            I += K / 2 + w.offsetHeight / 2;
                            break;
                        case "top-top":
                            I += K;
                            break;
                        case "bottom-top":
                            I += w.offsetHeight + K;
                            break;
                        case "center-top":
                            I += w.offsetHeight / 2 + K
                    }
                    return D.anchorPlacement || D.offset || isNaN(S) || (N = S), I + N
                };
            u.default = m
        }, function(o, u) {
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var t = function(r) {
                for (var f = 0, h = 0; r && !isNaN(r.offsetLeft) && !isNaN(r.offsetTop);) f += r.offsetLeft - (r.tagName != "BODY" ? r.scrollLeft : 0), h += r.offsetTop - (r.tagName != "BODY" ? r.scrollTop : 0), r = r.offsetParent;
                return {
                    top: h,
                    left: f
                }
            };
            u.default = t
        }, function(o, u) {
            Object.defineProperty(u, "__esModule", {
                value: !0
            });
            var t = function(r) {
                return r = r || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(r, function(f) {
                    return {
                        node: f
                    }
                })
            };
            u.default = t
        }])
    })
})(mp);
const vp = ga(Lr);
var Dr = {},
    yp = {
        get exports() {
            return Dr
        },
        set exports(c) {
            Dr = c
        }
    };
(function(c) {
    (function() {
        var i, o = [];

        function u(D) {
            o.push(D), o.length == 1 && i()
        }

        function t() {
            for (; o.length;) o[0](), o.shift()
        }
        i = function() {
            setTimeout(t)
        };

        function r(D) {
            this.a = f, this.b = void 0, this.f = [];
            var A = this;
            try {
                D(function(B) {
                    w(A, B)
                }, function(B) {
                    S(A, B)
                })
            } catch (B) {
                S(A, B)
            }
        }
        var f = 2;

        function h(D) {
            return new r(function(A, B) {
                B(D)
            })
        }

        function m(D) {
            return new r(function(A) {
                A(D)
            })
        }

        function w(D, A) {
            if (D.a == f) {
                if (A == D) throw new TypeError;
                var B = !1;
                try {
                    var R = A && A.then;
                    if (A != null && typeof A == "object" && typeof R == "function") {
                        R.call(A, function(re) {
                            B || w(D, re), B = !0
                        }, function(re) {
                            B || S(D, re), B = !0
                        });
                        return
                    }
                } catch (re) {
                    B || S(D, re);
                    return
                }
                D.a = 0, D.b = A, I(D)
            }
        }

        function S(D, A) {
            if (D.a == f) {
                if (A == D) throw new TypeError;
                D.a = 1, D.b = A, I(D)
            }
        }

        function I(D) {
            u(function() {
                if (D.a != f)
                    for (; D.f.length;) {
                        var re = D.f.shift(),
                            A = re[0],
                            B = re[1],
                            R = re[2],
                            re = re[3];
                        try {
                            D.a == 0 ? R(typeof A == "function" ? A.call(void 0, D.b) : D.b) : D.a == 1 && (typeof B == "function" ? R(B.call(void 0, D.b)) : re(D.b))
                        } catch (ue) {
                            re(ue)
                        }
                    }
            })
        }
        r.prototype.g = function(D) {
            return this.c(void 0, D)
        }, r.prototype.c = function(D, A) {
            var B = this;
            return new r(function(R, re) {
                B.f.push([D, A, R, re]), I(B)
            })
        };

        function N(D) {
            return new r(function(A, B) {
                function R(ve) {
                    return function(l) {
                        ue[ve] = l, re += 1, re == D.length && A(ue)
                    }
                }
                var re = 0,
                    ue = [];
                D.length == 0 && A(ue);
                for (var se = 0; se < D.length; se += 1) m(D[se]).c(R(se), B)
            })
        }

        function K(D) {
            return new r(function(A, B) {
                for (var R = 0; R < D.length; R += 1) m(D[R]).c(A, B)
            })
        }
        window.Promise || (window.Promise = r, window.Promise.resolve = m, window.Promise.reject = h, window.Promise.race = K, window.Promise.all = N, window.Promise.prototype.then = r.prototype.c, window.Promise.prototype.catch = r.prototype.g)
    })(),
    function() {
        function i(A, B) {
            document.addEventListener ? A.addEventListener("scroll", B, !1) : A.attachEvent("scroll", B)
        }

        function o(A) {
            document.body ? A() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function B() {
                document.removeEventListener("DOMContentLoaded", B), A()
            }) : document.attachEvent("onreadystatechange", function B() {
                (document.readyState == "interactive" || document.readyState == "complete") && (document.detachEvent("onreadystatechange", B), A())
            })
        }

        function u(A) {
            this.g = document.createElement("div"), this.g.setAttribute("aria-hidden", "true"), this.g.appendChild(document.createTextNode(A)), this.h = document.createElement("span"), this.i = document.createElement("span"), this.m = document.createElement("span"), this.j = document.createElement("span"), this.l = -1, this.h.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.i.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.j.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.m.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.h.appendChild(this.m), this.i.appendChild(this.j), this.g.appendChild(this.h), this.g.appendChild(this.i)
        }

        function t(A, B) {
            A.g.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + B + ";"
        }

        function r(A) {
            var B = A.g.offsetWidth,
                R = B + 100;
            return A.j.style.width = R + "px", A.i.scrollLeft = R, A.h.scrollLeft = A.h.scrollWidth + 100, A.l !== B ? (A.l = B, !0) : !1
        }

        function f(A, B) {
            function R() {
                var ue = re;
                r(ue) && ue.g.parentNode !== null && B(ue.l)
            }
            var re = A;
            i(A.h, R), i(A.i, R), r(A)
        }

        function h(A, B, R) {
            B = B || {}, R = R || window, this.family = A, this.style = B.style || "normal", this.weight = B.weight || "normal", this.stretch = B.stretch || "normal", this.context = R
        }
        var m = null,
            w = null,
            S = null,
            I = null;

        function N(A) {
            return w === null && (K(A) && /Apple/.test(window.navigator.vendor) ? (A = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent), w = !!A && 603 > parseInt(A[1], 10)) : w = !1), w
        }

        function K(A) {
            return I === null && (I = !!A.document.fonts), I
        }

        function D(A, B) {
            var R = A.style,
                re = A.weight;
            if (S === null) {
                var ue = document.createElement("div");
                try {
                    ue.style.font = "condensed 100px sans-serif"
                } catch {}
                S = ue.style.font !== ""
            }
            return [R, re, S ? A.stretch : "", "100px", B].join(" ")
        }
        h.prototype.load = function(A, B) {
            var R = this,
                re = A || "BESbswy",
                ue = 0,
                se = B || 3e3,
                ve = new Date().getTime();
            return new Promise(function(l, xe) {
                if (K(R.context) && !N(R.context)) {
                    var fe = new Promise(function(we, ee) {
                            function X() {
                                new Date().getTime() - ve >= se ? ee(Error("" + se + "ms timeout exceeded")) : R.context.document.fonts.load(D(R, '"' + R.family + '"'), re).then(function(ae) {
                                    1 <= ae.length ? we() : setTimeout(X, 25)
                                }, ee)
                            }
                            X()
                        }),
                        _e = new Promise(function(we, ee) {
                            ue = setTimeout(function() {
                                ee(Error("" + se + "ms timeout exceeded"))
                            }, se)
                        });
                    Promise.race([_e, fe]).then(function() {
                        clearTimeout(ue), l(R)
                    }, xe)
                } else o(function() {
                    function we() {
                        var Le;
                        (Le = Ce != -1 && Ae != -1 || Ce != -1 && $e != -1 || Ae != -1 && $e != -1) && ((Le = Ce != Ae && Ce != $e && Ae != $e) || (m === null && (Le = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), m = !!Le && (536 > parseInt(Le[1], 10) || parseInt(Le[1], 10) === 536 && 11 >= parseInt(Le[2], 10))), Le = m && (Ce == et && Ae == et && $e == et || Ce == Ye && Ae == Ye && $e == Ye || Ce == rt && Ae == rt && $e == rt)), Le = !Le), Le && (Ie.parentNode !== null && Ie.parentNode.removeChild(Ie), clearTimeout(ue), l(R))
                    }

                    function ee() {
                        if (new Date().getTime() - ve >= se) Ie.parentNode !== null && Ie.parentNode.removeChild(Ie), xe(Error("" + se + "ms timeout exceeded"));
                        else {
                            var Le = R.context.document.hidden;
                            (Le === !0 || Le === void 0) && (Ce = X.g.offsetWidth, Ae = ae.g.offsetWidth, $e = ne.g.offsetWidth, we()), ue = setTimeout(ee, 50)
                        }
                    }
                    var X = new u(re),
                        ae = new u(re),
                        ne = new u(re),
                        Ce = -1,
                        Ae = -1,
                        $e = -1,
                        et = -1,
                        Ye = -1,
                        rt = -1,
                        Ie = document.createElement("div");
                    Ie.dir = "ltr", t(X, D(R, "sans-serif")), t(ae, D(R, "serif")), t(ne, D(R, "monospace")), Ie.appendChild(X.g), Ie.appendChild(ae.g), Ie.appendChild(ne.g), R.context.document.body.appendChild(Ie), et = X.g.offsetWidth, Ye = ae.g.offsetWidth, rt = ne.g.offsetWidth, ee(), f(X, function(Le) {
                        Ce = Le, we()
                    }), t(X, D(R, '"' + R.family + '",sans-serif')), f(ae, function(Le) {
                        Ae = Le, we()
                    }), t(ae, D(R, '"' + R.family + '",serif')), f(ne, function(Le) {
                        $e = Le, we()
                    }), t(ne, D(R, '"' + R.family + '",monospace'))
                })
            })
        }, c.exports = h
    }()
})(yp);
const va = Dr;
vp.init();
const bp = new va("Poppins"),
    _p = new va("Bebas Neue");
Promise.all([bp.load(), _p.load()]).then(function() {
    console.log("Family A & B have loaded")
}, function() {
    console.log("Font is not available after waiting 5 seconds")
});
Ee(".packages").slick({
    dots: !1,
    infinite: !0,
    speed: 1200,
    arrows: !0,
    autoplay: !0,
    autoplaySpeed: 1e3,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: !0,
    responsive: [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !0,
            dots: !1
        }
    }, {
        breakpoint: 991,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 767,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
Ee(".features-list").slick({
    dots: !1,
    infinite: !0,
    speed: 300,
    arrows: !1,
    autoplay: !0,
    autoplaySpeed: 1e3,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !0,
            dots: !1
        }
    }, {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 767,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
Ee(".portfolio-list").slick({
    dots: !0,
    infinite: !0,
    speed: 900,
    arrows: !1,
    autoplay: !0,
    autoplaySpeed: 1e3,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 6e3,
        settings: "unslick"
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
Ee(".testimonials").slick({
    dots: !0,
    infinite: !0,
    speed: 900,
    arrows: !1,
    autoplay: !1,
    autoplaySpeed: 1e3,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.testimonials-text',
    adaptiveHeight: !0
});
Ee(".testimonials-text").slick({
    dots: !1,
    infinite: !0,
    speed: 900,
    arrows: !1,
    autoplay: !1,
    fade: !0,
    autoplaySpeed: 1e3,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.testimonials',
    adaptiveHeight: !0
});
Ee(".mob-screens").slick({
    dots: !1,
    infinite: !0,
    speed: 300,
    arrows: !1,
    autoplay: !0,
    autoplaySpeed: 1e3,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".screens"
});
Ee(".reviews").slick({
    dots: !1,
    infinite: !0,
    speed: 900,
    autoplay: !0,
    autoplaySpeed: 1e3,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
Ee(".portfolio-slider").slick({
    dots: !1,
    infinite: !0,
    speed: 900,
    autoplay: !0,
    autoplaySpeed: 1e3,
    centerMode: !0,
    centerPadding: "7vw",
    slidesToShow: 3,
    swipeToSlide: !0,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
Ee(".popupToggler").click(function(c) {
    c.preventDefault(), Ee(".popup-wrap").toggleClass("active")
     Ee('#packageName').val(Ee(this).parents('.package-box').find('.secondary-hd').text())
});
Ee("[data-targetit]").on("click", function(c) {
    Ee(this).addClass("active"), Ee(this).siblings().removeClass("active");
    var i = Ee(this).data("targetit"),
        o = Ee(this).data("order");
    Ee("." + i).siblings('[class^="tab-panel-area-"]').hide(), Ee("." + i).siblings('[class^="tab-panel-area-"]').removeClass("active"), Ee("." + i).fadeIn(), Ee("." + i).addClass("active"), Ee(".screens").slick("setPosition"), Ee(".mob-screens").slick("setPosition");
    let u = document.querySelector(".swiper-container" + o);
    console.log(u), u.swiper.update(), u.swiper.lazy.load()
});
Ee(".faq-btn").click(function() {
    Ee(".faq-content").slideUp(), Ee(".faq").removeClass("active"), Ee(this).parents(".faq").find(".faq-content").slideToggle(), Ee(this).parents(".faq").toggleClass("active")
});
Ee(".swipe-slide").removeClass("active");
Ee(".packs-area .popupToggler").click(function() {
    let c = Ee(this).closest(".package-box").find(".title").text(),
        i = Ee("#packageName").val(c);
    console.log(i.val())
});
Ee(".confirmToggler").click(function() {
    Ee(".confirm-pop").removeClass("active")
});
const wp = new Proxy(new URLSearchParams(window.location.search), {
    get: (c, i) => c.get(i)
});
let Er = wp.status;
if (Er) {
    if (Ee(".confirm-pop").addClass("active"), Er == "success") {
        Ee("#confirmation").addClass("active"), Ee(".checked-confirm").show();
        let c = Ee("#confirmText").data("succes");
        Ee("#confirmText").html(c)
    } else if (Er == "error") {
        Ee(".cancel-confirm").show();
        let c = Ee("#confirmText").data("cancel");
        Ee("#confirmText").html(c)
    }
}
Ee("#url").val(window.location.href);