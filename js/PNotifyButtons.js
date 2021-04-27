var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
	},
	_extends = Object.assign || function(t) {
		for (var e = 1; e < arguments.length; e++) {
			var s = arguments[e];
			for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n])
		}
		return t
	},
	PNotifyButtons = function(o) {
		"use strict";
		o = o && o.__esModule ? o.default : o;
		var t;

		function r(s, t) {
			var n, i, o = t._showCloser && c(s, t),
				r = t._showSticker && l(s, t);
			return {
				c: function() {
					var t;
					o && o.c(), t = "\n", n = document.createTextNode(t), r && r.c(), i = document.createComment("")
				},
				m: function(t, e) {
					o && o.m(t, e), f(t, n, e), r && r.m(t, e), f(t, i, e)
				},
				p: function(t, e) {
					e._showCloser ? o ? o.p(t, e) : ((o = c(s, e)).c(), o.m(n.parentNode, n)) : o && (o.d(1), o = null), e._showSticker ?
						r ? r.p(t, e) : ((r = l(s, e)).c(), r.m(i.parentNode, i)) : r && (r.d(1), r = null)
				},
				d: function(t) {
					o && o.d(t), t && _(n), r && r.d(t), t && _(i)
				}
			}
		}

		function c(e, t) {
			var s, n, i, o;

			function r(t) {
				e.handleCloserClick()
			}
			return {
				c: function() {
					s = a("div"), (n = a("span")).className = t._closerClass + " svelte-1yjle82", h(s, "click", r), s.className = i =
						"ui-pnotify-closer " + (!t.closerHover || t._mouseIsIn ? "" : "ui-pnotify-buttons-hidden") + " svelte-1yjle82",
						p(s, "role", "button"), s.tabIndex = "0", s.title = o = t.labels.close
				},
				m: function(t, e) {
					f(t, s, e), u(s, n)
				},
				p: function(t, e) {
					t._closerClass && (n.className = e._closerClass + " svelte-1yjle82"), (t.closerHover || t._mouseIsIn) && i !== (i =
							"ui-pnotify-closer " + (!e.closerHover || e._mouseIsIn ? "" : "ui-pnotify-buttons-hidden") + " svelte-1yjle82") &&
						(s.className = i), t.labels && o !== (o = e.labels.close) && (s.title = o)
				},
				d: function(t) {
					t && _(s), d(s, "click", r)
				}
			}
		}

		function l(e, t) {
			var s, n, i, o, r, c;

			function l(t) {
				e.handleStickerClick()
			}
			return {
				c: function() {
					s = a("div"), (n = a("span")).className = i = (t._options.hide ? t._pinUpClass : t._pinDownClass) +
						" svelte-1yjle82", h(s, "click", l), s.className = o = "ui-pnotify-sticker " + (!t.stickerHover || t._mouseIsIn ?
							"" : "ui-pnotify-buttons-hidden") + " svelte-1yjle82", p(s, "role", "button"), p(s, "aria-pressed", r = t._options
							.hide), s.tabIndex = "0", s.title = c = t._options.hide ? t.labels.stick : t.labels.unstick
				},
				m: function(t, e) {
					f(t, s, e), u(s, n)
				},
				p: function(t, e) {
					(t._options || t._pinUpClass || t._pinDownClass) && i !== (i = (e._options.hide ? e._pinUpClass : e._pinDownClass) +
							" svelte-1yjle82") && (n.className = i), (t.stickerHover || t._mouseIsIn) && o !== (o = "ui-pnotify-sticker " +
							(!e.stickerHover || e._mouseIsIn ? "" : "ui-pnotify-buttons-hidden") + " svelte-1yjle82") && (s.className = o),
						t._options && r !== (r = e._options.hide) && p(s, "aria-pressed", r), (t._options || t.labels) && c !== (c = e._options
							.hide ? e.labels.stick : e.labels.unstick) && (s.title = c)
				},
				d: function(t) {
					t && _(s), d(s, "click", l)
				}
			}
		}

		function e(t) {
			var e, s, n, i = this;
			s = t, (e = this)._handlers = v(), e._slots = v(), e._bind = s._bind, e._staged = {}, e.options = s, e.root = s.root ||
				e, e.store = s.store || e.root.store, s.root || (e._beforecreate = [], e._oncreate = [], e._aftercreate = []), this
				._state = m(_extends({
					_notice: null,
					_options: {},
					_mouseIsIn: !1
				}, o.modules.Buttons.defaults), t.data), this._recompute({
					sticker: 1,
					_notice: 1,
					closer: 1,
					classes: 1
				}, this._state), this._intro = !0, document.getElementById("svelte-1yjle82-style") || ((n = a("style")).id =
					"svelte-1yjle82-style", n.textContent =
					".ui-pnotify-closer.svelte-1yjle82,.ui-pnotify-sticker.svelte-1yjle82{float:right;margin-left:.5em;cursor:pointer}[dir=rtl] .ui-pnotify-closer.svelte-1yjle82,[dir=rtl] .ui-pnotify-sticker.svelte-1yjle82{float:left;margin-right:.5em;margin-left:0}.ui-pnotify-buttons-hidden.svelte-1yjle82{visibility:hidden}",
					u(document.head, n)), this._fragment = r(this, this._state), this.root._oncreate.push(function() {
					(function() {
						this.fire("init", {
							module: this
						})
					}).call(i), i.fire("update", {
						changed: function(t, e) {
							for (var s in e) t[s] = 1;
							return t
						}({}, i._state),
						current: i._state
					})
				}), t.target && (this._fragment.c(), this._mount(t.target, t.anchor), y(this))
		}

		function a(t) {
			return document.createElement(t)
		}

		function u(t, e) {
			t.appendChild(e)
		}

		function f(t, e, s) {
			t.insertBefore(e, s)
		}

		function _(t) {
			t.parentNode.removeChild(t)
		}

		function h(t, e, s, n) {
			t.addEventListener(e, s, n)
		}

		function p(t, e, s) {
			null == s ? t.removeAttribute(e) : t.setAttribute(e, s)
		}

		function d(t, e, s, n) {
			t.removeEventListener(e, s, n)
		}

		function m(t, e) {
			for (var s in e) t[s] = e[s];
			return t
		}

		function y(t) {
			t._lock = !0, s(t._beforecreate), s(t._oncreate), s(t._aftercreate), t._lock = !1
		}

		function v() {
			return Object.create(null)
		}

		function s(t) {
			for (; t && t.length;) t.shift()()
		}

		function n() {}
		return m(e.prototype, {
			destroy: function(t) {
				this.destroy = n, this.fire("destroy"), this.set = n, this._fragment.d(!1 !== t), this._fragment = null, this._state = {}
			},
			get: function() {
				return this._state
			},
			fire: function(t, e) {
				var s = t in this._handlers && this._handlers[t].slice();
				if (!s) return;
				for (var n = 0; n < s.length; n += 1) {
					var i = s[n];
					if (!i.__calling) try {
						i.__calling = !0, i.call(this, e)
					} finally {
						i.__calling = !1
					}
				}
			},
			on: function(t, e) {
				var s = this._handlers[t] || (this._handlers[t] = []);
				return s.push(e), {
					cancel: function() {
						var t = s.indexOf(e);
						~t && s.splice(t, 1)
					}
				}
			},
			set: function(t) {
				if (this._set(m({}, t)), this.root._lock) return;
				y(this.root)
			},
			_set: function(t) {
				var e = this._state,
					s = {},
					n = !1;
				for (var i in t = m(this._staged, t), this._staged = {}, t) this._differs(t[i], e[i]) && (s[i] = n = !0);
				if (!n) return;
				this._state = m(m({}, e), t), this._recompute(s, this._state), this._bind && this._bind(s, this._state);
				this._fragment && (this.fire("state", {
					changed: s,
					current: this._state,
					previous: e
				}), this._fragment.p(s, this._state), this.fire("update", {
					changed: s,
					current: this._state,
					previous: e
				}))
			},
			_stage: function(t) {
				m(this._staged, t)
			},
			_mount: function(t, e) {
				this._fragment[this._fragment.i ? "i" : "m"](t, e || null)
			},
			_differs: function(t, e) {
				return t != t ? e == e : t !== e || t && "object" === (void 0 === t ? "undefined" : _typeof(t)) || "function" ==
					typeof t
			}
		}), m(e.prototype, {
			initModule: function(t) {
				var i = this;
				this.set(t);
				var e = this.get()._notice;
				e.on("mouseenter", function() {
					return i.set({
						_mouseIsIn: !0
					})
				}), e.on("mouseleave", function() {
					return i.set({
						_mouseIsIn: !1
					})
				}), e.on("state", function(t) {
					var e = t.changed,
						s = t.current;
					if (e.hide && i.get().sticker) {
						var n = s.hide ? i.get().classes.pinUp : i.get().classes.pinDown;
						("fontawesome5" === i.get()._notice.get().icons || "string" == typeof n && n.match(/(^| )fa[srlb]($| )/)) &&
						(i.set({
							sticker: !1
						}), i.set({
							sticker: !0
						}))
					}
				})
			},
			handleStickerClick: function() {
				var t = this.get()._notice;
				t.update({
					hide: !t.get().hide
				})
			},
			handleCloserClick: function() {
				this.get()._notice.close(!1), this.set({
					_mouseIsIn: !1
				})
			}
		}), e.prototype._recompute = function(t, e) {
			var s, n, i, o, r, c, l, a, u, f, _, h, p, d, m;
			(t.sticker || t._notice) && this._differs(e._showSticker, e._showSticker = (n = (s = e).sticker, i = s._notice, n &&
				!(i && i.refs.elem.classList.contains("nonblock")))) && (t._showSticker = !0), (t.closer || t._notice) && this._differs(
				e._showCloser, e._showCloser = (r = (o = e).closer, c = o._notice, r && !(c && c.refs.elem.classList.contains(
					"nonblock")))) && (t._showCloser = !0), (t.classes || t._notice) && (this._differs(e._pinUpClass, e._pinUpClass =
				(d = (p = e).classes, (m = p._notice) ? null === d.pinUp ? m.get()._icons.pinUp : d.pinUp : "")) && (t._pinUpClass = !
				0), this._differs(e._pinDownClass, e._pinDownClass = (_ = (f = e).classes, (h = f._notice) ? null === _.pinDown ?
				h.get()._icons.pinDown : _.pinDown : "")) && (t._pinDownClass = !0), this._differs(e._closerClass, e._closerClass =
				(a = (l = e).classes, (u = l._notice) ? null === a.closer ? u.get()._icons.closer : a.closer : "")) && (t._closerClass = !
				0))
		}, (t = e).key = "Buttons", t.defaults = {
			closer: !0,
			closerHover: !0,
			sticker: !0,
			stickerHover: !0,
			labels: {
				close: "Close",
				stick: "Stick",
				unstick: "Unstick"
			},
			classes: {
				closer: null,
				pinUp: null,
				pinDown: null
			}
		}, o.modules.Buttons = t, o.modulesPrependContainer.push(t), _extends(o.icons.brighttheme, {
			closer: "brighttheme-icon-closer",
			pinUp: "brighttheme-icon-sticker",
			pinDown: "brighttheme-icon-sticker brighttheme-icon-stuck"
		}), _extends(o.icons.bootstrap3, {
			closer: "glyphicon glyphicon-remove",
			pinUp: "glyphicon glyphicon-pause",
			pinDown: "glyphicon glyphicon-play"
		}), _extends(o.icons.fontawesome4, {
			closer: "fa fa-times",
			pinUp: "fa fa-pause",
			pinDown: "fa fa-play"
		}), _extends(o.icons.fontawesome5, {
			closer: "fas fa-times",
			pinUp: "fas fa-pause",
			pinDown: "fas fa-play"
		}), e
	}(PNotify);
//# sourceMappingURL=PNotifyButtons.js.map
