var _extends = Object.assign || function(t) {
		for (var e = 1; e < arguments.length; e++) {
			var i = arguments[e];
			for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
		}
		return t
	},
	_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
	},
	PNotify = function() {
		"use strict";

		function t() {
			g.defaultStack.context = document.body, window.addEventListener("resize", function() {
				n && clearTimeout(n), n = setTimeout(function() {
					g.positionAll()
				}, 10)
			})
		}

		function m(t) {
			t.overlay.parentNode && t.overlay.parentNode.removeChild(t.overlay)
		}

		function e(t, e) {
			return "object" !== (void 0 === t ? "undefined" : _typeof(t)) && (t = {
				text: t
			}), e && (t.type = e), {
				target: document.body,
				data: t
			}
		}
		var g = void 0,
			n = void 0;
		var i = {
			runModules: function(t) {
				if ("init" === t) {
					for (var e in g.modules)
						if (g.modules.hasOwnProperty(e) && "function" == typeof g.modules[e].init) {
							var i = g.modules[e].init(this);
							this.initModule(i)
						}
				} else {
					var n = this.get()._modules;
					for (var o in n)
						if (n.hasOwnProperty(o)) {
							var s = _extends({
								_notice: this,
								_options: this.get()
							}, this.get().modules[o]);
							n[o].set(s), "function" == typeof n[o][t] && n[o][t]()
						}
				}
			},
			initModule: function(t) {
				var e = this.get().modules;
				e.hasOwnProperty(t.constructor.key) || (e[t.constructor.key] = {});
				var i = _extends({
					_notice: this,
					_options: this.get()
				}, e[t.constructor.key]);
				t.initModule(i), this.get()._modules[t.constructor.key] = t
			},
			update: function(t) {
				var e = this.get().hide,
					i = this.get().icon;
				this.set(t), this.runModules("update"), this.get().hide ? e || this.queueClose() : this.cancelClose(), this.queuePosition();
				var n = this.get().icon;
				return n !== i && (!0 === n && "fontawesome5" === this.get().icons || "string" == typeof n && n.match(
					/(^| )fa[srlb]($| )/)) && (this.set({
					icon: !1
				}), this.set({
					icon: n
				})), this
			},
			open: function() {
				var t = this,
					e = this.get(),
					i = e._state,
					n = e.hide;
				if ("opening" !== i) {
					if ("open" !== i) {
						this.set({
							_state: "opening",
							_animatingClass: "ui-pnotify-initial-hidden"
						}), this.runModules("beforeOpen");
						var o = this.get().stack;
						if (!this.refs.elem.parentNode || o && o.context && o.context !== this.refs.elem.parentNode)
							if (o && o.context) o.context.appendChild(this.refs.elem);
							else {
								if (!document.body) throw new Error("No context to open this notice in.");
								document.body.appendChild(this.refs.elem)
							} return setTimeout(function() {
							o && (o.animation = !1, g.positionAll(), o.animation = !0), t.animateIn(function() {
								t.get().hide && t.queueClose(), t.set({
									_state: "open"
								}), t.runModules("afterOpen")
							})
						}, 0), this
					}
					n && this.queueClose()
				}
			},
			remove: function(t) {
				return this.close(t)
			},
			close: function(t) {
				var e = this,
					i = this.get()._state;
				if ("closing" !== i && "closed" !== i) {
					this.set({
						_state: "closing",
						_timerHide: !!t
					}), this.runModules("beforeClose");
					var n = this.get()._timer;
					return n && clearTimeout && (clearTimeout(n), this.set({
						_timer: null
					})), this.animateOut(function() {
						if (e.set({
								_state: "closed"
							}), e.runModules("afterClose"), e.queuePosition(), e.get().remove && e.refs.elem.parentNode.removeChild(e.refs
								.elem), e.runModules("beforeDestroy"), e.get().destroy && null !== g.notices) {
							var t = g.notices.indexOf(e); - 1 !== t && g.notices.splice(t, 1)
						}
						e.runModules("afterDestroy")
					}), this
				}
			},
			animateIn: function(a) {
				var c = this;
				this.set({
					_animating: "in"
				});

				function l() {
					c.refs.elem.removeEventListener("transitionend", l);
					var t = c.get(),
						e = t._animTimer,
						i = t._animating,
						n = t._moduleIsNoticeOpen;
					if (e && clearTimeout(e), "in" === i) {
						var o = n;
						if (!o) {
							var s = c.refs.elem.getBoundingClientRect();
							for (var r in s)
								if (0 < s[r]) {
									o = !0;
									break
								}
						}
						o ? (a && a.call(), c.set({
							_animating: !1
						})) : c.set({
							_animTimer: setTimeout(l, 40)
						})
					}
				}
				"fade" === this.get().animation ? (this.refs.elem.addEventListener("transitionend", l), this.set({
					_animatingClass: "ui-pnotify-in"
				}), this.refs.elem.style.opacity, this.set({
					_animatingClass: "ui-pnotify-in ui-pnotify-fade-in"
				}), this.set({
					_animTimer: setTimeout(l, 650)
				})) : (this.set({
					_animatingClass: "ui-pnotify-in"
				}), l())
			},
			animateOut: function(f) {
				var d = this;
				this.set({
					_animating: "out"
				});

				function p() {
					d.refs.elem.removeEventListener("transitionend", p);
					var t = d.get(),
						e = t._animTimer,
						i = t._animating,
						n = t._moduleIsNoticeOpen;
					if (e && clearTimeout(e), "out" === i) {
						var o = n;
						if (!o) {
							var s = d.refs.elem.getBoundingClientRect();
							for (var r in s)
								if (0 < s[r]) {
									o = !0;
									break
								}
						}
						if (d.refs.elem.style.opacity && "0" !== d.refs.elem.style.opacity && o) d.set({
							_animTimer: setTimeout(p, 40)
						});
						else {
							d.set({
								_animatingClass: ""
							});
							var a = d.get().stack;
							if (a && a.overlay) {
								for (var c = !1, l = 0; l < g.notices.length; l++) {
									var u = g.notices[l];
									if (u !== d && u.get().stack === a && "closed" !== u.get()._state) {
										c = !0;
										break
									}
								}
								c || m(a)
							}
							f && f.call(), d.set({
								_animating: !1
							})
						}
					}
				}
				"fade" === this.get().animation ? (this.refs.elem.addEventListener("transitionend", p), this.set({
					_animatingClass: "ui-pnotify-in"
				}), this.set({
					_animTimer: setTimeout(p, 650)
				})) : (this.set({
					_animatingClass: ""
				}), p())
			},
			position: function() {
				var t = this.get().stack,
					e = this.refs.elem;
				if (t) {
					if (t.context || (t.context = document.body), "number" != typeof t.nextpos1 && (t.nextpos1 = t.firstpos1),
						"number" != typeof t.nextpos2 && (t.nextpos2 = t.firstpos2), "number" != typeof t.addpos2 && (t.addpos2 = 0), !
						e.classList.contains("ui-pnotify-in") && !e.classList.contains("ui-pnotify-initial-hidden")) return this;
					var i, n, o;
					t.modal && (t.overlay || (n = t, (o = document.createElement("div")).classList.add("ui-pnotify-modal-overlay"),
						n.context !== document.body && (o.style.height = n.context.scrollHeight + "px", o.style.width = n.context.scrollWidth +
							"px"), o.addEventListener("click", function() {
							n.overlayClose && g.closeStack(n)
						}), n.overlay = o), (i = t).overlay.parentNode !== i.context && (i.overlay = i.context.insertBefore(i.overlay,
						i.context.firstChild))), e.getBoundingClientRect(), t.animation && this.set({
						_moveClass: "ui-pnotify-move"
					});
					var s = t.context === document.body ? window.innerHeight : t.context.scrollHeight,
						r = t.context === document.body ? window.innerWidth : t.context.scrollWidth,
						a = void 0;
					if (t.dir1) {
						a = {
							down: "top",
							up: "bottom",
							left: "right",
							right: "left"
						} [t.dir1];
						var c = void 0;
						switch (t.dir1) {
							case "down":
								c = e.offsetTop;
								break;
							case "up":
								c = s - e.scrollHeight - e.offsetTop;
								break;
							case "left":
								c = r - e.scrollWidth - e.offsetLeft;
								break;
							case "right":
								c = e.offsetLeft
						}
						void 0 === t.firstpos1 && (t.firstpos1 = c, t.nextpos1 = t.firstpos1)
					}
					if (t.dir1 && t.dir2) {
						var l = {
								down: "top",
								up: "bottom",
								left: "right",
								right: "left"
							} [t.dir2],
							u = void 0;
						switch (t.dir2) {
							case "down":
								u = e.offsetTop;
								break;
							case "up":
								u = s - e.scrollHeight - e.offsetTop;
								break;
							case "left":
								u = r - e.scrollWidth - e.offsetLeft;
								break;
							case "right":
								u = e.offsetLeft
						}
						void 0 === t.firstpos2 && (t.firstpos2 = u, t.nextpos2 = t.firstpos2);
						var f = t.nextpos1 + e.offsetHeight + (void 0 === t.spacing1 ? 25 : t.spacing1),
							d = t.nextpos1 + e.offsetWidth + (void 0 === t.spacing1 ? 25 : t.spacing1);
						switch ((("down" === t.dir1 || "up" === t.dir1) && s < f || ("left" === t.dir1 || "right" === t.dir1) && r < d) &&
							(t.nextpos1 = t.firstpos1, t.nextpos2 += t.addpos2 + (void 0 === t.spacing2 ? 25 : t.spacing2), t.addpos2 = 0),
							"number" == typeof t.nextpos2 && (e.style[l] = t.nextpos2 + "px", t.animation || e.style[l]), t.dir2) {
							case "down":
							case "up":
								e.offsetHeight + (parseFloat(e.style.marginTop, 10) || 0) + (parseFloat(e.style.marginBottom, 10) || 0) > t.addpos2 &&
									(t.addpos2 = e.offsetHeight);
								break;
							case "left":
							case "right":
								e.offsetWidth + (parseFloat(e.style.marginLeft, 10) || 0) + (parseFloat(e.style.marginRight, 10) || 0) > t.addpos2 &&
									(t.addpos2 = e.offsetWidth)
						}
					} else if (t.dir1) {
						var p = void 0,
							m = void 0;
						switch (t.dir1) {
							case "down":
							case "up":
								m = ["left", "right"], p = t.context.scrollWidth / 2 - e.offsetWidth / 2;
								break;
							case "left":
							case "right":
								m = ["top", "bottom"], p = s / 2 - e.offsetHeight / 2
						}
						e.style[m[0]] = p + "px", e.style[m[1]] = "auto", t.animation || e.style[m[0]]
					}
					if (t.dir1) switch ("number" == typeof t.nextpos1 && (e.style[a] = t.nextpos1 + "px", t.animation || e.style[a]),
						t.dir1) {
						case "down":
						case "up":
							t.nextpos1 += e.offsetHeight + (void 0 === t.spacing1 ? 25 : t.spacing1);
							break;
						case "left":
						case "right":
							t.nextpos1 += e.offsetWidth + (void 0 === t.spacing1 ? 25 : t.spacing1)
					} else {
						var h = r / 2 - e.offsetWidth / 2,
							y = s / 2 - e.offsetHeight / 2;
						e.style.left = h + "px", e.style.top = y + "px", t.animation || e.style.left
					}
					return this
				}
			},
			queuePosition: function(t) {
				return n && clearTimeout(n), t = t || 10, n = setTimeout(function() {
					g.positionAll()
				}, t), this
			},
			cancelRemove: function() {
				return this.cancelClose()
			},
			cancelClose: function() {
				var t = this.get(),
					e = t._timer,
					i = t._animTimer,
					n = t._state,
					o = t.animation;
				return e && clearTimeout(e), i && clearTimeout(i), "closing" === n && this.set({
					_state: "open",
					_animating: !1,
					_animatingClass: "fade" === o ? "ui-pnotify-in ui-pnotify-fade-in" : "ui-pnotify-in"
				}), this
			},
			queueRemove: function() {
				return this.queueClose()
			},
			queueClose: function() {
				var t = this;
				return this.cancelClose(), this.set({
					_timer: setTimeout(function() {
						return t.close(!0)
					}, isNaN(this.get().delay) ? 0 : this.get().delay)
				}), this
			},
			addModuleClass: function() {
				for (var t = this.get()._moduleClasses, e = arguments.length, i = Array(e), n = 0; n < e; n++) i[n] = arguments[n];
				for (var o = 0; o < i.length; o++) {
					var s = i[o]; - 1 === t.indexOf(s) && t.push(s)
				}
				this.set({
					_moduleClasses: t
				})
			},
			removeModuleClass: function() {
				for (var t = this.get()._moduleClasses, e = arguments.length, i = Array(e), n = 0; n < e; n++) i[n] = arguments[n];
				for (var o = 0; o < i.length; o++) {
					var s = i[o],
						r = t.indexOf(s); - 1 !== r && t.splice(r, 1)
				}
				this.set({
					_moduleClasses: t
				})
			},
			hasModuleClass: function() {
				for (var t = this.get()._moduleClasses, e = arguments.length, i = Array(e), n = 0; n < e; n++) i[n] = arguments[n];
				for (var o = 0; o < i.length; o++) {
					var s = i[o];
					if (-1 === t.indexOf(s)) return !1
				}
				return !0
			}
		};

		function D(t, e, i) {
			var n = Object.create(t);
			return n.module = e[i], n
		}

		function F(t, e, i) {
			var n = Object.create(t);
			return n.module = e[i], n
		}

		function V(e, t, i) {
			var n, o, s = i.module;

			function r() {
				return {
					root: e.root,
					store: e.store
				}
			}
			if (s) var a = new s(r());

			function c(t) {
				e.initModule(t.module)
			}
			return a && a.on("init", c), {
				key: t,
				first: null,
				c: function() {
					n = d(), a && a._fragment.c(), o = d(), this.first = n
				},
				m: function(t, e) {
					et(t, n, e), a && a._mount(t, e), et(t, o, e)
				},
				p: function(t, e) {
					s !== (s = e.module) && (a && a.destroy(), s ? ((a = new s(r()))._fragment.c(), a._mount(o.parentNode, o), a.on(
						"init", c)) : a = null)
				},
				d: function(t) {
					t && (ot(n), ot(o)), a && a.destroy(t)
				}
			}
		}

		function $(i, t) {
			var n, o, s, r;
			return {
				c: function() {
					n = Q("div"), (o = Q("span")).className = s = !0 === t.icon ? t._icons[t.type] ? t._icons[t.type] : "" : t.icon,
						n.className = r = "ui-pnotify-icon " + (t._styles.icon ? t._styles.icon : "")
				},
				m: function(t, e) {
					et(t, n, e), U(n, o), i.refs.iconContainer = n
				},
				p: function(t, e) {
					(t.icon || t._icons || t.type) && s !== (s = !0 === e.icon ? e._icons[e.type] ? e._icons[e.type] : "" : e.icon) &&
						(o.className = s), t._styles && r !== (r = "ui-pnotify-icon " + (e._styles.icon ? e._styles.icon : "")) && (n.className =
							r)
				},
				d: function(t) {
					t && ot(n), i.refs.iconContainer === n && (i.refs.iconContainer = null)
				}
			}
		}

		function G(i, t) {
			var n, o;

			function s(t) {
				return t.titleTrusted ? l : c
			}
			var r = s(t),
				a = r(i, t);
			return {
				c: function() {
					n = Q("h4"), a.c(), n.className = o = "ui-pnotify-title " + (t._styles.title ? t._styles.title : "")
				},
				m: function(t, e) {
					et(t, n, e), a.m(n, null), i.refs.titleContainer = n
				},
				p: function(t, e) {
					r === (r = s(e)) && a ? a.p(t, e) : (a.d(1), (a = r(i, e)).c(), a.m(n, null)), t._styles && o !== (o =
						"ui-pnotify-title " + (e._styles.title ? e._styles.title : "")) && (n.className = o)
				},
				d: function(t) {
					t && ot(n), a.d(), i.refs.titleContainer === n && (i.refs.titleContainer = null)
				}
			}
		}

		function c(t, e) {
			var i;
			return {
				c: function() {
					i = Y(e.title)
				},
				m: function(t, e) {
					et(t, i, e)
				},
				p: function(t, e) {
					t.title && s(i, e.title)
				},
				d: function(t) {
					t && ot(i)
				}
			}
		}

		function l(t, i) {
			var n, o;
			return {
				c: function() {
					n = Q("noscript"), o = Q("noscript")
				},
				m: function(t, e) {
					et(t, n, e), n.insertAdjacentHTML("afterend", i.title), et(t, o, e)
				},
				p: function(t, e) {
					t.title && (r(n, o), n.insertAdjacentHTML("afterend", e.title))
				},
				d: function(t) {
					t && (r(n, o), ot(n), ot(o))
				}
			}
		}

		function J(i, t) {
			var n, o;

			function s(t) {
				return t.textTrusted ? f : u
			}
			var r = s(t),
				a = r(i, t);
			return {
				c: function() {
					n = Q("div"), a.c(), n.className = o = "ui-pnotify-text " + (t._styles.text ? t._styles.text : ""), Z(n, "role",
						"alert")
				},
				m: function(t, e) {
					et(t, n, e), a.m(n, null), i.refs.textContainer = n
				},
				p: function(t, e) {
					r === (r = s(e)) && a ? a.p(t, e) : (a.d(1), (a = r(i, e)).c(), a.m(n, null)), t._styles && o !== (o =
						"ui-pnotify-text " + (e._styles.text ? e._styles.text : "")) && (n.className = o)
				},
				d: function(t) {
					t && ot(n), a.d(), i.refs.textContainer === n && (i.refs.textContainer = null)
				}
			}
		}

		function u(t, e) {
			var i;
			return {
				c: function() {
					i = Y(e.text)
				},
				m: function(t, e) {
					et(t, i, e)
				},
				p: function(t, e) {
					t.text && s(i, e.text)
				},
				d: function(t) {
					t && ot(i)
				}
			}
		}

		function f(t, i) {
			var n, o;
			return {
				c: function() {
					n = Q("noscript"), o = Q("noscript")
				},
				m: function(t, e) {
					et(t, n, e), n.insertAdjacentHTML("afterend", i.text), et(t, o, e)
				},
				p: function(t, e) {
					t.text && (r(n, o), n.insertAdjacentHTML("afterend", e.text))
				},
				d: function(t) {
					t && (r(n, o), ot(n), ot(o))
				}
			}
		}

		function K(e, t, i) {
			var n, o, s = i.module;

			function r() {
				return {
					root: e.root,
					store: e.store
				}
			}
			if (s) var a = new s(r());

			function c(t) {
				e.initModule(t.module)
			}
			return a && a.on("init", c), {
				key: t,
				first: null,
				c: function() {
					n = d(), a && a._fragment.c(), o = d(), this.first = n
				},
				m: function(t, e) {
					et(t, n, e), a && a._mount(t, e), et(t, o, e)
				},
				p: function(t, e) {
					s !== (s = e.module) && (a && a.destroy(), s ? ((a = new s(r()))._fragment.c(), a._mount(o.parentNode, o), a.on(
						"init", c)) : a = null)
				},
				d: function(t) {
					t && (ot(n), ot(o)), a && a.destroy(t)
				}
			}
		}

		function o(t) {
			var e, i, n, o, s = this;
			i = t, (e = this)._handlers = X(), e._slots = X(), e._bind = i._bind, e._staged = {}, e.options = i, e.root = i.root ||
				e, e.store = i.store || e.root.store, i.root || (e._beforecreate = [], e._oncreate = [], e._aftercreate = []), this
				.refs = {}, this._state = a(((n = _extends({
					_state: "initializing",
					_timer: null,
					_animTimer: null,
					_animating: !1,
					_animatingClass: "",
					_moveClass: "",
					_timerHide: !1,
					_moduleClasses: [],
					_moduleIsNoticeOpen: !1,
					_modules: {},
					_modulesPrependContainer: g.modulesPrependContainer,
					_modulesAppendContainer: g.modulesAppendContainer
				}, g.defaults)).modules = _extends({}, g.defaults.modules), n), t.data), this._recompute({
					styling: 1,
					icons: 1,
					width: 1,
					minHeight: 1
				}, this._state), this._intro = !0, document.getElementById("svelte-1eldsjg-style") || ((o = Q("style")).id =
					"svelte-1eldsjg-style", o.textContent =
					'body > .ui-pnotify{position:fixed;z-index:100040}body > .ui-pnotify.ui-pnotify-modal{z-index:100042}.ui-pnotify{position:absolute;height:auto;z-index:1;display:none}.ui-pnotify.ui-pnotify-modal{z-index:3}.ui-pnotify.ui-pnotify-in{display:block}.ui-pnotify.ui-pnotify-initial-hidden{display:block;visibility:hidden}.ui-pnotify.ui-pnotify-move{transition:left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-slow{transition:opacity .4s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-slow.ui-pnotify.ui-pnotify-move{transition:opacity .4s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-normal{transition:opacity .25s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-normal.ui-pnotify.ui-pnotify-move{transition:opacity .25s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-fast{transition:opacity .1s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-fast.ui-pnotify.ui-pnotify-move{transition:opacity .1s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-in{opacity:1}.ui-pnotify .ui-pnotify-shadow{-webkit-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);-moz-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1)}.ui-pnotify-container{background-position:0 0;padding:.8em;height:100%;margin:0}.ui-pnotify-container:after{content:" ";visibility:hidden;display:block;height:0;clear:both}.ui-pnotify-container.ui-pnotify-sharp{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ui-pnotify-title{display:block;white-space:pre-line;margin-bottom:.4em;margin-top:0}.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-title,.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-text{margin-left:24px}[dir=rtl] .ui-pnotify.ui-pnotify-with-icon .ui-pnotify-title,[dir=rtl] .ui-pnotify.ui-pnotify-with-icon .ui-pnotify-text{margin-right:24px;margin-left:0}.ui-pnotify-title-bs4{font-size:1.2rem}.ui-pnotify-text{display:block;white-space:pre-line}.ui-pnotify-icon,.ui-pnotify-icon span{display:block;float:left}[dir=rtl] .ui-pnotify-icon,[dir=rtl] .ui-pnotify-icon span{float:right}.ui-pnotify-icon-bs3 > span{position:relative;top:2px}.ui-pnotify-icon-bs4 > span{position:relative;top:4px}.ui-pnotify-modal-overlay{background-color:rgba(0, 0, 0, .4);top:0;left:0;position:absolute;height:100%;width:100%;z-index:2}body > .ui-pnotify-modal-overlay{position:fixed;z-index:100041}',
					U(document.head, o)), this._fragment = function(o, t) {
					for (var s, r, a, c, l, u, f, d, p, m = [], h = X(), y = [], g = X(), e = t._modulesPrependContainer, _ = function(
							t) {
							return t.module.key
						}, i = 0; i < e.length; i += 1) {
						var n = F(t, e, i),
							v = _(n);
						m[i] = h[v] = V(o, v, n)
					}

					function b(t) {
						return t.module.key
					}
					var x = !1 !== t.icon && $(o, t),
						C = !1 !== t.title && G(o, t),
						w = !1 !== t.text && J(o, t),
						k = t._modulesAppendContainer;
					for (i = 0; i < k.length; i += 1) {
						var T = D(t, k, i),
							S = b(T);
						y[i] = g[S] = K(o, S, T)
					}

					function N(t) {
						o.fire("mouseover", t)
					}

					function H(t) {
						o.fire("mouseout", t)
					}

					function M(t) {
						o.fire("mouseenter", t)
					}

					function O(t) {
						o.fire("mouseleave", t)
					}

					function A(t) {
						o.fire("mousemove", t)
					}

					function L(t) {
						o.fire("mousedown", t)
					}

					function j(t) {
						o.fire("mouseup", t)
					}

					function E(t) {
						o.fire("click", t)
					}

					function P(t) {
						o.fire("dblclick", t)
					}

					function W(t) {
						o.fire("focus", t)
					}

					function z(t) {
						o.fire("blur", t)
					}

					function R(t) {
						o.fire("touchstart", t)
					}

					function q(t) {
						o.fire("touchmove", t)
					}

					function B(t) {
						o.fire("touchend", t)
					}

					function I(t) {
						o.fire("touchcancel", t)
					}
					return {
						c: function() {
							for (s = Q("div"), r = Q("div"), i = 0; i < m.length; i += 1) m[i].c();
							for (a = Y("\n    "), x && x.c(), c = Y("\n    "), C && C.c(), l = Y("\n    "), w && w.c(), u = Y("\n    "), i =
								0; i < y.length; i += 1) y[i].c();
							r.className = f = "\n        ui-pnotify-container\n        " + (t._styles.container ? t._styles.container : "") +
								"\n        " + (t._styles[t.type] ? t._styles[t.type] : "") + "\n        " + t.cornerClass + "\n        " + (t
									.shadow ? "ui-pnotify-shadow" : "") + "\n      ", r.style.cssText = d = t._widthStyle + " " + t._minHeightStyle,
								Z(r, "role", "alert"), tt(s, "mouseover", N), tt(s, "mouseout", H), tt(s, "mouseenter", M), tt(s, "mouseleave",
									O), tt(s, "mousemove", A), tt(s, "mousedown", L), tt(s, "mouseup", j), tt(s, "click", E), tt(s, "dblclick", P),
								tt(s, "focus", W), tt(s, "blur", z), tt(s, "touchstart", R), tt(s, "touchmove", q), tt(s, "touchend", B), tt(s,
									"touchcancel", I), s.className = p = "\n      ui-pnotify\n      " + (!1 !== t.icon ? "ui-pnotify-with-icon" :
									"") + "\n      " + (t._styles.element ? t._styles.element : "") + "\n      " + t.addClass + "\n      " + t._animatingClass +
								"\n      " + t._moveClass + "\n      " + ("fade" === t.animation ? "ui-pnotify-fade-" + t.animateSpeed : "") +
								"\n      " + (t.stack && t.stack.modal ? "ui-pnotify-modal" : "") + "\n      " + t._moduleClasses.join(" ") +
								"\n    ", Z(s, "aria-live", "assertive"), Z(s, "role", "alertdialog"), Z(s, "ui-pnotify", !0)
						},
						m: function(t, e) {
							for (et(t, s, e), U(s, r), i = 0; i < m.length; i += 1) m[i].m(r, null);
							for (U(r, a), x && x.m(r, null), U(r, c), C && C.m(r, null), U(r, l), w && w.m(r, null), U(r, u), i = 0; i < y.length; i +=
								1) y[i].m(r, null);
							o.refs.container = r, o.refs.elem = s
						},
						p: function(t, e) {
							var i = e._modulesPrependContainer;
							m = it(m, o, t, _, 1, e, i, h, r, nt, V, "m", a, F), !1 !== e.icon ? x ? x.p(t, e) : ((x = $(o, e)).c(), x.m(r,
								c)) : x && (x.d(1), x = null), !1 !== e.title ? C ? C.p(t, e) : ((C = G(o, e)).c(), C.m(r, l)) : C && (C.d(1),
								C = null), !1 !== e.text ? w ? w.p(t, e) : ((w = J(o, e)).c(), w.m(r, u)) : w && (w.d(1), w = null);
							var n = e._modulesAppendContainer;
							y = it(y, o, t, b, 1, e, n, g, r, nt, K, "m", null, D), (t._styles || t.type || t.cornerClass || t.shadow) && f !==
								(f = "\n        ui-pnotify-container\n        " + (e._styles.container ? e._styles.container : "") +
									"\n        " + (e._styles[e.type] ? e._styles[e.type] : "") + "\n        " + e.cornerClass + "\n        " + (
										e.shadow ? "ui-pnotify-shadow" : "") + "\n      ") && (r.className = f), (t._widthStyle || t._minHeightStyle) &&
								d !== (d = e._widthStyle + " " + e._minHeightStyle) && (r.style.cssText = d), (t.icon || t._styles || t.addClass ||
									t._animatingClass || t._moveClass || t.animation || t.animateSpeed || t.stack || t._moduleClasses) && p !==
								(p = "\n      ui-pnotify\n      " + (!1 !== e.icon ? "ui-pnotify-with-icon" : "") + "\n      " + (e._styles.element ?
										e._styles.element : "") + "\n      " + e.addClass + "\n      " + e._animatingClass + "\n      " + e._moveClass +
									"\n      " + ("fade" === e.animation ? "ui-pnotify-fade-" + e.animateSpeed : "") + "\n      " + (e.stack && e
										.stack.modal ? "ui-pnotify-modal" : "") + "\n      " + e._moduleClasses.join(" ") + "\n    ") && (s.className =
									p)
						},
						d: function(t) {
							for (t && ot(s), i = 0; i < m.length; i += 1) m[i].d();
							for (x && x.d(), C && C.d(), w && w.d(), i = 0; i < y.length; i += 1) y[i].d();
							o.refs.container === r && (o.refs.container = null), st(s, "mouseover", N), st(s, "mouseout", H), st(s,
									"mouseenter", M), st(s, "mouseleave", O), st(s, "mousemove", A), st(s, "mousedown", L), st(s, "mouseup", j),
								st(s, "click", E), st(s, "dblclick", P), st(s, "focus", W), st(s, "blur", z), st(s, "touchstart", R), st(s,
									"touchmove", q), st(s, "touchend", B), st(s, "touchcancel", I), o.refs.elem === s && (o.refs.elem = null)
						}
					}
				}(this, this._state), this.root._oncreate.push(function() {
					(function() {
						var e = this;
						this.on("mouseenter", function(t) {
							if (e.get().mouseReset && "out" === e.get()._animating) {
								if (!e.get()._timerHide) return;
								e.cancelClose()
							}
							e.get().hide && e.get().mouseReset && e.cancelClose()
						}), this.on("mouseleave", function(t) {
							e.get().hide && e.get().mouseReset && "out" !== e.get()._animating && e.queueClose(), g.positionAll()
						});
						var t = this.get().stack;
						t && "top" === t.push ? g.notices.splice(0, 0, this) : g.notices.push(this), this.runModules("init"), this.set({
							_state: "closed"
						}), this.get().autoDisplay && this.open()
					}).call(s), s.fire("update", {
						changed: function(t, e) {
							for (var i in e) t[i] = 1;
							return t
						}({}, s._state),
						current: s._state
					})
				}), t.target && (this._fragment.c(), this._mount(t.target, t.anchor), p(this))
		}

		function Q(t) {
			return document.createElement(t)
		}

		function U(t, e) {
			t.appendChild(e)
		}

		function X() {
			return Object.create(null)
		}

		function Y(t) {
			return document.createTextNode(t)
		}

		function Z(t, e, i) {
			null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
		}

		function tt(t, e, i, n) {
			t.addEventListener(e, i, n)
		}

		function et(t, e, i) {
			t.insertBefore(e, i)
		}

		function it(t, e, i, n, o, s, r, a, c, l, u, f, d, p) {
			for (var m = t.length, h = r.length, y = m, g = {}; y--;) g[t[y].key] = y;
			var _ = [],
				v = {},
				b = {};
			for (y = h; y--;) {
				var x = p(s, r, y),
					C = n(x),
					w = a[C];
				w ? o && w.p(i, x) : (w = u(e, C, x)).c(), _[y] = v[C] = w, C in g && (b[C] = Math.abs(y - g[C]))
			}
			var k = {},
				T = {};

			function S(t) {
				t[f](c, d), a[t.key] = t, d = t.first, h--
			}
			for (; m && h;) {
				var N = _[h - 1],
					H = t[m - 1],
					M = N.key,
					O = H.key;
				N === H ? (d = N.first, m--, h--) : v[O] ? !a[M] || k[M] ? S(N) : T[O] ? m-- : b[M] > b[O] ? (T[M] = !0, S(N)) : (k[
					O] = !0, m--) : (l(H, a), m--)
			}
			for (; m--;) {
				v[(H = t[m]).key] || l(H, a)
			}
			for (; h;) S(_[h - 1]);
			return _
		}

		function nt(t, e) {
			t.d(1), e[t.key] = null
		}

		function ot(t) {
			t.parentNode.removeChild(t)
		}

		function st(t, e, i, n) {
			t.removeEventListener(e, i, n)
		}

		function d() {
			return document.createComment("")
		}

		function s(t, e) {
			t.data = "" + e
		}

		function r(t, e) {
			for (; t.nextSibling && t.nextSibling !== e;) t.parentNode.removeChild(t.nextSibling)
		}

		function a(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function p(t) {
			t._lock = !0, h(t._beforecreate), h(t._oncreate), h(t._aftercreate), t._lock = !1
		}

		function h(t) {
			for (; t && t.length;) t.shift()()
		}

		function y() {}
		return a(o.prototype, {
			destroy: function(t) {
				this.destroy = y, this.fire("destroy"), this.set = y, this._fragment.d(!1 !== t), this._fragment = null, this._state = {}
			},
			get: function() {
				return this._state
			},
			fire: function(t, e) {
				var i = t in this._handlers && this._handlers[t].slice();
				if (!i) return;
				for (var n = 0; n < i.length; n += 1) {
					var o = i[n];
					if (!o.__calling) try {
						o.__calling = !0, o.call(this, e)
					} finally {
						o.__calling = !1
					}
				}
			},
			on: function(t, e) {
				var i = this._handlers[t] || (this._handlers[t] = []);
				return i.push(e), {
					cancel: function() {
						var t = i.indexOf(e);
						~t && i.splice(t, 1)
					}
				}
			},
			set: function(t) {
				if (this._set(a({}, t)), this.root._lock) return;
				p(this.root)
			},
			_set: function(t) {
				var e = this._state,
					i = {},
					n = !1;
				for (var o in t = a(this._staged, t), this._staged = {}, t) this._differs(t[o], e[o]) && (i[o] = n = !0);
				if (!n) return;
				this._state = a(a({}, e), t), this._recompute(i, this._state), this._bind && this._bind(i, this._state);
				this._fragment && (this.fire("state", {
					changed: i,
					current: this._state,
					previous: e
				}), this._fragment.p(i, this._state), this.fire("update", {
					changed: i,
					current: this._state,
					previous: e
				}))
			},
			_stage: function(t) {
				a(this._staged, t)
			},
			_mount: function(t, e) {
				this._fragment[this._fragment.i ? "i" : "m"](t, e || null)
			},
			_differs: function(t, e) {
				return t != t ? e == e : t !== e || t && "object" === (void 0 === t ? "undefined" : _typeof(t)) || "function" ==
					typeof t
			}
		}), a(o.prototype, i), o.prototype._recompute = function(t, e) {
			var i, n, o, s;
			t.styling && this._differs(e._styles, e._styles = "object" === (void 0 === (i = e.styling) ? "undefined" : _typeof(
					i)) ? i : g.styling[i]) && (t._styles = !0), t.icons && this._differs(e._icons, e._icons = "object" === (void 0 ===
					(n = e.icons) ? "undefined" : _typeof(n)) ? n : g.icons[n]) && (t._icons = !0), t.width && this._differs(e._widthStyle,
					e._widthStyle = "string" == typeof(o = e.width) ? "width: " + o + ";" : "") && (t._widthStyle = !0), t.minHeight &&
				this._differs(e._minHeightStyle, e._minHeightStyle = "string" == typeof(s = e.minHeight) ? "min-height: " + s +
					";" : "") && (t._minHeightStyle = !0)
		}, (g = o).VERSION = "4.0.1", g.defaultStack = {
			dir1: "down",
			dir2: "left",
			firstpos1: 25,
			firstpos2: 25,
			spacing1: 36,
			spacing2: 36,
			push: "bottom",
			context: window && document.body
		}, g.defaults = {
			title: !1,
			titleTrusted: !1,
			text: !1,
			textTrusted: !1,
			styling: "brighttheme",
			icons: "brighttheme",
			addClass: "",
			cornerClass: "",
			autoDisplay: !0,
			width: "360px",
			minHeight: "16px",
			type: "notice",
			icon: !0,
			animation: "fade",
			animateSpeed: "normal",
			shadow: !0,
			hide: !0,
			delay: 8e3,
			mouseReset: !0,
			remove: !0,
			destroy: !0,
			stack: g.defaultStack,
			modules: {}
		}, g.notices = [], g.modules = {}, g.modulesPrependContainer = [], g.modulesAppendContainer = [], g.alert = function(
			t) {
			return new g(e(t))
		}, g.notice = function(t) {
			return new g(e(t, "notice"))
		}, g.info = function(t) {
			return new g(e(t, "info"))
		}, g.success = function(t) {
			return new g(e(t, "success"))
		}, g.error = function(t) {
			return new g(e(t, "error"))
		}, g.removeAll = function() {
			g.closeAll()
		}, g.closeAll = function() {
			for (var t = 0; t < g.notices.length; t++) g.notices[t].close && g.notices[t].close(!1)
		}, g.removeStack = function(t) {
			g.closeStack(t)
		}, g.closeStack = function(t) {
			if (!1 !== t)
				for (var e = 0; e < g.notices.length; e++) g.notices[e].close && g.notices[e].get().stack === t && g.notices[e].close(
					!1)
		}, g.positionAll = function() {
			if (n && clearTimeout(n), n = null, 0 < g.notices.length) {
				for (var t = 0; t < g.notices.length; t++) {
					var e = g.notices[t].get().stack;
					e && (e.overlay && m(e), e.nextpos1 = e.firstpos1, e.nextpos2 = e.firstpos2, e.addpos2 = 0)
				}
				for (var i = 0; i < g.notices.length; i++) g.notices[i].position()
			} else delete g.defaultStack.nextpos1, delete g.defaultStack.nextpos2
		}, g.styling = {
			brighttheme: {
				container: "brighttheme",
				notice: "brighttheme-notice",
				info: "brighttheme-info",
				success: "brighttheme-success",
				error: "brighttheme-error"
			},
			bootstrap3: {
				container: "alert",
				notice: "alert-warning",
				info: "alert-info",
				success: "alert-success",
				error: "alert-danger",
				icon: "ui-pnotify-icon-bs3"
			},
			bootstrap4: {
				container: "alert",
				notice: "alert-warning",
				info: "alert-info",
				success: "alert-success",
				error: "alert-danger",
				icon: "ui-pnotify-icon-bs4",
				title: "ui-pnotify-title-bs4"
			}
		}, g.icons = {
			brighttheme: {
				notice: "brighttheme-icon-notice",
				info: "brighttheme-icon-info",
				success: "brighttheme-icon-success",
				error: "brighttheme-icon-error"
			},
			bootstrap3: {
				notice: "glyphicon glyphicon-exclamation-sign",
				info: "glyphicon glyphicon-info-sign",
				success: "glyphicon glyphicon-ok-sign",
				error: "glyphicon glyphicon-warning-sign"
			},
			fontawesome4: {
				notice: "fa fa-exclamation-circle",
				info: "fa fa-info-circle",
				success: "fa fa-check-circle",
				error: "fa fa-exclamation-triangle"
			},
			fontawesome5: {
				notice: "fas fa-exclamation-circle",
				info: "fas fa-info-circle",
				success: "fas fa-check-circle",
				error: "fas fa-exclamation-triangle"
			}
		}, window && document.body ? t() : document.addEventListener("DOMContentLoaded", t), o
	}();
//# sourceMappingURL=PNotify.js.map
