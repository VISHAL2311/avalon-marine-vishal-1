function LiveSpellInstance($setup) {
    livespell.spellingProviders.push(this), this.Fields = "ALL", this.IgnoreAllCaps = !0, this.IgnoreNumeric = !0, this.CaseSensitive = !0, this.CheckGrammar = !0, this.Language = "English (International)", this.MultiDictionary = !1, this.UserInterfaceLanguage = "en", this.CSSTheme = "classic", this.SettingsFile = "default-settings", this.ServerModel = "", this.Delay = 888, this.WindowMode = "modal", this.Strict = !0, this.ShowSummaryScreen = !0, this.ShowMeanings = !0, this.FormToSubmit = "", this.MeaningProvider = "http://www.thefreedictionary.com/{word}", this.UndoLimit = 20, this.HiddenButtons = "", this.CustomOpener = null, this.CustomOpenerClose = null, this.RightClickOnly = !livespell.test.iPhone(), this.ShowLangInContextMenu = !0, this.BypassAuthentication = !1, this.UserSpellingInitiated = !1, this.UserSpellingComplete = !1, this.AddWordsToDictionary = "USER", this.SetUserInterfaceLanguage = function(l) {
        this.UserInterfaceLanguage = l, livespell.lang.load(l)
    }, this.isUniPacked = !1, this.isNetSpell = !1, this.FieldType = function(id) {
        var oField = document.getElementById(id),
            TYPE = oField.nodeName.toUpperCase();
        return "INPUT" == TYPE || "TEXTAREA" == TYPE ? "value" : "IFRAME" == TYPE ? "iframe" : "innerHTML"
    }, this.docUpdate = function(docs) {
        var fieldIds = this.arrCleanFields();
        this.onUpdateFields(fieldIds);
        for (var editedfields = new Array, i = 0; i < fieldIds.length; i++) {
            var id = fieldIds[i],
                t = this.FieldType(id),
                oField = document.getElementById(id);
            if (JavaScriptSpellCheck && oField.MessageHolder && JavaScriptSpellCheck.LiveValidateMech(oField), docs[i] !== oField[t]) {
                if (editedfields[editedfields.length] = id, "iframe" === t) {
                    var oDoc = livespell.getIframeDocumentBasic(oField),
                        oBody = oDoc.body;
                    oBody.innerHTML != docs[i] && (oBody.innerHTML = docs[i])
                } else if (livespell.insitu.proxyDOM(id)) oField[t] = docs[i];
                else {
                    var val = docs[i];
                    oField[t] = val
                }
                "value" === t && livespell.insitu.proxyDOM(id) && (livespell.insitu.updateProxy(id), livespell.insitu.checkNow(id, this.id()))
            }
        }
        if (editedfields.length > 0) {
            this.onChangeFields(editedfields);
            for (var i = 0; i < editedfields.length; i++) livespell.context.notifyBaseFieldOnChange(editedfields[i])
        }
    }, this.docRePaint = function() {
        for (var fieldIds = this.arrCleanFields(), i = 0; i < fieldIds.length; i++) {
            var id = fieldIds[i],
                t = this.FieldType(id);
            document.getElementById(id);
            "value" === t && livespell.insitu.proxyDOM(id) && (livespell.insitu.updateProxy(id), livespell.insitu.checkNow(id, this.id()))
        }
    }, this.docFocus = function(index) {
        for (var fieldIds = this.arrCleanFields(), i = 0; i < fieldIds.length; i++) {
            var oField = document.getElementById(fieldIds[i]);
            oField.spellcheckproxy && (oField = oField.spellcheckproxy), i == index ? (oField.className = "" + oField.className + " livespell_focus_glow", oField.scrollIntoView(!1)) : oField.className = oField.className.replace(/livespell_focus_glow/g, "")
        }
    }, this.docPickup = function() {
        for (var fieldIds = this.arrCleanFields(), docs = [], i = 0; i < fieldIds.length; i++) {
            var val, id = fieldIds[i],
                oField = document.getElementById(id),
                t = this.FieldType(id);
            if ("iframe" === t) {
                var oDoc = livespell.getIframeDocumentBasic(oField);
                val = oDoc.body.innerHTML
            } else val = oField[t];
            docs[i] = val
        }
        return docs
    }, this.CheckInSitu = function() {
        this.UserSpellingInitiated = !0, livespell.context.renderCss(this.CSSTheme), livespell.insitu.checkNow(this.arrCleanFields(), this.id())
    }, this.FieldModified = function() {
        try {
            this.spellWindowObject.isStillOpen() && (this.spellWindowObject.dialog_win.hasFocus() || this.spellWindowObject.resumeAfterEditing())
        } catch (e) {}
    }, this.setFieldListeners = function() {
        for (var fieldIds = this.arrCleanFields(), i = 0; i < fieldIds.length; i++) {
            var id = fieldIds[i],
                oField = document.getElementById(id);
            if (!oField["livespell__listener_" + this.id()]) {
                oField["livespell__listener_" + this.id()] = !0;
                var ty = this,
                    fn = function() {
                        ty.FieldModified()
                    },
                    t = this.FieldType(id);
                "value" === t && livespell.insitu.proxyDOM(id) ? livespell.events.add(livespell.insitu.proxyDOM(id), "blur", fn, !1) : livespell.events.add(oField, "change", fn, !1)
            }
        }
    }, this.setFormVals = function(CaseSensitive, IgnoreAllCaps, IgnoreNumeric, CheckGrammar) {
        this.CaseSensitive = CaseSensitive, this.IgnoreAllCaps = IgnoreAllCaps, this.IgnoreNumeric = IgnoreNumeric, this.CheckGrammar = CheckGrammar, this.isUniPacked && $Spelling && ($Spelling.CaseSensitive = CaseSensitive, $Spelling.IgnoreAllCaps = IgnoreAllCaps, $Spelling.IgnoreNumbers = IgnoreNumeric, $Spelling.CheckGrammar = CheckGrammar)
    }, this.CheckInWindow = function() {
        var Dwidth = 460,
            Dheight = 290;
        livespell.test.chrome() && (Dwidth += 5, Dheight += 5), this.UserSpellingInitiated = !0, this.SetUserInterfaceLanguage(this.UserInterfaceLanguage), this.onDialogOpen();
        var webkit = livespell.test.webkit(),
            canmodal = !(webkit || this.BypassAuthentication && livespell.test.IE());
        livespell.test.IE() && document.domain != document.location.hostname && (canmodal = !1);
        var wm = this.WindowMode.toLowerCase();
        if (this.CustomOpener) return this.CustomOpener(this.url());
        if ("jquery.ui" == wm.substr(0, 9) && (jQuery, !0) && ($.ui, !0)) {
            var dialogClass = null;
            this.WindowMode.length > 10 && (dialogClass = this.WindowMode.substr(10)), $("#livespell_jquery_ui_modal_frame").length || $("body").append("<div id='livespell_jquery_ui_modal' style='display:overflow:hidden'><iframe width='" + Dwidth + "' height='" + Dheight + "' scrolling='no' marginwidth='0' marginheight='0' frameborder=0 id='livespell_jquery_ui_modal_frame' src='about:blank'></iframe></div>");
            var f = this,
                u = this.url(),
                ttl = livespell.lang.fetch(this.id(), "WIN_TITLE"),
                settings = {
                    autoOpen: !0,
                    modal: !0,
                    closeOnEscape: !0,
                    title: ttl,
                    width: 495,
                    height: 355,
                    open: function(ev, ui) {
                        f.onDialogOpen(), $("#livespell_jquery_ui_modal_frame").attr("src", u)
                    },
                    close: function() {
                        f.onDialogClose()
                    }
                };
            return dialogClass && (settings.dialogClass = dialogClass), void $("#livespell_jquery_ui_modal").dialog(settings)
        }
        if ("fancybox" == wm && (jQuery, !0)) {
            var uri = this.url(),
                ttl = livespell.lang.fetch(this.id(), "WIN_TITLE");
            $.fancybox({
                width: Dwidth,
                height: Dheight,
                type: "iframe",
                href: uri,
                title: ttl
            });
            var f = this,
                fn = function() {
                    f.onDialogOpen()
                };
            return void setTimeout(fn, 150)
        }
        if ("modalbox" == wm && "undefined" != typeof Modalbox) {
            var HTMLIframe = "<iframe width='" + Dwidth + "' height='" + Dheight + "' scrolling='no' marginwidth='0' marginheight='0'  frameborder='0' src='" + this.url() + "'  ></iframe>";
            Modalbox.show(HTMLIframe, {
                title: livespell.lang.fetch(this.id(), "WIN_TITLE"),
                overlayDuration: .2,
                slideDownDuration: .2,
                slideUpDuration: .2
            });
            var f = this,
                fn = function() {
                    f.onDialogOpen()
                };
            return void setTimeout(fn, 189)
        }
        livespell.test.BuggyAjaxInFireFox() ? Dheight = 325 : livespell.test.IE6() && (Dheight = 333), "modal" == wm && window.showModalDialog && canmodal ? window.showModalDialog(this.url(), window, "center:1;dialogheight:" + Dheight + "px;dialogwidth:" + Dwidth + "px;resizable:0;scrollbars:0;scroll:0;location:0") : "modeless" == wm && window.showModelessDialog && canmodal ? window.showModelessDialog(this.url(), window, "center:1;dialogheight:" + Dheight + "px;dialogwidth:" + Dwidth + "px;resizable:0;scrollbars:0;scroll:0;location:0") : window.open(this.url(), "spelldialog", "width=" + Dwidth + ",height=" + Dheight + ",scrollbars=no,resizable=no;centerscreen=yes;location=no;tolbar=no;menubar=no", !1)
    }, this.url = function() {
        var strout = livespell.installPath + "dialog.html";
        return strout += "?instance=" + this.id()
    }, this.m_ayt = [], this.m_ayt_timeout = null, this.m_AYTAjaxInervalHandler = function() {
        var fieldIds = this.m_ayt;
        if (fieldIds.length) {
            for (var i = 0; i < fieldIds.length; i++) {
                var id = fieldIds[i],
                    oChild = E$(id);
                if (oChild) {
                    var found = !1;
                    oChild.isCurrentAjaxImplementation !== !0 && (oChild.isCurrentAjaxImplementation = !0, found = !0)
                }
            }
            found && this.ActivateAsYouType()
        }
    }, this.setAYTAjaxInervalHandler = function() {
        clearInterval(this.m_ayt_timeout);
        var t = this,
            f = function() {
                t.m_AYTAjaxInervalHandler()
            };
        setInterval(f, 1e3)
    }, this.ActivateAsYouTypeOnLoad = function() {
        var activeElement = null;
        document.activeElement && (activeElement = document.activeElement), livespell.context.renderCss(this.CSSTheme);
        var o = this,
            fn = function() {
                var a = o,
                    b = function() {
                        a.ActivateAsYouType(activeElement)
                    };
                setTimeout(b, livespell.onLoadDelay)
            };
        livespell.events.add(window, "load", fn, !1)
    }, this.ActivateAsYouType = function(activeElement) {
        if (this.isUniPacked && (this.Fields = $Spelling.findf(this.Fields)), !livespell.test.browserNoAYT()) {
            this.SetUserInterfaceLanguage(this.UserInterfaceLanguage), livespell.context.renderCss(this.CSSTheme);
            var fieldIds = this.arrCleanFields();
            this.AsYouTypeIsActive = !0;
            for (var i = 0; i < fieldIds.length; i++) {
                var id = fieldIds[i];
                if ("textarea" == E$(id).nodeName.toLowerCase() || "input" == E$(id).nodeName.toLowerCase() && "text" == E$(id).type) {
                    var oField = livespell.insitu.createProxy(id);
                    if (!oField) return;
                    activeElement && activeElement == E$(id) && oField.focus(), oField.setAttribute("autocheck", !0), oField.autocheck = !0, oField.autocheckProvider = this.id();
                    var oChild = E$(id);
                    oChild.isCurrentAjaxImplementation = !0, this.m_ayt = livespell.array.safepush(this.m_ayt, id.replace("livespell____", ""))
                }
            }
            this.CheckInSitu(), this.setAYTAjaxInervalHandler()
        }
    }, this.AsYouTypeIsActive = !1, this.PauseAsYouType = function() {
        fieldIds = this.arrCleanFields();
        for (var i = 0; i < fieldIds.length; i++) {
            var id = fieldIds[i];
            livespell.insitu.destroyProxy(id), this.AsYouTypeIsActive = !1
        }
    }, this.getFieldWordListMech = function() {
        var strDoc = this.docPickup().join(" "),
            tokens = livespell.str.tokenize(strDoc),
            wordlist = [],
            wasfine = !0;
        livespell.cache.spell[this.Language] || (livespell.cache.spell[this.Language] = []);
        for (var i = 0; i < tokens.length; i++)
            if (livespell.test.isword(tokens[i]) === !0) {
                token = tokens[i].toString() + "";
                var mwm = /[0-9]/gi.test(token) && this.IgnoreNumeric || token.toUpperCase() == token && this.IgnoreAllCaps || livespell.test.spelling(token, this.Language);
                !mwm == !0 && (wasfine = !1), "undefined" == typeof mwm && (token === token.toUpperCase() || /[0-9]/gi.test(token) || this.IgnoreNumeric && livespell.test.num(token) || (wordlist = livespell.array.safepush(wordlist, token)))
            }
        return result = {}, result.wasfine = wasfine, result.wordlist = wordlist, result
    }, this.AjaxValidateFields = function() {
        var fResults = this.getFieldWordListMech(),
            wasfine = fResults.wasfine,
            wordlist = fResults.wordlist;
        return wordlist.length <= 0 ? this.onValidateMech(wasfine) : void livespell.ajax.send("APIVALIDATE", wordlist.join(livespell.str.chr(1)), this.Language, this.CaseSensitive ? "CASESENSITVE" : "", this.id())
    }, this.BinSpellCheckFields = function() {
        var fResults = this.getFieldWordListMech(),
            wasfine = fResults.wasfine,
            wordlist = fResults.wordlist;
        return wordlist.length <= 0 ? wasfine : livespell.ajax.send_sync("APIVALIDATE", wordlist.join(livespell.str.chr(1)), this.Language, this.CaseSensitive ? "CASESENSITVE" : "", this.id())
    }, this.ListDictionaries = function() {
        return livespell.ajax.send_sync("LISTDICTS", "", "", "", this.id())
    }, this.AjaxDidYouMean = function(input) {
        livespell.ajax.send("APIDYM", input, this.Language, "", this.id())
    }, this.AjaxSpellCheck = function(input, makeSuggestions) {
        makeSuggestions = makeSuggestions !== !1;
        for (var wordstocheck = input.join ? input : [input], allFound = !0, i = 0; i < wordstocheck.length && allFound; i++) {
            var word = wordstocheck[i];
            allFound = allFound && livespell.test.fullyCached(word, this.Language, makeSuggestions)
        }
        return allFound ? void this.onSpellCheckFromCache(input, makeSuggestions) : void(input.join ? (input = input.join(livespell.str.chr(1)), livespell.ajax.send("APISPELLARRAY", input, this.Language, makeSuggestions ? "" : "NOSUGGEST", this.id())) : livespell.ajax.send("APISPELL", input, this.Language, makeSuggestions ? "" : "NOSUGGEST", this.id()))
    }, this.SpellCheckSuggest = function(input) {
        for (var wordstocheck = input.join ? input : [input], allFound = !0, out = [], i = 0; i < wordstocheck.length && allFound; i++) {
            var word = wordstocheck[i];
            allFound = allFound && livespell.test.fullyCached(word, this.Language, !0)
        }
        if (allFound) {
            for (var i = 0; i < wordstocheck.length && allFound; i++) {
                var word = wordstocheck[i];
                out[i] = livespell.cache.suggestions[this.Language][word]
            }
            return input.join ? out : out[0]
        }
        return livespell.ajax.needsInstantSuggestion = !0, input.join ? (input = input.join(livespell.str.chr(1)), livespell.ajax.send_sync("APISPELLARRAY", input, this.Language, "", this.id())) : livespell.ajax.send_sync("APISPELL", input, this.Language, "", this.id())
    }, this.BinSpellCheck = function(input) {
        for (var wordstocheck = input.join ? input : [input], allFound = !0, i = 0; i < wordstocheck.length && allFound; i++) {
            var word = wordstocheck[i];
            allFound = allFound && livespell.test.fullyCached(word, this.Language, !1)
        }
        if (allFound) {
            for (var ok = !0, i = 0; i < input.length; i++) ok = ok && livespell.test.spelling(word, this.Language);
            return ok
        }
        return livespell.ajax.needsInstantSuggestion = !1, input.join ? (input = input.join(livespell.str.chr(1)), livespell.ajax.send_sync("APISPELLARRAY", input, this.Language, "NOSUGGEST", this.id())) : livespell.ajax.send_sync("APISPELL", input, this.Language, "NOSUGGEST", this.id())
    }, this.BinSpellCheckArray = this.BinSpellCheck, this.AjaxSpellCheckArray = function(input, makeSuggestions) {
        this.AjaxSpellCheck(input, makeSuggestions)
    }, this.onSpellCheck = function(input, spelling, reason, suggestions) {}, this.onDidYouMean = function(suggestion, origional) {}, this.onValidateMech = function(result) {
        this.onValidate(this.Fields, result)
    }, this.onSpellCheckFromCache = function(input, makeSuggestions) {
        var isArray = input.join;
        isArray || (input = [input]);
        for (var outInput = input, outSpellingOk = [], outSuggestions = [], outReason = [], i = 0; i < input.length; i++) {
            var word = input[i];
            outSpellingOk[i] = livespell.test.spelling(word, this.Language), outReason[i] = outSpellingOk[i] ? "-" : livespell.cache.reason[this.Language][word], outSuggestions[i] = makeSuggestions ? livespell.cache.suggestions[this.Language][word] : []
        }
        isArray ? this.onSpellCheck(outInput, outSpellingOk, outReason, outSuggestions) : this.onSpellCheck(outInput[0], outSpellingOk[0], outReason[0], outSuggestions[0])
    }, this.arrCleanFields = function() {
        var F = this.Fields,
            isString = F.split;
        isString && (F = F.replace(/\s/g, "").split(","));
        for (var out = new Array, j = 0; j < F.length; j++) {
            var AF, i, oid = F[j],
                found = !1;
            if ("ALL" === oid.toUpperCase() || "ENABLED" === oid.toUpperCase())
                for (found = !0, AF = document.body.getElementsByTagName("*"), i = 0; i < AF.length; i++) {
                    var nn = AF[i].nodeName.toLowerCase();
                    "textarea" == nn && livespell.insitu.filterTextAreas(AF[i]) && ("ALL" !== oid.toUpperCase() && (AF[i].disabled || AF[i].readOnly) || (out = livespell.array.safepush(out, AF[i]), found = !0)), "input" == nn && livespell.insitu.filterTextInputs(AF[i]) && ("ALL" !== oid.toUpperCase() && (AF[i].disabled || AF[i].readOnly) || (out = livespell.array.safepush(out, AF[i]), found = !0)), "div" != nn && "iframe" != nn || livespell.insitu.filerEditors(AF[i]) && ("ALL" !== oid.toUpperCase() && (AF[i].disabled || AF[i].readOnly) || (out = livespell.array.safepush(out, AF[i]), found = !0))
                }
            if ("TEXTAREAS" === oid.toUpperCase())
                for (found = !0, AF = document.getElementsByTagName("textarea"), i = 0; i < AF.length; i++) livespell.insitu.filterTextAreas(AF[i]) && (found = !0, out = livespell.array.safepush(out, AF[i]));
            else if ("TEXTINPUTS" === oid.toUpperCase())
                for (found = !0, AF = document.getElementsByTagName("input"), i = 0; i < AF.length; i++) livespell.insitu.filterTextInputs(AF[i]) && (found = !0, out = livespell.array.safepush(out, AF[i]));
            else if ("EDITORS" === oid.toUpperCase()) {
                for (found = !0, AF = document.getElementsByTagName("iframe"), i = 0; i < AF.length; i++) livespell.insitu.filerEditors(AF[i]) && (out = livespell.array.safepush(out, AF[i]), found = !0);
                for (AF = document.getElementsByTagName("div"), i = 0; i < AF.length; i++) livespell.insitu.filerEditors(AF[i]) && (out = livespell.array.safepush(out, AF[i]), found = !0)
            } else if (2 === oid.toUpperCase().split(":").length && "IFRAME" == oid.toUpperCase().split(":")[0]) {
                var frameindex = Number(oid.split(":")[1]);
                frameindex < document.getElementsByTagName("iframe").length && (myFrame = document.getElementsByTagName("iframe")[frameindex], myFrame.id || (myFrame.id = "livespell_IFRAME_id_" + frameindex), out = livespell.array.safepush(out, myFrame.id), found = !0)
            } else if (E$(oid)) out = livespell.array.safepush(out, E$(oid)), found = !0;
            else if (document.querySelectorAll)
                for (var q = document.querySelectorAll(oid), iq = 0; iq < q.length; q++) found = !0, q[iq].id || (q[iq].id = "livespell_css_selected_id_" + i), found = !0, out = livespell.array.safepush(out, q[iq]);
            else if ("." == oid.charAt(0) && !E$(oid)) {
                var cname = oid.substring(1),
                    AF = livespell.getElementsByClass(cname);
                for (i = 0; i < AF.length; i++) {
                    var oFieldByClass = AF[i];
                    oFieldByClass.id || (oFieldByClass.id = "livespell_CLASSSECTOR_id_" + cname + "_" + i), out = livespell.array.safepush(out, oFieldByClass.id), found = !0
                }
            }
            if (!found)
                if (document.getElementById(oid)) {
                    var liveChilren = livespell.insitu.findLiveChildrenInDOMElement(document.getElementById(oid));
                    out = liveChilren.length ? livespell.array.safepush(out, liveChilren) : livespell.array.safepush(out, oid)
                } else oid.id ? out = livespell.array.safepush(out, oid) : oid.name ? (oid.id = "livespell____" + oid.name, out = livespell.array.safepush(out, "livespell____" + oid.name)) : 1 == document.getElementsByName(oid).length && (document.getElementsByName(oid)[0].id = "livespell____" + oid, out = livespell.array.safepush(out, "livespell____" + oid))
        }
        for (var i = 0; i < out.length; i++) out[i] = out[i].id;
        return out
    }, this.id = function() {
        for (var i = 0; i < livespell.spellingProviders.length; i++)
            if (this === livespell.spellingProviders[i]) return i
    }, this.recieveWindowSpell = function() {
        try {
            this.spellWindowObject.nextSuggestionChunk()
        } catch (e) {}
    }, this.recieveWindowSetup = function() {
        this.spellWindowObject.ui.setupLanguageMenu(), this.spellWindowObject.nextSuggestionChunk(), this.spellWindowObject.moveNext()
    }, this.recieveContextSpell = function() {
        for (var myFields = this.arrCleanFields(), i = 0; i < myFields.length; i++) livespell.insitu.renderProxy(myFields[i], this.id())
    }, this.SpellButton = function(insitu, text, Class, style) {
        insitu || (insitu = !1), text || (text = "Spell Check"), Class || (Class = ""), style || (style = "");
        var holder = document.createElement("span"),
            o = document.createElement("input");
        return o.setAttribute("type", "button"), o.type = "button", o.setAttribute("value", text), o.value = text, o.setAttribute("Class", Class), o.className = Class, o.setAttribute("style", style), insitu ? o.setAttribute("onclick", " livespell.spellingProviders[" + this.id() + "].CheckInSitu()") : o.setAttribute("onclick", " livespell.spellingProviders[" + this.id() + "].CheckInWindow()"), holder.appendChild(o), holder.innerHTML
    }, this.SpellLink = function(insitu, text, Class, style) {
        insitu || (insitu = !1), text || (text = "Spell Check"), Class || (Class = ""), style || (style = "");
        var holder = document.createElement("span"),
            o = document.createElement("a");
        return o.innerHTML = text, insitu ? o.setAttribute("href", "javascript:livespell.spellingProviders[" + this.id() + "].CheckInSitu()") : o.setAttribute("href", "javascript:livespell.spellingProviders[" + this.id() + "].CheckInWindow()"), o.setAttribute("Class", Class), o.className = Class, o.setAttribute("style", style), holder.appendChild(o), holder.innerHTML
    }, this.SpellImageButton = function(insitu, image, rollover, text, Class, style) {
        insitu || (insitu = !1), text || (text = "Spell Check"), Class || (Class = ""), image || (image = "themes/buttons/spellicon.gif", rollover = "themes/buttons/spelliconover.gif"), style || (style = "");
        var holder = document.createElement("span"),
            o = document.createElement("img");
        return o.setAttribute("alt", text), o.alt = text, o.setAttribute("src", livespell.installPath + image), o.src = livespell.installPath + image, o.setAttribute("border", "0"), o.setAttribute("onmouseover", "this.src='" + livespell.installPath + rollover + "'"), rollover && o.setAttribute("onmouseout", "this.src='" + livespell.installPath + image + "'"), insitu ? o.setAttribute("onclick", "livespell.spellingProviders[" + this.id() + "].CheckInSitu()") : o.setAttribute("onclick", "livespell.spellingProviders[" + this.id() + "].CheckInWindow()"), o.setAttribute("Class", Class), o.className = Class, o.setAttribute("style", "cursor:pointer; " + style), holder.appendChild(o), holder.innerHTML
    }, this.DrawSpellImageButton = function(insitu, image, rollover, text, Class, style) {
        livespell.context.renderCss(this.CSSTheme), document.write(this.SpellImageButton(insitu, image, rollover, text, Class, style))
    }, this.DrawSpellLink = function(insitu, text, Class, style) {
        livespell.context.renderCss(this.CSSTheme), document.writeln(this.SpellLink(insitu, text, Class, style))
    }, this.DrawSpellButton = function(insitu, text, Class, style) {
        livespell.context.renderCss(this.CSSTheme), document.writeln(this.SpellButton(insitu, text, Class, style))
    }, this.__SubmitForm = function() {
        if (this.FormToSubmit.length) {
            try {
                E$(this.FormToSubmit).submit()
            } catch (e) {}
        }
    }, this.onDialogCompleteNET = function() {
        "" != this.UniqueIDNetPostBack && window.__doPostBack && window.__doPostBack(this.UniqueIDNetPostBack, this.UniqueIDNetPostBack)
    }, this.UniqueIDNetPostBack = "", this.onDialogOpen = function() {}, this.onDialogComplete = function() {}, this.onDialogCancel = function() {}, this.onDialogClose = function() {}, this.onChangeLanguage = function(Language) {}, this.onIgnore = function(Word) {}, this.onIgnoreAll = function(Word) {}, this.onChangeWord = function(From, To) {}, this.onChangeAll = function(From, To) {}, this.onLearnWord = function(Word) {}, this.onLearnAutoCorrect = function(From, To) {}, this.onUpdateFields = function(arrFieldIds) {}, this.onChangeFields = function(changedFields) {}
}

function JavaScriptSpellCheckObj($setup) {
    this.DefaultDictionary = "English (International)", this.UserInterfaceTranslation = "en", this.ShowStatisticsScreen = !1, this.SubmitFormById = "", this.Theme = "modern", this.CaseSensitive = !0, this.CheckGrammar = !0, this.IgnoreAllCaps = !0, this.IgnoreNumbers = !0, this.ShowThesaurus = !0, this.ShowLanguagesInContextMenu = !1, this.ServerModel = "auto", this.PopUpStyle = "modal", this.isUniPacked = !0, this.AddWordsToDictionary = "user", this.SpellCheckInWindow = function(Fields) {
        var o = this.createInstance(Fields, arguments);
        return o.CheckInWindow(), o
    }, this.SpellCheckAsYouType = function(Fields) {
        var o = this.createInstance(Fields, arguments);
        return document.readyState && "complete" !== document.readyState.toLowerCase() ? (o.Fields = Fields, o.ActivateAsYouTypeOnLoad()) : o.ActivateAsYouType(), o
    }, this.ManageFields = function(Fields) {
        return Fields
    }, this.$validators = [], this.ajaxinstance = null, this.initAJAX = function() {
        if (this.ajaxinstance) var o = this.manageAjaxInstance();
        else {
            var o = this.createInstance();
            this.ajaxinstance = o
        }
        return o
    }, this.AjaxSpellCheck = function(word) {
        var o = this.initAJAX();
        return setTimeout(function() {
            o.AjaxSpellCheck(word, !0)
        }, 1), o
    }, this.BinSpellCheck = function(input) {
        var o = this.initAJAX();
        return o.BinSpellCheck(input)
    }, this.BinSpellCheckArray = this.BinSpellCheck, this.SpellCheckSuggest = function(input) {
        var o = this.initAJAX();
        return o.SpellCheckSuggest(input)
    }, this.BinSpellCheckFields = function(Fields) {
        var o = this.createInstance(Fields, arguments);
        return result = o.BinSpellCheckFields(), result
    }, this.ListDictionaries = function() {
        var o = this.initAJAX();
        return result = o.ListDictionaries(), result
    }, this.AjaxDidYouMean = function(string) {
        if (this.ajaxinstance) var o = this.manageAjaxInstance();
        else {
            var o = this.createInstance();
            this.ajaxinstance = o
        }
        return setTimeout(function() {
            o.AjaxDidYouMean(string)
        }, 1), this.ajaxinstance = o, o
    }, this.AjaxValidateFields = function(Fields) {
        var o = this.createInstance(Fields, arguments);
        return setTimeout(function() {
            o.AjaxValidateFields()
        }, 1), o
    }, this.LiveFormValidation = function(Fields, MessageHolder) {
        var j = this,
            f = Fields,
            m = MessageHolder,
            fn = function() {
                j.LiveFormValidation(f, m)
            };
        if (document.readyState && "complete" !== document.readyState.toLowerCase()) return void livespell.events.add(window, "load", fn, !1);
        var fn = function() {
            JavaScriptSpellCheck.LiveValidate(f, m)
        };
        livespell.events.add(window, "load", fn, !1), f = this.findf(Fields), ff = f.split(",");
        for (var i = 0; i < ff.length; i++) {
            var oneField = ff[i],
                oField = document.getElementById(oneField);
            oField && (oField.setAttribute("isValidated", !0), oField.MessageHolder = MessageHolder, "string" == typeof MessageHolder && (MessageHolder = document.getElementById(MessageHolder)), MessageHolder && MessageHolder.id && (MessageHolder.style.display = "none"), livespell.events.add(oField, "keyup", this.validatortypoclick, !1), JavaScriptSpellCheck.$validators = livespell.array.safepush(JavaScriptSpellCheck.$validators, oField), JavaScriptSpellCheck.LiveValidateMech(oField))
        }
    }, this.LiveFormValidationCheck = function() {
        for (var myValid = !0, i = 0; i < JavaScriptSpellCheck.$validators.length; i++) {
            var vld = JavaScriptSpellCheck.$validators[i].getAttribute("isValidated");
            if ("false" === vld || vld === !1) return !1
        }
        return myValid
    }, this.validatortypoclick = function(event) {
        try {
            event || (event = window.event)
        } catch (e) {}
        var ch8r = event.keyCode;
        if (!(ch8r > 15 && ch8r < 32 || ch8r > 32 && ch8r < 41) || 127 == ch8r) {
            var me = event.srcElement ? event.srcElement : this;
            clearTimeout(livespell.cache.checkTimeoutUni), livespell.cache.checkTimeoutUni = setTimeout(function() {
                JavaScriptSpellCheck.LiveValidateMech(me)
            }, 567)
        }
    }, this.LiveValidateMech4Proxy = function(oField, result) {
        var MessageHolder = oField.MessageHolder;
        return "string" == typeof MessageHolder && (MessageHolder = document.getElementById(MessageHolder)), !(!MessageHolder || !MessageHolder.id) && (MessageHolder.style.display = result ? "none" : "inherit", void oField.setAttribute("isValidated", result))
    }, this.LiveValidateMech = function(oField) {
        var o = this.createInstance(oField);
        setTimeout(function() {
            o.AjaxValidateFields()
        }, 1), o.onValidate = function(Fields, result) {
            var oneField = Fields.split(",")[0],
                oField = document.getElementById(oneField),
                MessageHolder = oField.MessageHolder;
            return "string" == typeof MessageHolder && (MessageHolder = document.getElementById(MessageHolder)), !(!MessageHolder || !MessageHolder.id) && (MessageHolder.style.display = result ? "none" : "inherit", void oField.setAttribute("isValidated", result))
        }
    }, this.vhcounter = 0, this.findcounter = 0, this.findf = function(Fields, PassedArgs) {
        if (!Fields) return "ALL";
        var inputs = [],
            outputs = [];
        PassedArgs ? inputs = PassedArgs : (inputs = [], inputs[0] = Fields);
        for (var i = 0; i < inputs.length; i++) {
            var ff, f = inputs[i];
            f.push ? ff = f : f.split ? ff = f.split(",") : (ff = [], ff[0] = f);
            for (var j = 0; j < ff.length; j++) {
                var finderItem = ff[j],
                    oObject = null,
                    binWasMacro = !1;
                if ("string" == typeof Fields) {
                    var td = Fields,
                        tdcase = Fields.replace(/\s\s*$/, ""),
                        td = Fields.toUpperCase().replace(/\s\s*$/, "");
                    "ALL" !== td && "EDITORS" !== td && "TEXTAREAS" !== td && "TEXTINPUTS" !== td || (outputs.push(td), binWasMacro = !0), "." === td.charAt(0) && (outputs.push(tdcase), binWasMacro = !0)
                }
                if (!binWasMacro)
                    if (finderItem.nodeName) oObject = finderItem;
                    else if (finderItem = finderItem.toString().replace(/^\s\s*/, ""), document.getElementById(finderItem)) oObject = document.getElementById(finderItem);
                else {
                    var byName = document.getElementsByName(finderItem);
                    byName && byName.length > 0 && (oObject = byName[0])
                }
                oObject && (oObject.id || (oObject.id = "jsspellcheck__element__" + this.findcounter, this.findcounter++), outputs.push(oObject.id))
            }
        }
        return outputs.join(",")
    }, this.manageAjaxInstance = function() {
        var o = this.ajaxinstance;
        return o.isUniPacked = !0, o.Language = this.DefaultDictionary, o.UserInterfaceLanguage = this.UserInterfaceTranslation, o.IgnoreAllCaps = this.IgnoreAllCaps, o.IgnoreNumeric = this.IgnoreNumbers, o.CSSTheme = this.Theme, o.WindowMode = this.PopUpStyle, o.FormToSubmit = this.SubmitFormById, o.ShowSummaryScreen = this.ShowStatisticsScreen, o.ShowMeanings = this.ShowThesaurus, o.ServerModel = this.ServerModel, o
    }, this.createInstance = function(Fields, PassedArgs) {
        var o = new LiveSpellInstance;
        return o.isUniPacked = !0, o.Language = this.DefaultDictionary, o.UserInterfaceLanguage = this.UserInterfaceTranslation, Fields = this.findf(Fields, PassedArgs), o.Fields = this.ManageFields(Fields), o.IgnoreAllCaps = this.IgnoreAllCaps, o.IgnoreNumeric = this.IgnoreNumbers, o.WindowMode = this.PopUpStyle, o.CSSTheme = this.Theme, o.FormToSubmit = this.SubmitFormById, o.ShowSummaryScreen = this.ShowStatisticsScreen, o.ShowMeanings = this.ShowThesaurus, o.AddWordsToDictionary = this.AddWordsToDictionary, o.ShowMeanings = this.ShowThesaurus, o.ShowLangInContextMenu = this.ShowLanguagesInContextMenu, o.ServerModel = this.ServerModel, o.CaseSensitive = this.CaseSensitive, o.CheckGrammar = this.CheckGrammar, o
    }
}

function E$(id) {
    return document.getElementById(id)
}

function setup___livespell() {
    for (var tags = document.getElementsByTagName("script"), foundTag = null, i = tags.length - 1; i >= 0 && !foundTag; i--) {
        var thisTag = tags[i];
        try {
            thisTag.getAttribute("src").toLowerCase().indexOf("include.js") > -1 && (thisTag.getAttribute("src").toLowerCase().indexOf("aspnetspell") > -1 || thisTag.getAttribute("src").toLowerCase().indexOf("spellcheck/") > -1) && (foundTag = thisTag)
        } catch (e) {}
    }
    for (var i = tags.length - 1; i >= 0 && !foundTag; i--) {
        var thisTag = tags[i];
        try {
            thisTag.getAttribute("src").toLowerCase().indexOf("include.js") > -1 && (foundTag = thisTag)
        } catch (e) {}
    }
    if (foundTag || (foundTag = tags[tags.length - 1]), "undefined" != typeof window.livespell___installPath) path = livespell___installPath;
    else try {
        var path = foundTag.getAttribute("src").replace(/[\/]?include\.js/gi, "") + "/"
    } catch (e) {
        alert("SpellCheck include.js file not found:\n\n  Try setting livespell___installPath = '/MySpellCheckIncludePath/'; in your documet header.")
    }
    path = path.split("?")[0], "/" !== path.substring(path.length - 1) && (path += "/"), "/" == path && (path = ""), "/" != path && "" != path && path && !livespell.installPath ? (livespell.installPath = path, livespell.lang.load("en")) : livespell.lang.load("en");
    var inJS = livespell.installPath.toLowerCase().indexOf("javascriptspellcheck") > -1 || (document.location.href + "").toLowerCase().indexOf("javascriptspellcheck") > -1;
    if (inJS) {
        var fn = function() {
            livespell.context.renderCss($Spelling.Theme)
        };
        livespell.events.add(window, "load", fn, !1)
    }
    livespell.test.IE5() || livespell.test.IE6() || livespell.test.IE7() || livespell.test.IE8() ? setInterval(livespell.heartbeat, 1200) : setInterval(livespell.heartbeat, 500), window.getComputedStyle || document.write('<script type="text/vbscript">\nsub document_oncontextmenu() \n on error resume next \ndim Oelement   \n  Set   Oelement = window.event.srcElement \n  IF(   (Oelement.className="livespell_redwiggle" OR Oelement.className="livespell_greenwiggle")) THEN \n   window.event.returnValue = false   \n     window.event.cancelBubble = true\n END IF \n end sub\n </script>'), livespell.test.MAC() && (livespell.events.add(document, "keydown", livespell.context.mackeydown, !1), livespell.events.add(document, "keyup", livespell.context.mackeyup, !1))
}

function livespell___FF__clickmanager(e) {
    if (e.which && 3 == e.which) {
        if (!e || !e.originalTarget) return;
        var t = e.originalTarget;
        try {
            t && t.className && ("livespell_redwiggle" == t.className || "livespell_greenwiggle" == t.className) && e.preventDefault()
        } catch (e) {}
        try {
            t = e.target, t && t.className && ("livespell_redwiggle" == t.className || "livespell_greenwiggle" == t.className) && e.preventDefault()
        } catch (e) {}
    }
}
if ("undefined" == typeof JavaScriptSpellCheck || !JavaScriptSpellCheck) var JavaScriptSpellCheck = new JavaScriptSpellCheckObj,
    $Spelling = JavaScriptSpellCheck,
    $spelling = JavaScriptSpellCheck;
if ("undefined" == typeof livespell) {
    var livespell = {
        version: "5.2.180314",
        isactiveX: !1,
        degradeToIframe: !0,
        rubberRingServerModel: "",
        callerspan: null,
        liveProxys: [],
        installPath: CDN_PATH+"resources/global/scripts/SpellCheck/",
        spellingProviders: [],
        addedJsFiles: [],
        maxURI: 999,
        onLoadDelay: 50,
        getElementsByClass: function(className) {
            for (var element, hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)"), allElements = document.getElementsByTagName("*"), results = [], i = 0; i < allElements.length; i++) {
                element = allElements[i];
                var elementClass = "";
                if ("undefined" != typeof element.className) var elementClass = element.className.toString();
                elementClass && hasClassName && className && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass) && results.push(element)
            }
            return results
        },
        setrubberRingServerModel: function() {
            if (!livespell.spellingProviders[0] || !livespell.spellingProviders[0].isUniPacked) return !1;
            var mode = "";
            if (this.testSyncRequest(livespell.installPath + "core/Default.aspx")) mode = "aspx";
            else if (this.testSyncRequest(livespell.installPath + "core/Default.ashx")) mode = "asp.net";
            else if (this.testSyncRequest(livespell.installPath + "core/index.php")) mode = "php";
            else {
                if (!this.testSyncRequest(livespell.installPath + "core/default.asp")) {
                    if ("undefined" == typeof window.LIVESPELL_DEBUG_MODE) throw "SpellCheck Cannot Connect to a Server!";
                    return void livespell.ajax.debug("SpellCheck Cannot Connect to a Server!", !1)
                }
                mode = "asp"
            }
            return livespell.ajax.debug("<h1>Spell Check Server Mode Detected & Changed to " + mode.toUpperCase() + "</h1>", !1), livespell.rubberRingServerModel = mode, mode
        },
        setUniServerModel: this.setrubberRingServerModel,
        ajaxClient: function(sync) {
            var xhr = !1;
            try {
                if (xhr = new XMLHttpRequest) return xhr
            } catch (e) {}
            if (livespell.degradeToIframe && !sync) return !1;
            try {
                if (xhr = new ActiveXObject("Microsoft.XMLHTTP")) return livespell.isactiveX = !0, xhr
            } catch (e2) {
                try {
                    if (xhr = new ActiveXObject("Msxml2.XMLHTTP")) return livespell.isactiveX = !0, xhr
                } catch (e3) {
                    return !1
                }
            }
            return !1
        },
        testSyncRequest: function(posturl) {
            var xhr = livespell.ajaxClient(!0);
            if (posturl.indexOf("html") > -1) xhr.open("GET", posturl, !1), xhr.send();
            else {
                var params = "test=true";
                xhr.open("GET", posturl + "?" + params, !1), xhr.send()
            }
            return 200 == xhr.status ? ("undefined" != typeof window.LIVESPELL_DEBUG_MODE && livespell.ajax.debug("SERVER ERROR:" + xhr.responseText, !1), "no command" == xhr.responseText.toLowerCase().replace(/^\s\s*/, "").replace(/\s\s*$/, "")) : ("undefined" != typeof window.LIVESPELL_DEBUG_MODE && livespell.ajax.debug("SERVER CANNOT WORK:" + xhr.responseText, !1), !1)
        },
        addJs: function(js) {
            if (1 != livespell.addedJsFiles[js]) {
                livespell.addedJsFiles[js] = !0;
                var Scr = document.createElement("SCRIPT");
                Scr.src = js, Scr.type = "text/javascript", document.getElementsByTagName("HEAD")[0].appendChild(Scr)
            }
        },
        inlineblock: function() {
            var webkit = livespell.test.webkit();
            return webkit ? "block" : window.getComputedStyle ? "inline-block" : "inline"
        },
        heartbeat: function() {
            for (var id, DesiredActive = new Array, p = 0; p < livespell.spellingProviders.length; p++) {
                var provider = livespell.spellingProviders[p];
                if (provider.AsYouTypeIsActive)
                    for (var flist = provider.arrCleanFields(), f = 0; f < flist.length; f++)
                        if (id = flist[f], DesiredActive = livespell.array.safepush(DesiredActive, id), "textarea" != document.getElementById(id).nodeName.toLowerCase() || document.getElementById(id + livespell.insitu._FIELDSUFFIX)) {
                            var oProx = document.getElementById(id + livespell.insitu._FIELDSUFFIX);
                            if (oProx) {
                                var obase = document.getElementById(id);
                                obase.readOnly == oProx.readOnly && obase.disabled == oProx.disabled || (livespell.insitu.destroyProxy(id), provider.ActivateAsYouType())
                            }
                            livespell.insitu.safeUpdateProxy(id, p)
                        } else provider.ActivateAsYouType()
            }
            for (var divs = document.getElementsByTagName("div"), i = 0; i < divs.length; i++) {
                var thisdiv = divs[i];
                if (thisdiv.isLiveSpellProxy && thisdiv.id) {
                    var shouldBeThere = !1;
                    id = thisdiv.id.replace(livespell.insitu._FIELDSUFFIX, "");
                    for (var j = 0; j < DesiredActive.length && !shouldBeThere; j++) DesiredActive[j] == id && (shouldBeThere = !0);
                    shouldBeThere || livespell.insitu.destroyProxy(id)
                }
            }
        },
        getIframeDocumentBasic: function(myFrame) {
            var oDoc;
            if (myFrame.src.indexOf("fckeditor.html") > 0) {
                if (myFrame.contentWindow) oDoc = myFrame.contentWindow.frames[0].document;
                else {
                    if (!myFrame.contentDocument) return null;
                    oDoc = myFrame.frames[0].contentDocument
                }
                return oDoc
            }
            if (myFrame.contentWindow) oDoc = myFrame.contentWindow.document;
            else {
                if (!myFrame.contentDocument) return null;
                oDoc = myFrame.contentDocument
            }
            return oDoc
        },
        getIframeDocument: function(myFrame) {
            var oDoc, oBody, isEditable;
            try {
                if (myFrame.contentWindow) oDoc = myFrame.contentWindow.document;
                else {
                    if (!myFrame.contentDocument) return null;
                    oDoc = myFrame.contentDocument
                }
                if ('javascript:"<html></html>"' == myFrame.src) return oDoc;
                if (myFrame.src.toLowerCase().indexOf("javascript:") > -1) return oDoc;
                oHTML = oDoc.getElementsByTagName("html")[0];
                try {
                    if (isEditable = "true" === oHTML.contentEditable || oHTML.contentEditable === !0 || "on" == oHTML.designMode || "On" == oHTML.designMode || "ON" == oHTML.designMode || oHTML.designMode === !0 || "true" === oHTML.designMode || oHTML.contentEditable === !0 || "on" == oHTML.designMode || oHTML.designMode === !0 || "true" === oHTML.designMode) return oDoc
                } catch (e) {}
                if (oBody = oDoc.body, isEditable = "true" === oBody.contentEditable || oBody.contentEditable === !0 || "on" == oBody.designMode || "On" == oBody.designMode || "ON" == oBody.designMode || oBody.designMode === !0 || "true" === oBody.designMode || oDoc.contentEditable === !0 || "on" == oDoc.designMode || oDoc.designMode === !0 || "true" === oDoc.designMode) return oDoc;
                var ofsrc = myFrame.src;
                if (myFrame = myFrame.contentWindow ? myFrame.contentWindow : myFrame, myFrame.frames.length) {
                    for (var oSubDoc, i = 0; i < myFrame.frames.length; i++) {
                        var mySubFrame = myFrame.frames[i];
                        if (oSubDoc = mySubFrame.contentDocument ? mySubFrame.contentDocument : mySubFrame.document, mySubFrame.contentDocument ? oSubDoc = mySubFrame.contentDocument : mySubFrame.contentWindow && (oSubDoc = mySubFrame.contentWindow.document), oBody = oSubDoc.body, ofsrc.indexOf("fckeditor.html") > 0) return oBody;
                        if (isEditable = "false" === oBody.spellcheck || oBody.spellcheck === !1 || "true" === oBody.contentEditable || oBody.contentEditable === !0 || "on" == oBody.designMode || "On" == oBody.designMode || "ON" == oBody.designMode || oBody.designMode === !0 || "true" === oBody.designMode || oDoc.contentEditable === !0 || "on" == oDoc.designMode || oDoc.designMode === !0 || "true" === oDoc.designMode) return oSubDoc
                    }
                    if (isEditable = "false" === oBody.spellcheck || oBody.spellcheck === !1) return oDoc
                }
            } catch (e) {}
            return null
        },
        lang: {
            fetch: function(providerID, index) {
                var lang = livespell.spellingProviders[providerID].UserInterfaceLanguage;
                try {
                    return this[lang][this[index]]
                } catch (e) {
                    try {
                        return this.en[this[index]]
                    } catch (e) {
                        return index
                    }
                }
            },
            load: function(lang) {
                var idname = "__livespell__translations__" + lang,
                    fileref = E$(idname);
                fileref || (fileref = document.createElement("script"), fileref.setAttribute("id", idname), fileref.id = idname, fileref.setAttribute("charset", "utf-8"), fileref.setAttribute("type", "text/javascript"), fileref.setAttribute("src", livespell.installPath + "translations/" + lang + ".js"), document.getElementsByTagName("head")[0].appendChild(fileref))
            },
            BTN_ADD_TO_DICT: 0,
            BTN_AUTO_CORECT: 1,
            BTN_CANCEL: 2,
            BTN_CHANGE: 3,
            BTN_CHANGE_ALL: 4,
            BTN_CLEAR_EDIT: 5,
            BTN_CLOSE: 6,
            BTN_IGNORE_ALL: 7,
            BTN_IGNORE_ONCE: 8,
            BTN_OK: 9,
            BTN_OPTIONS: 10,
            BTN_RESET: 11,
            BTN_UNDO: 12,
            DONESCREEN_EDITS: 13,
            DONESCREEN_FIELDS: 14,
            DONESCREEN_MESSAGE: 15,
            DONESCREEN_WORDS: 16,
            LABEL_LANGAUGE: 17,
            LABEL_SUGGESTIONS: 18,
            LANGUAGE_MULTIPLE: 19,
            LANGUAGE_MULTIPLE_INSTRUCTIONS: 20,
            LOOKUP_MEANING: 21,
            MENU_APPLY: 22,
            MENU_CANCEL: 23,
            MENU_DELETEBANNED: 24,
            MENU_DELETEREPEATED: 25,
            MENU_IGNORE: 26,
            MENU_IGNOREALL: 27,
            MENU_LANGUAGES: 28,
            MENU_LEARN: 29,
            MENU_NOSUGGESTIONS: 30,
            OPT_CASE_SENSITIVE: 31,
            OPT_ENTRIES: 32,
            OPT_IGNORE_CAPS: 33,
            OPT_IGNORE_NUMERIC: 34,
            OPT_PERSONAL_AUTO_CURRECT: 35,
            OPT_PERSONAL_DICT: 36,
            OPT_SENTENCE_AWARE: 37,
            REASON_BANNED: 38,
            REASON_CASE: 39,
            REASON_ENFORCED: 40,
            REASON_GRAMMAR: 41,
            REASON_REPEATED: 42,
            REASON_SPELLING: 43,
            SUGGESTIONS_DELETE_REPEATED: 44,
            SUGGESTIONS_NONE: 45,
            USRBTN_SPELL_CHECK: 46,
            WIN_TITLE: 47
        },
        constants: {
            _IFRAME: "livespell___ajax_frame",
            _AJAXFORM: "livespell___ajax_form"
        },
        ajax: {
            renderIframe: function(postURL) {
                if (!E$(livespell.constants._IFRAME)) {
                    var n = document.createElement("span");
                    n.innerHTML = "<iframe id='" + livespell.constants._IFRAME + "'style=display:none;visibility:hidden;width:1px;height:1px;'  src='about:blank' name='" + livespell.constants._IFRAME + "' ></iframe>", document.body.appendChild(n)
                }
            },
            resend: function() {
                1 == livespell.isactiveX && livespell.test.IE() && (livespell.degradeToIframe = !0), livespell.ajax.send(livespell.cache.ajaxrequest.cmd, livespell.cache.ajaxrequest.args, livespell.cache.ajaxrequest.lan, livespell.cache.ajaxrequest.note, livespell.cache.ajaxrequest.sender)
            },
            sendcount: 0,
            send: function(cmd, args, lan, note, sender) {
                this.sendcount++, livespell.cache.ajaxrequest = {}, livespell.cache.ajaxrequest.cmd = cmd, livespell.cache.ajaxrequest.args = args, livespell.cache.ajaxrequest.lan = lan, livespell.cache.ajaxrequest.note = note, livespell.cache.ajaxrequest.sender = sender;
                var oSender = livespell.spellingProviders[sender],
                    serverModel = oSender.ServerModel.toLowerCase();
                "" !== livespell.rubberRingServerModel && (serverModel = livespell.rubberRingServerModel);
                var posturl = livespell.installPath + "core/";
                if ("asp.net" === serverModel) posturl += "default.ashx";
                else if ("aspx" === serverModel) posturl += "Default.aspx";
                else if ("asp" === serverModel) posturl += "default.asp";
                else if ("php" === serverModel) posturl += "index.php";
                else if ("auto" === serverModel || "" === serverModel) posturl += "";
                else {
                    if ("" === serverModel) throw "livespell::SeverModel not recognized: " + serverModel;
                    posturl += "index." + serverModel
                }
                var settingsfile = livespell.spellingProviders[sender].SettingsFile,
                    hasajax = !1,
                    xhr = !1;
                oSender.BypassAuthentication && livespell.test.IE() || (xhr = livespell.ajaxClient(!1)), xhr && (hasajax = !0);
                try {
                    args = encodeURIComponent(args)
                } catch (e) {
                    args = escape(args)
                }
                try {
                    lan = encodeURIComponent(lan)
                } catch (e) {
                    lan = escape(lan)
                }
                try {
                    settingsfile = encodeURIComponent(settingsfile)
                } catch (e) {
                    settingsfile = escape(settingsfile)
                }
                try {
                    note = encodeURIComponent(note)
                } catch (e) {
                    note = escape(note)
                }
                try {
                    sender = encodeURIComponent(sender)
                } catch (e) {
                    sender = escape(sender)
                }
                var params = "";
                if (params += "note=" + note, params += "&command=" + cmd, params += "&args=" + args, params += "&lan=" + lan, params += "&sender=" + sender, params += "&settingsfile=" + settingsfile, hasajax) {
                    var liveSpellAjaxCallbackhandler = function() {
                        if (4 == xhr.readyState)
                            if (200 == xhr.status) livespell.ajax.pickup(xhr.responseText, !1);
                            else if (livespell.rubberRingServerModel != livespell.setrubberRingServerModel() && livespell.ajax.resend(), "undefined" != typeof window.LIVESPELL_DEBUG_MODE) try {
                            xhr.responseText.length ? livespell.ajax.debug("SERVER ERROR:" + xhr.responseText, !1) : livespell.ajax.debug("SERVER ERROR - Please view this page in a browser other than IE for full details", !1)
                        } catch (e) {
                            livespell.ajax.debug("SERVER ERROR", !1)
                        }
                    };
                    livespell.test.BuggyAjaxInFireFox() ? xhr.onload = xhr.onerror = xhr.onabort = liveSpellAjaxCallbackhandler : xhr.onreadystatechange = liveSpellAjaxCallbackhandler;
                    var fulRequest = posturl + "?" + params;
                    fulRequest = fulRequest.replace(/\(/, "%28"), fulRequest = fulRequest.replace(/\)/, "%29"), fulRequest = fulRequest.replace(/'/, "%27"), xhr.open("GET", fulRequest, !0);
                    var async = !0;
                    xhr.send(), livespell.ajax.debug("URL:" + posturl + "  <br/>  GET:" + params, async)
                } else {
                    livespell.ajax.renderIframe(posturl), params += "&script=true", livespell.ajax.debug("URL:" + posturl + "  <br/>  GET (IFRAME):" + params, !0);
                    var theframe = E$(livespell.constants._IFRAME);
                    try {
                        var framehref = theframe.contentWindow.location.href;
                        framehref.indexOf("about:blank") < 0 && (posturl = framehref.split("?")[0]), theframe.contentWindow.location.replace(posturl + "?" + params)
                    } catch (e) {
                        theframe.src = posturl + "?" + params
                    }
                }
            },
            send_sync: function(cmd, args, lan, note, sender) {
                livespell.cache.ajaxrequest = {}, livespell.cache.ajaxrequest.cmd = cmd, livespell.cache.ajaxrequest.args = args, livespell.cache.ajaxrequest.lan = lan, livespell.cache.ajaxrequest.note = note, livespell.cache.ajaxrequest.sender = sender;
                var oSender = livespell.spellingProviders[sender],
                    serverModel = oSender.ServerModel.toLowerCase();
                "auto" === serverModel && "" !== livespell.rubberRingServerModel && (serverModel = livespell.rubberRingServerModel);
                var posturl = livespell.installPath + "core/";
                if ("asp.net" === serverModel) posturl += "default.ashx";
                else if ("aspx" === serverModel) posturl += "Default.aspx";
                else if ("asp" === serverModel) posturl += "default.asp";
                else if ("php" === serverModel) posturl += "index.php";
                else if ("auto" === serverModel || "" === serverModel) posturl += "";
                else {
                    if ("" === serverModel) throw "livespell::SeverModel not recognized: " + serverModel;
                    posturl += "index." + serverModel
                }
                var settingsfile = livespell.spellingProviders[sender].SettingsFile,
                    xhr = livespell.ajaxClient(!0);
                if (!xhr) return livespell.ajax.debug("SYNC REQUEST ERROR: No HTMLHTTP object or ActiveX", !1), null;
                var params = "";
                try {
                    args = encodeURIComponent(args)
                } catch (e) {
                    args = escape(args)
                }
                if (params += "note=" + escape(note), params += "&command=" + cmd, params += "&args=" + args, params += "&lan=" + escape(lan), params += "&sender=" + escape(sender), params += "&settingsfile=" + escape(settingsfile), xhr.open("GET", posturl + "?" + params, !1), xhr.send(), livespell.ajax.debug("REMOTE-CALL:" + posturl + "  <br/>  GET:" + params, !0), 200 == xhr.status) return livespell.ajax.pickup(xhr.responseText, !0);
                if (livespell.setrubberRingServerModel(), "undefined" != typeof window.LIVESPELL_DEBUG_MODE) {
                    try {
                        xhr.responseText.length ? livespell.ajax.debug("SERVER ERROR:" + xhr.responseText, !1) : livespell.ajax.debug("SERVER ERROR - Please view this page in a browser other than IE for full details", !1)
                    } catch (e) {
                        livespell.ajax.debug("SERVER ERROR", !1)
                    }
                    this.send_sync(cmd, args, lan, note, sender)
                }
                return null
            },
            pickupIframe: function(strHTML) {
                strHTML = strHTML.split("<script")[0], strHTML = strHTML.split("<SCRIPT")[0], this.pickup(strHTML, !1)
            },
            debug: function(msg, mtcolor) {
                if ("undefined" != typeof window.LIVESPELL_DEBUG_MODE) {
                    var o = document.getElementById("LIVESPELL_DEBUG_MODE_CONSOLE");
                    o || (o = document.createElement("div"), o.innerHTML = "<h2>Spell checker debug console</h2><p>please email back for comprehensive support</p><hr/><div style='border:1px dotted grey; background-color:#eee;color:#000;' id='LIVESPELL_DEBUG_MODE_CONSOLE'></div> ", document.body.appendChild(o)), o = document.getElementById("LIVESPELL_DEBUG_MODE_CONSOLE"), o.innerHTML = "<div style='background-color:" + (mtcolor === !0 ? "#ffe" : "#aab") + "'>" + o.innerHTML + msg + "</div>"
                }
            },
            needsInstantSuggestion: !1,
            pickup: function(strHTML, binInstant) {
                if (this.debug(strHTML, !1), strHTML.indexOf(livespell.str.chr(5)) === -1) return void setTimeout(livespell.ajax.resend, 5e3);
                strHTML = strHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'");
                var i, j, k, t, r, newSuggestions, sug_each_word, Suggestions, arrResult = strHTML.split(livespell.str.chr(5)),
                    command = arrResult[0],
                    vSender = Number(arrResult[1]),
                    oSender = livespell.spellingProviders[vSender],
                    vLang = oSender.Language;
                if (livespell.cache.suggestions[vLang] || (livespell.cache.suggestions[vLang] = []), livespell.cache.spell[vLang] || (livespell.cache.spell[vLang] = []), livespell.cache.reason[vLang] || (livespell.cache.reason[vLang] = []), "CTXSPELL" === command) {
                    for (t = arrResult[2].split(""), r = arrResult[3].split(""), i = 0; i < t.length; i++) livespell.cache.reason[vLang][livespell.cache.wordlist[vSender][i]] = r[i].toString(), livespell.cache.spell[vLang][livespell.cache.wordlist[vSender][i]] = "T" === t[i];
                    oSender.recieveContextSpell()
                } else if ("CTXSUGGEST" === command) {
                    for (newSuggestions = arrResult[2].split(livespell.str.chr(2)), livespell.cache.suggestions[vLang][livespell.cache.suggestionrequest.word] = newSuggestions, j = 0; j < newSuggestions.length; j++)
                        for (livespell.cache.spell[vLang][newSuggestions[j]] = !0, sug_each_word = newSuggestions[j].replace(/\-/g, " ").split(" "), k = 0; k < sug_each_word.length; k++) livespell.cache.spell[vLang][sug_each_word[k]] = !0;
                    arrResult[3] && arrResult[3].length && (livespell.cache.langs = arrResult[3].split(livespell.str.chr(2))), livespell.context.showMenu(livespell.cache.suggestionrequest.id, livespell.cache.suggestionrequest.word, livespell.cache.suggestionrequest.reason, livespell.cache.suggestionrequest.providerID)
                } else if ("WINSUGGEST" === command) {
                    for (Suggestions = arrResult[2].split(livespell.str.chr(1)), i = 0; i < livespell.cache.suglist.length; i++)
                        for (newSuggestions = Suggestions[i].split(livespell.str.chr(2)), livespell.cache.suggestions[vLang][livespell.cache.suglist[i]] = newSuggestions, j = 0; j < newSuggestions.length; j++)
                            for (livespell.cache.spell[vLang][newSuggestions[j]] = !0, sug_each_word = newSuggestions[j].replace(/\-/g, " ").split(" "), k = 0; k < sug_each_word.length; k++) livespell.cache.spell[vLang][sug_each_word[k]] = !0;
                    oSender.recieveWindowSpell()
                } else if ("WINSETUP" === command) {
                    for (Suggestions = arrResult[4].split(livespell.str.chr(1)), t = arrResult[2].split(""), r = arrResult[3].split(livespell.str.chr(1)), i = 0; i < t.length; i++)
                        if (livespell.cache.reason[vLang][livespell.cache.wordlist[vSender][i]] = r[i], livespell.cache.spell[vLang][livespell.cache.wordlist[vSender][i]] = "T" === t[i], !livespell.cache.spell[vLang][livespell.cache.wordlist[vSender][i]] && i < Suggestions.length)
                            for (newSuggestions = Suggestions[i].split(livespell.str.chr(2)), livespell.cache.suggestions[vLang][livespell.cache.wordlist[vSender][i]] = newSuggestions, j = 0; j < newSuggestions.length; j++)
                                for (livespell.cache.spell[vLang][newSuggestions[j]] = !0, sug_each_word = newSuggestions[j].replace(/\-/g, " ").split(" "), k = 0; k < sug_each_word.length; k++) livespell.cache.spell[vLang][sug_each_word[k]] = !0;
                    arrResult[5] && arrResult[5].length && (livespell.cache.langs = arrResult[5].split(livespell.str.chr(2))), oSender.recieveWindowSetup()
                } else {
                    if ("LISTDICTS" === command) return arrResult[2].split(livespell.str.chr(2));
                    if ("SAVEWORD" === command) {
                        var myMessage = arrResult[2];
                        myMessage.indexOf("!!") > -1 && alert(myMessage)
                    } else if ("APIDYM" === command) {
                        var Suggestion = arrResult[3],
                            Origional = arrResult[2];
                        oSender.onDidYouMean(Suggestion, Origional)
                    } else if ("APIVALIDATE" === command) {
                        var doSuggest = arrResult[4].length > 0;
                        Suggestions = arrResult[4].split(livespell.str.chr(1)), t = arrResult[2].split(""), r = arrResult[3].split(livespell.str.chr(1));
                        var outInput = arrResult[4].split(livespell.str.chr(1)),
                            isValid = "T" == arrResult[5],
                            outSpellingOk = [],
                            outReason = [];
                        for (i = 0; i < outInput.length; i++) livespell.cache.reason[vLang][outInput[i]] = outReason[i] = r[i], livespell.cache.spell[vLang][outInput[i]] = outSpellingOk[i] = "T" === t[i];
                        if (binInstant) return isValid;
                        oSender.onValidateMech(isValid)
                    } else if ("APISPELL" === command || "APISPELLARRAY" === command) {
                        var doSuggest = arrResult[4].length > 0;
                        Suggestions = arrResult[4].split(livespell.str.chr(1)), t = arrResult[2].split(""), r = arrResult[3].split(livespell.str.chr(1));
                        var outInput = arrResult[5].split(livespell.str.chr(1)),
                            outSpellingOk = [],
                            outSuggestions = [],
                            outReason = [];
                        for (i = 0; i < outInput.length; i++)
                            if (livespell.cache.reason[vLang][outInput[i]] = outReason[i] = r[i], livespell.cache.spell[vLang][outInput[i]] = outSpellingOk[i] = "T" === t[i], doSuggest && !livespell.cache.spell[vLang][outInput[i]])
                                for (newSuggestions = Suggestions[i].split(livespell.str.chr(2)), livespell.cache.suggestions[vLang][outInput[i]] = outSuggestions[i] = newSuggestions, j = 0; j < newSuggestions.length; j++)
                                    for (livespell.cache.spell[vLang][newSuggestions[j]] = !0, sug_each_word = newSuggestions[j].replace(/\-/g, " ").split(" "), k = 0; k < sug_each_word.length; k++) livespell.cache.spell[vLang][sug_each_word[k]] = !0;
                        if (outInput.length > 1 || "APISPELLARRAY" === command) {
                            if (binInstant) return livespell.ajax.needsInstantSuggestion ? outSuggestions : outSpellingOk;
                            oSender.onSpellCheck(outInput, outSpellingOk, outReason, outSuggestions)
                        } else {
                            if (binInstant) return livespell.ajax.needsInstantSuggestion ? outSuggestions : outSpellingOk[0];
                            oSender.onSpellCheck(outInput[0], outSpellingOk[0], outReason[0], outSuggestions[0])
                        }
                    }
                }
            }
        },
        cache: {
            ignore: [],
            spell: [],
            reason: [],
            wordlist: [],
            suglist: [],
            langs: [],
            suggestions: [],
            suggestionrequest: null,
            checkTimeout: null,
            checkTimeoutUni: null,
            ajaxrequest: []
        },
        test: {
            HTML: function(str) {
                return str.indexOf("<") > -1 && str.indexOf(">") > -1 || 0 == str.indexOf("&") && str.indexOf(";") == str.length - 1
            },
            IE: function() {
                return navigator.appVersion.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Trident/") > -1
            },
            IE5: function() {
                return navigator.appVersion.indexOf("MSIE 5.") > -1
            },
            IE6: function() {
                return navigator.appVersion.indexOf("MSIE 6.") > -1
            },
            IE7: function() {
                return navigator.appVersion.indexOf("MSIE 7.") > -1
            },
            IE8: function() {
                return navigator.appVersion.indexOf("MSIE 8.") > -1
            },
            IE9: function() {
                return navigator.userAgent.indexOf("MSIE 9.") > -1 && !arguments.caller
            },
            IE10: function() {
                return navigator.userAgent.indexOf("MSIE 10.") > -1
            },
            IEold: function() {
                return livespell.test.IE() && (livespell.test.IE5() || livespell.test.IE6() || livespell.test.IE7())
            },
            webkit: function() {
                return /webkit/.test(navigator.userAgent.toLowerCase())
            },
            chrome: function() {
                return /chrome/.test(navigator.userAgent.toLowerCase())
            },
            Safari: function() {
                return /safari/.test(navigator.userAgent.toLowerCase())
            },
            FireFox: function() {
                return /firefox/.test(navigator.userAgent.toLowerCase())
            },
            BuggyAjaxInFireFox: function() {
                var FF3 = /firefox\/3./.test(navigator.userAgent.toLowerCase()),
                    GK = /gecko/.test(navigator.userAgent.toLowerCase()),
                    WIN = /windows/.test(navigator.userAgent.toLowerCase());
                return (FF3 || GK) && WIN
            },
            MAC: function() {
                return !!(navigator.platform && navigator.platform.toUpperCase().indexOf("MAC") > -1)
            },
            iPhone: function() {
                return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i))
            },
            isword: function(str) {
                return !!str.length && ("length" != str && (str = str.replace(/&nbsp;/g, " "), !(str.indexOf("<") > -1 || str.indexOf("&") > -1) && ("&nbsp;" != str && (!/[®™]+/.test(str) && (str = str.replace(/&nbsp;/g, " "), str.toLowerCase() !== str.toUpperCase())))))
            },
            ALLCAPS: function(str) {
                return str === str.toUpperCase()
            },
            eos: function(str) {
                return str = str.replace(/&nbsp;/gi, " "), (/<br[ ]*[\/]?>/gi.test(str) || /<div[ ]*[\/]?>/gi.test(str) || /<p[ ]*[\/]?>/gi.test(str) || /[!?¿¡.][\s\S]*$$/.test(str)) && !/[.]{3}/.test(str)
            },
            nl: function(str) {
                return /<br[ ]*[\/]?>/gi.test(str) || /\n/gi.test(str) || /\r/gi.test(str)
            },
            browserNoAYT: function() {
                return !livespell.test.browserValid()
            },
            num: function(str) {
                return /[.0-9\*\#\@\/\%\$\&\+\=]/.test(str)
            },
            lcFirst: function(str) {
                var f = str.substr(0, 1);
                return !/[.0-9\*\#\@\/'`\%\$\&\+\=]/.test(f) && f == f.toLowerCase()
            },
            spelling: function(word, Lang) {
                if (livespell.cache.ignore[word.toLowerCase()] && livespell.cache.ignore[word.toLowerCase()] === !0) return !0;
                livespell.cache.spell[Lang] || (livespell.cache.spell[Lang] = []);
                var res = livespell.cache.spell[Lang][word];
                return res && "function" == typeof res && (res = !0), res
            },
            fullyCached: function(word, lang, makeSuggestions) {
                var wordSpellCheck = this.spelling(word, lang),
                    result = wordSpellCheck === !0 || wordSpellCheck === !1;
                return wordSpellCheck !== !0 && (result = result && livespell.cache.reason[lang] && "undefined" != typeof livespell.cache.reason[lang][word], makeSuggestions && (result = result && livespell.cache.suggestions[lang] && "undefined" != typeof livespell.cache.suggestions[lang][word])), result
            },
            browserValid: function() {
                return (document.designMode || document.contentEditable) && !document.opera && !/opera/.test(navigator.userAgent.toLowerCase())
            }
        },
        str: {
            normalizeApos: function(tok) {
                return tok.replace(/[’\u2018\u2019`]/g, "'")
            },
            getCase: function(word) {
                return word.toUpperCase() === word ? 2 : livespell.str.toCaps(word) === word ? 1 : 0
            },
            stripSpans: function(strinput) {
                return strinput ? (strinput = strinput.replace(/(\<\/span[^>]*\>)/gi, ""), strinput.replace(/(\<span[^>]*\>)/gi, "")) : ""
            },
            htmlDecode: function(content) {
                if (livespell.test.IE5() || livespell.test.IE6() || livespell.test.IE7() || livespell.test.IE8()) {
                    var EntityLevelHtmlDecode = function(input) {
                        var e = document.createElement("span"),
                            result = input.replace(/(&[^;]+;)+/g, function(match) {
                                return e.innerHTML = match, e.firstChild.nodeValue
                            });
                        return result
                    };
                    return content.replace(/(&[^;]+;)+/g, EntityLevelHtmlDecode)
                }
                var e = document.createElement("div");
                return e.innerHTML = content, e.childNodes.length < 1 ? "" : e.childNodes[0].data
            },
            stripTags: function(strinput) {
                return strinput ? (strinput = livespell.str.stripComments(strinput), strinput.replace(/(<[\/]?[a-z][^>]*>)/gi, "")) : ""
            },
            stripComments: function(strinput) {
                return strinput ? (strinput = strinput.replace(/<!--[\s\S.\n]*?-->/g, ""), strinput = strinput.replace(/&lt;!--[\s\S.\n]*?--&gt;/g, "")) : ""
            },
            HTMLEnc: function(s) {
                return void 0 == s ? "" : (s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), s = s.replace(/\n/g, "<br />"), s = s.replace(/\r/g, ""), s = s.replace(/[ ][ ]/gi, " &nbsp;"), s = s.replace(/[ ][ ]/gi, " &nbsp;"))
            },
            HTMLDec: function(s) {
                return s = s = s.replace(/\&nbsp\;/gi, " "), s = s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            },
            spliceXHTML: function(str, pos, add) {
                for (var arrStr = str.split(""), inHTML = !1, out = "", j = 0, i = 0; i < arrStr.length; i++) {
                    var ch8r = arrStr[i];
                    "<" == ch8r && (inHTML = !0), out += ch8r, j != pos || inHTML || (out += add), inHTML || j++, ">" == ch8r && inHTML && (inHTML = !1)
                }
                return out
            },
            spliceSpans: function(str, pos, add) {
                if (pos == -1) return str;
                if (0 == pos) return add + str;
                if (str + "" == "") return "";
                for (var arrStr = str.split(""), inHTMLSpan = !1, inHTML = !0, out = "", j = 0, i = 0; i < arrStr.length; i++) {
                    var ch8r = arrStr[i];
                    try {
                        i < arrStr.length - 5 && "<" == ch8r && ("s" == arrStr[i + 1].toLowerCase() && "p" == arrStr[i + 2].toLowerCase() && "a" == arrStr[i + 3].toLowerCase() && "n" == arrStr[i + 4].toLowerCase() || "/" == arrStr[i + 1].toLowerCase() && "s" == arrStr[i + 2].toLowerCase() && "p" == arrStr[i + 3].toLowerCase() && "a" == arrStr[i + 4].toLowerCase() && "n" == arrStr[i + 5].toLowerCase()) && (inHTMLSpan = !0), "<" == ch8r && (inHTML = !0)
                    } catch (e) {}
                    out += ch8r, j != pos - 1 || inHTMLSpan || (out += add), inHTMLSpan || j++, ">" == ch8r && inHTMLSpan && (inHTMLSpan = !1)
                }
                return out
            },
            toCase: function($$str, $$C, $$bcapitalize) {
                switch ($$C) {
                    case 2:
                        $$str = $$str.toUpperCase();
                        break;
                    case 1:
                        $$str = $$str.substr(0, 1).toUpperCase() + $$str.substr(1)
                }
                return $$bcapitalize && ($$str = $$str.substr(0, 1).toUpperCase() + $$str.substr(1)), $$str
            },
            tokenize: function(strdoc, binraw) {
                for (var pattern = /((\<head>(?:.|\n|\r)+?\<\/head\>)|(\<\!\-\-.*\>)|(\&lt\;[\/\?]?[a-zA-Z][^\&]*\&gt;)|(\<[\/\?]?[a-z][^\>]*\>)|(\&lt\;[\/\?]?[a-z][.]*\&gt;)|(\&amp\;[a-zA-Z0-9]{1,6}\;)|(\&[a-zA-Z0-9]{1,6}\;)|([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})|(<[\/\?]?\w+[^>]*>)|([a-zA-Z]{2,5}:\/\/[^\s\<]*)|(www\.[^\s\<]+[\.][a-zA-Z]{2,4})|([^\s\<\>]+[\.][a-zA-Z]{2,5}\b)|([\w¥íë\x81-\xA7\xC0-\xFF]+[\w'’\u2018\u2019`¥íë\x81-\xA7\xC0-\xFF]*[\w¥íë\x81-\xA7\xC0-\xFF]+)|([\w]+))/gi, arrdocobj = strdoc.replace(pattern, this.chr(1) + "$1" + this.chr(1)).replace(/\x01\x01/g, this.chr(1)).split(this.chr(1)), arrdoc = [], i = 0; i < arrdocobj.length; i++) arrdoc[i] = arrdocobj[i];
                if (arrdoc[0] || arrdoc.shift(), arrdoc[arrdoc.length - 1] || arrdoc.pop(), !binraw)
                    for (var i = 0; i < arrdocobj.length; i++) arrdoc[i] && (arrdoc[i] = livespell.str.normalizeApos(arrdoc[i]));
                return arrdoc
            },
            chr: function(AsciiNum) {
                return String.fromCharCode(AsciiNum)
            },
            toCaps: function(str) {
                return str.substr(0, 1).toUpperCase() + str.substr(1)
            },
            trim: function(str) {
                return str.replace(/^\s+|\s+$/g, "")
            },
            rtrim: function(s) {
                return s.replace(/\s*$$/, "")
            }
        },
        userDict: {
            forget: function() {
                var current_cookie = livespell.cookie.get("SPELL_DICT_USER");
                if (current_cookie.length)
                    for (var arrPersonalWords = current_cookie.split(livespell.str.chr(1)), i = 0; i < arrPersonalWords.length; i++) livespell.cache.ignore[arrPersonalWords[i].toLowerCase()] && delete livespell.cache.ignore[arrPersonalWords[i].toLowerCase()]
            },
            load: function() {
                var current_cookie = livespell.cookie.get("SPELL_DICT_USER");
                if (current_cookie.length)
                    for (var arrPersonalWords = current_cookie.split(livespell.str.chr(1)), i = 0; i < arrPersonalWords.length; i++) livespell.cache.ignore[arrPersonalWords[i].toLowerCase()] = !0
            },
            add: function(word) {
                livespell.cache.ignore[word.toLowerCase()] = !0;
                var current_cookie = livespell.cookie.get("SPELL_DICT_USER");
                current_cookie && (current_cookie = livespell.str.chr(1) + current_cookie), current_cookie = word + current_cookie, livespell.cookie.setLocal("SPELL_DICT_USER", current_cookie)
            }
        },
        cookie: {
            erase: function(name, path, domain) {
                this.setLocal(name, "")
            },
            get: function(check_name) {
                for (var a_all_cookies = document.cookie.split(";"), a_temp_cookie = "", cookie_name = "", cookie_value = "", b_cookie_found = !1, i = 0; i < a_all_cookies.length; i++) {
                    if (a_temp_cookie = a_all_cookies[i].split("="), cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$$/g, ""), cookie_name === check_name) return b_cookie_found = !0, a_temp_cookie.length > 1 && (cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$$/g, ""))), cookie_value ? cookie_value : "";
                    a_temp_cookie = null, cookie_name = ""
                }
                if (!b_cookie_found) return ""
            },
            set: function(name, value, expires, path, domain, secure) {
                var today = new Date;
                today.setTime(today.getTime()), expires && (expires = 1e3 * expires * 60 * 60 * 24);
                var expires_date;
                expires_date = "" == value ? new Date(today.getTime()) : new Date(today.getTime() + expires);
                var strcookie = name + "=" + escape(value);
                expires && (strcookie += ";expires=" + expires_date.toGMTString()), document.cookie = strcookie
            },
            setLocal: function(name, value) {
                this.set(name, value, 999, "", document.domain, !1)
            }
        },
        events: {
            add: function(obj, event, callback, capture) {
                if (obj.addEventListener) try {
                    obj.addEventListener(event, callback, !1)
                } catch (e) {} else obj.attachEvent && (obj.detachEvent("on" + event, callback), obj.attachEvent("on" + event, callback))
            }
        },
        array: {
            safepush: function(arr, value) {
                for (var i = 0; i < arr.length; i++)
                    if (arr[i] === value) return arr;
                return arr.push(value), arr
            },
            remove: function(array, subject) {
                for (var r = new Array, i = 0, n = array.length; i < n; i++) array[i] != subject && (r[r.length] = array[i]);
                return r
            }
        }
    };
    Array.push || Array.prototype.push || (Array.prototype.push = function() {
        for (var n = this.length >>> 0, i = 0; i < arguments.length; i++) this[n] = arguments[i], n = n + 1 >>> 0;
        return this.length = n, n
    }), Array.pop || Array.prototype.pop || (Array.prototype.pop = function() {
        var value, n = this.length >>> 0;
        return n && (value = this[--n], delete this[n]), this.length = n, value
    }), Array.shift || Array.prototype.shift || (Array.prototype.shift = function() {
        return firstElement = this[0], Array.prototype.reverse.call(this), this.length = Math.max(this.length - 1, 0), Array.prototype.reverse.call(this), firstElement
    }), livespell.insitu = {
        settings: {
            Delay: 888
        },
        provider: function(id) {
            return livespell.spellingProviders[id]
        },
        initiated: !1,
        _FIELDSUFFIX: "___livespell_proxy",
        _CONTEXTMENU: "livespell___contextmenu",
        updateBaseDelay: function(id) {
            var id2 = id,
                n = function() {
                    livespell.insitu.updateBase(id2)
                };
            setTimeout(n, 1)
        },
        updateBase: function(id) {
            E$(id).value = livespell.insitu.getProxyText(id)
        },
        proxyDOM: function(id) {
            return E$(id + this._FIELDSUFFIX)
        },
        getProxyHTML: function(id) {
            return livespell.insitu.proxyDOM(id).innerHTML
        },
        extractTextWithWhitespace: function(parent) {
            for (var elem, ret = "", elems = parent.childNodes, i = 0; elems[i]; i++) {
                var elem = elems[i];
                3 === elem.nodeType || 4 === elem.nodeType ? ret += elem.nodeValue : 1 === elem.nodeType && (ret += livespell.insitu.extractTextWithWhitespace(elem), "P" != elem.nodeName && "DIV" != elem.nodeName || (ret += "\n"), "BR" == elem.nodeName && elem.nextSibling && (ret += "\n"))
            }
            return ret = ret.replace(/[\x01\x02\x7F]/g, ""), ret = ret.replace(/[\xA0]/g, " "), ret = ret.replace(/[\u200B-\u200D\uFEFF]/g, "")
        },
        getProxyText: function(id) {
            var me = livespell.insitu.proxyDOM(id),
                val = livespell.insitu.extractTextWithWhitespace(me);
            return val === String.fromCharCode(10) && (val = ""), val.length > 0 && livespell.test.FireFox() && val.charAt(val.length - 1) == String.fromCharCode(10) && (val = val.substr(0, val.length - 1)), val
        },
        setProxyHTML: function(id, val) {
            livespell.insitu.proxyDOM(id).innerHTML = val, livespell.context.validate(id)
        },
        setProxyText: function(id, val) {
            val = livespell.str.HTMLEnc(val), livespell.test.IE() && (val = "<p>" + val + "</p>", val = val.replace(/<br\s*[\/]?>/gi, "</p><p>"), val = val.replace(/<p>\s*<\/p>/gi, "<p>&#8203;</p>")), this.setProxyHTML(id, val)
        },
        hasChanged: function(id) {
            var neue = E$(id).value.replace(/\t/gi, " ").replace(/\x0D\x0A/g, String.fromCharCode(10)).replace(/\xA0/g, " "),
                old = livespell.insitu.getProxyText(id).replace(/\x0D\x0A/g, String.fromCharCode(10)).replace(/\xA0/g, " ");
            return neue != old
        },
        safeUpdateProxy: function(id, providerId) {
            return !(!livespell.insitu.proxyDOM(id) || livespell.insitu.proxyDOM(id).hasFocus) && void(livespell.insitu.hasChanged(id) && (livespell.insitu.setProxyText(id, E$(id).value), this.checkNow(id, providerId)))
        },
        updateProxy: function(id) {
            var value = E$(id).value;
            this.setProxyText(id, value)
        },
        setProxyHTMLAndMaintainCaretLegacy: function(id, val) {
            var dmilit = "\ufeff",
                liveField = livespell.insitu.proxyDOM(id),
                range = document.selection.createRange();
            range.pasteHTML(dmilit);
            var text = liveField.innerHTML;
            text = livespell.str.stripSpans(text);
            var pos = text.indexOf(dmilit),
                caretNode = document.getElementById("livespell_cursor_hack__" + id);
            caretNode && caretNode.parentNode && caretNode.parentNode.removeChild(caretNode);
            var caretNode = document.createElement("span");
            caretNode.id = "livespell_cursor_hack__" + id;
            var plainNode = document.createElement("span");
            plainNode.appendChild(caretNode), caretNodeHTML = plainNode.innerHTML, plainNode.removeChild(caretNode), caretNode = plainNode = null, text = livespell.str.spliceSpans(val, pos, caretNodeHTML), liveField.innerHTML = text;
            var range = document.selection.createRange(),
                caretNode = document.getElementById("livespell_cursor_hack__" + id),
                id2 = id,
                n = function() {
                    range.moveToElementText(caretNode), range.select(), caretNode.parentNode.removeChild(caretNode), livespell.context.validate(id2)
                };
            window.setTimeout(n, 1)
        },
        setProxyHTMLAndMaintainCaret: function(id, val) {
            if ("" !== val && livespell.insitu.getProxyHTML(id) !== val) {
                var liveField = livespell.insitu.proxyDOM(id);
                if (window.getSelection) {
                    liveField.focus();
                    var marker = livespell.str.chr(127) + livespell.str.chr(1) + livespell.str.chr(2),
                        carretbuddyid = "_livespell__temp___273728",
                        caretbuddy = "<span id='" + carretbuddyid + "'></span>",
                        sel = window.getSelection();
                    if (!sel.getRangeAt || !sel.rangeCount) return;
                    var range = sel.getRangeAt(0);
                    range.deleteContents(), range.insertNode(document.createTextNode(marker));
                    var pos = livespell.str.stripSpans(liveField.innerHTML).indexOf(marker);
                    val = livespell.str.spliceSpans(val, pos, caretbuddy), liveField.innerHTML = val;
                    var caretNode = document.getElementById(carretbuddyid);
                    if (!caretNode) return;
                    var selection = window.getSelection();
                    selection.removeAllRanges();
                    var range = document.createRange();
                    range.selectNode(caretNode), selection.addRange(range), range.deleteContents(), range.collapse(!0), liveField.focus(), selection.addRange(range)
                } else {
                    if (window.screen && window.screen.deviceXDPI && window.screen.logicalXDPI && window.screen.deviceXDPI != window.screen.logicalXDPI) {
                        return this.setProxyHTMLAndMaintainCaretLegacy(id, val)
                    }
                    liveField.innerHTML;
                    val.toLowerCase().indexOf("<p") == -1 && (val = "<p>" + val + "</p>"), val = val.replace(/<br[ ]*[\/]?>/gi, "</p><p>"), val = val.replace(/<p>\s*<\/p>/gi, "<p>&#8203;</p>"), val = val.replace(/<p>&nbsp;<\/p>/gi, "<p>&#8203;</p>"), liveField.focus();
                    var carretbuddyid = "_livespell__temp___273728",
                        caretbuddy = "<span id='" + carretbuddyid + "'></span>",
                        caretNode = document.getElementById(carretbuddyid);
                    caretNode && caretNode.parentNode && caretNode.parentNode.removeChild(caretNode);
                    var clickx, clicky, cursorPos = document.selection.createRange().duplicate();
                    if (clickx = cursorPos.boundingLeft, clicky = cursorPos.boundingTop, !clickx || !clicky) {
                        cursorPos.pasteHTML(caretbuddy);
                        var tempbuddy = document.getElementById(carretbuddyid);
                        tempbuddy.getBoundingClientRect();
                        clickx = tempbuddy.getBoundingClientRect().left,
                            clicky = tempbuddy.getBoundingClientRect().top
                    }
                    try {
                        cursorPos.moveToPoint(clickx, clicky)
                    } catch (e) {
                        return this.setProxyHTMLAndMaintainCaretLegacy(id, val)
                    }
                    var scrolly = liveField.scrollTop;
                    liveField.innerHTML = val, liveField.scrollTop = scrolly, clicky += 3;
                    try {
                        cursorPos.moveToPoint(clickx, clicky), cursorPos.select()
                    } catch (e) {}
                }
            }
        },
        findLiveChildrenInDOMElement: function(element) {
            var uid, LiveOffspring = [];
            if (element.id) {
                if (uid = element.id, document.getElementById(uid + "_designEditor")) {
                    var oFTA = document.getElementById(uid + "_designEditor");
                    if ("iframe" == oFTA.nodeName.toLowerCase()) return LiveOffspring.push(oFTA.id), LiveOffspring
                }
            } else uid = "xx";
            for (var InnerFrames = element.getElementsByTagName("iframe"), i = 0; i < InnerFrames.length; i++) {
                var ittInnerFrame = InnerFrames[i];
                livespell.getIframeDocument(ittInnerFrame) && (ittInnerFrame.id || (ittInnerFrame.id = "livespell__IframeChildof_" + uid + "_" + i), LiveOffspring.push(ittInnerFrame.id))
            }
            return LiveOffspring
        },
        checkNow: function(fieldList, providerID) {
            var txt = "";
            if (window.getSelection) txt = window.getSelection();
            else if (document.getSelection) txt = document.getSelection();
            else if (document.selection) try {
                txt = document.selection.createRange().text
            } catch (e) {}
            if ("" == txt) {
                livespell.cache.spell[this.provider(providerID).Language] || (livespell.cache.spell[this.provider(providerID).Language] = [], livespell.cache.reason[this.provider(providerID).Language] = []), livespell.cache.wordlist[providerID] = [], fieldList.join || (fieldList = fieldList.split(","));
                for (var mem_words = [], f = 0; f < fieldList.length; f++) {
                    var id = fieldList[f];
                    if ("textarea" == E$(id).nodeName.toLowerCase() || "input" == E$(id).nodeName.toLowerCase() && "text" == E$(id).type) {
                        livespell.insitu.createProxy(id);
                        for (var strDoc = this.getProxyText(id), tokens = livespell.str.tokenize(strDoc), lng = this.provider(providerID).Language, memsize = 0, memmax = livespell.maxURI - 257, i = 0; i < tokens.length && memsize < memmax; i++)
                            if (mem_words["_" + tokens[i]] !== !0 && livespell.test.isword(tokens[i]) === !0) {
                                var cachelookup = livespell.cache.spell[lng][tokens[i]];
                                cachelookup !== !0 && cachelookup !== !1 && (mem_words["_" + tokens[i]] = !0, memsize += encodeURIComponent(tokens[i].toString()).length + 2, livespell.cache.wordlist[providerID] = livespell.array.safepush(livespell.cache.wordlist[providerID], tokens[i].toString()))
                            }
                    }
                }
                if (!livespell.cache.wordlist[providerID].length) return this.renderProxy(id, providerID);
                mem_words = null;
                livespell.cache.wordlist[providerID].join(livespell.str.chr(1));
                livespell.ajax.send("CTXSPELL", livespell.cache.wordlist[providerID].join(livespell.str.chr(1)), this.provider(providerID).Language, "", providerID)
            }
        },
        destroyProxy: function(id) {
            document.getElementById(id + this._FIELDSUFFIX) && (o = livespell.insitu.proxyDOM(id), n = document.getElementById(id), o.parentNode.removeChild(o), n.style.display = livespell.inlineblock(), n.style.visibility = "visible", livespell.array.remove(livespell.liveProxys, id), n.hasLiveSpellProxy = !1)
        },
        createProxy: function(id) {
            if (livespell.test.browserValid()) {
                var e = document.getElementById(id);
                if (e && !e.disabled) {
                    if (livespell.insitu.init(), document.getElementById(id + this._FIELDSUFFIX)) return livespell.insitu.proxyDOM(id);
                    var attr, stylesToCopy, i, styleval, memreadonly, n = document.createElement("div");
                    n.oneline = "input" === e.nodeName.toLowerCase(), n.setAttribute("id", id + this._FIELDSUFFIX);
                    var t = E$(id);
                    if (t.spellcheckproxy = n, livespell.test.IE()) try {
                        memreadonly = t.readOnly, t.readOnly = !1
                    } catch (e) {}
                    try {
                        t.getAttribute("maxlength") ? n.maxLength = t.getAttribute("maxlength") : t.maxLength && t.maxLength > 0 && (n.maxLength = t.maxLength)
                    } catch (e) {}
                    try {
                        n.setAttribute("class", "livespell_textarea " + t.className)
                    } catch (e) {}
                    try {
                        n.setAttribute("style", t.getAttribute("style"))
                    } catch (e) {}
                    n.style.display = "none";
                    var stylesToCopy = ["font-size", "line-height", "font-family", "width", "height", "padding-left", "padding-top", "margin-left", "margin-top", "padding-right", "padding-bottom", "margin-right", "margin-bottom", "font-weight", "font-style", "color", "text-transform", "text-decoration", "line-height", "text-align", "vertical-align", "direction", "background-color", "background-image", "background-repeat", "background-position", "background-attachment"],
                        stylesToSet = ["fontSize", "lineHeight", "fontFamily", "width", "height", "paddingLeft", "paddingTop", "marginLeft", "marginTop", "paddingRight", "paddingBottom", "marginRight", "marginBottom", "fontWeight", "fontStyle", "color", "textTransform", "textDecoration", "lineHeight", "textAlign", "verticalAlign", "direction", "backgroundColor", "backgroundImage", "backgroundRepeat", "backgroundPosition", "backgroundAttachment"];
                    if (window.getComputedStyle) {
                        var compStyle = window.getComputedStyle(t, null);
                        for (i = 0; i < stylesToCopy.length; i++) {
                            var attr = stylesToCopy[i],
                                attr2 = stylesToSet[i],
                                styleval = compStyle.getPropertyValue(attr);
                            "height" == attr && styleval.indexOf("px") && (styleval = Number(styleval.split("px")[0]) + 1 + "px"), "width" == attr && styleval.indexOf("px") && (styleval = livespell.test.IE9() ? Number(styleval.split("px")[0]) + 6 + "px" : Number(styleval.split("px")[0]) - 1 + "px"), "width" == attr && (t.attributes.width && t.attributes.width.value.indexOf("%") > -1 && (styleval = t.attributes.width.value), t.style.width && t.style.width.indexOf("%") > -1 && (styleval = t.style.width)), "height" == attr && (t.attributes.height && t.attributes.height.value.indexOf("%") > -1 && (styleval = t.attributes.height.value), t.style.height && t.style.height.indexOf("%") > -1 && (styleval = t.style.height)), "margin-left" == attr && styleval.indexOf("px") && (styleval = Number(styleval.split("px")[0]) + 1 + "px"), styleval && (n.style[attr2] = styleval)
                        }
                    } else if (t.currentStyle) {
                        for (n.oneline || (n.style.overflowY = "scroll"), i = 0; i < stylesToCopy.length; i++)
                            if (attr = stylesToSet[i], styleval = t.currentStyle[attr]) try {
                                if ("width" == attr) {
                                    try {
                                        t.offsetWidth && (n.style.width = t.offsetWidth)
                                    } catch (e) {}
                                    t.attributes.width && t.attributes.width.value.indexOf("%") > -1 && (styleval = t.attributes.width.value), t.style.width && t.style.width.indexOf("%") > -1 && (styleval = t.style.width)
                                }
                                if ("height" == attr) {
                                    try {
                                        t.offsetHeight && (n.style.height = t.offsetHeight, n.oneline && (n.style.height = t.offsetHeight - 4))
                                    } catch (e) {}
                                    t.attributes.height && t.attributes.height.value.indexOf("%") > -1 && (styleval = t.attributes.height.value), t.style.height && t.style.height.indexOf("%") > -1 && (styleval = t.style.height)
                                }
                                styleval += "", styleval.toUpperCase && "AUTO" != styleval.toUpperCase() && "INHERIT" != styleval.toUpperCase() && (n.style[attr] = styleval)
                            } catch (e) {}
                            for (stylesToCopy = ["cursor", "font-size", "line-height", "font-family", "font-weight", "font-style", "color", "text-transform", "text-decoration", "line-height", "text-align", "vertical-align", "direction"], stylesToSet = ["cursor", "fontSize", "lineHeight", "fontFamily", "fontWeight", "fontStyle", "color", "textTransform", "textDecoration", "lineHeight", "textAlign", "verticalAlign", "direction"], mycss = "", csstext = "#" + n.id + " p   , #+" + n.id + " span {", i = 0; i < stylesToCopy.length; i++) try {
                                csstext += stylesToCopy[i] + " : " + t.currentStyle[stylesToSet[i]] + "; "
                            } catch (e) {}
                            csstext += "margin:  0; ", csstext += "padding: 0; ", csstext += "border: 0; ", csstext += "} ", this.addCss(csstext)
                    }
                    if (n.isLiveSpellProxy = !0, n.className = "livespell_textarea", n.setAttribute("hasFocus", !1), n.style.display = livespell.inlineblock(), livespell.test.IE() && (n.style.cursor = "text"), "none" == t.style.display && (n.style.display = "none"), t.style.display = "none", t.style.visibility = "hidden", t.tabIndex && (n.tabIndex = t.tabIndex), t.title && (n.title = t.title), t.hasLiveSpellProxy = !0, livespell.test.IE()) try {
                        t.readOnly = memreadonly
                    } catch (e) {}
                    if (!livespell.test.browserNoAYT()) {
                        try {
                            document.body.setAttribute = "false"
                        } catch (e) {}
                        try {
                            document.body.spellcheck = !1
                        } catch (e) {}
                    }
                    "auto" == t.style.height && (n.style.height = "auto"), n.spellcheck = !0, livespell.insitu.cloneClientEvents(t, n), t.title && (n.title = t.title), n.maxLength && (livespell.events.add(n, "keyup", function() {
                        livespell.insitu.maxCharsHandler
                    }, !1), livespell.events.add(n, "keypress", livespell.insitu.maxCharsHandler, !0), livespell.events.add(n, "keydown", livespell.insitu.maxCharsHandler, !1), livespell.events.add(n, "paste", livespell.insitu.maxCharsHandler, !1)), livespell.events.add(n, "mouseup", function() {
                        livespell.insitu.updateBase(id)
                    }, !1), livespell.events.add(n, "keyup", function() {
                        livespell.insitu.updateBase(id)
                    }, !1);
                    try {
                        livespell.events.add(n, "cut", function() {
                            livespell.insitu.updateBaseDelay(id)
                        }, !1)
                    } catch (e) {}
                    livespell.events.add(n, "keypress", livespell.insitu.keypresshandler, !0), livespell.events.add(n, "keydown", livespell.insitu.keyhandler, !1), livespell.events.add(n, "blur", livespell.insitu.blurhandler, !1), livespell.events.add(n, "focus", livespell.insitu.focushandler, !1), n.unChanged = !0, livespell.test.IE() && ((livespell.test.IE7() || livespell.test.IE6()) && (n.onblur = function() {
                        var bid = n.id.replace(livespell.insitu._FIELDSUFFIX, "");
                        livespell.insitu.updateBase(bid)
                    }), n.mouseup = function() {
                        try {
                            var bid = n.id.replace(livespell.insitu._FIELDSUFFIX, "");
                            livespell.insitu.updateBase(bid)
                        } catch (e) {}
                    }, n.ondrop = function(e) {
                        if (!e || !e.dataTransfer) return !0;
                        var newContent = e.dataTransfer.getData("Text") + "";
                        if ("null" == newContent) return !1;
                        n.focus();
                        var cursorPos = document.selection.createRange().duplicate();
                        return cursorPos.pasteHTML(newContent), livespell.insitu.updateBase(t.id), !1
                    }), livespell.test.FireFox() ? (n.ondrop = function(e) {
                        var newContent = e.dataTransfer.getData("text/plain") + "",
                            cp = (n.innerHTML, document.caretPositionFromPoint(e.pageX, e.pageY));
                        n.focus();
                        var selection = window.getSelection();
                        selection.removeAllRanges();
                        var range = document.createRange();
                        return range.setStart(cp.offsetNode, cp.offset), selection.addRange(range), document.execCommand("inserttext", !1, newContent), livespell.insitu.updateBase(t.id), !1
                    }, n.onpaste = function() {
                        var marker = "\0\ufeff",
                            carretbuddyid = "_livespell__temp___273728",
                            caretbuddy = "<span id='" + carretbuddyid + "'>|</span>",
                            sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            var range = sel.getRangeAt(0);
                            range.deleteContents(), range.insertNode(document.createTextNode(marker));
                            var valueBeforePaste = n.innerHTML;
                            n.innerHTML = "";
                            var ff_onafterpaste = function() {
                                var newContent = n.textContent,
                                    caretNode = document.getElementById(carretbuddyid);
                                caretNode && caretNode.parentNode && caretNode.parentNode.removeChild(caretNode), n.innerHTML = valueBeforePaste.replace(marker, caretbuddy);
                                var caretNode = document.getElementById(carretbuddyid);
                                n.focus();
                                var selection = window.getSelection();
                                selection.removeAllRanges();
                                var range = document.createRange();
                                range.selectNode(caretNode), selection.addRange(range), document.execCommand("inserttext", !1, newContent), livespell.insitu.updateBase(t.id)
                            };
                            setTimeout(ff_onafterpaste, 1)
                        }
                    }) : n.onpaste = function() {
                        try {
                            event || (event = window.event)
                        } catch (e) {}
                        try {
                            if (!window.getSelection) return document.selection.createRange().text = livespell.str.trim(clipboardData.getData("Text")), livespell.insitu.updateBase(t.id), !1;
                            var sel = window.getSelection();
                            if (sel.getRangeAt && sel.rangeCount) {
                                range = sel.getRangeAt(0), range.deleteContents();
                                var text = livespell.str.trim(clipboardData.getData("Text"));
                                return range.insertNode(document.createTextNode(text)), livespell.insitu.updateBase(t.id), !1
                            }
                        } catch (e) {
                            setTimeout(function() {
                                livespell.insitu.updateBase(t.id)
                            }, 1)
                        }
                    }, t.setValue = function(val) {
                        t.value = val;
                        try {
                            livespell.insitu.updateProxy(t.id, val)
                        } catch (e) {}
                    }, t.getValue = function() {
                        try {
                            livespell.insitu.updateBase(t.id)
                        } catch (e) {}
                        return t.value
                    }, n.setValue = function(val) {
                        t.value = val;
                        try {
                            livespell.insitu.setProxyHTMLAndMaintainCaret(t.id, val)
                        } catch (e) {}
                    }, n.getValue = function() {
                        try {
                            return livespell.insitu.getProxyText(t.id)
                        } catch (e) {}
                        return t.value
                    }, t.focus = function() {
                        try {
                            n.focus()
                        } catch (e) {}
                    };
                    var trueparent = t.parentNode,
                        truesib = t;
                    if (livespell.test.IE())
                        for (;
                            "P" == trueparent.nodeName || "H1" == trueparent.nodeName || "H2" == trueparent.nodeName || "H3" == trueparent.nodeName || "H4" == trueparent.nodeName || "H5" == trueparent.nodeName || "H6" == trueparent.nodeName;) truesib = trueparent, trueparent = trueparent.parentNode;
                    trueparent.hasChildNodes ? trueparent.insertBefore(n, truesib) : trueparent.appendChild(n);
                    var o = livespell.insitu.proxyDOM(id);
                    if (o.hasFocus = !1, livespell.events.add(o, "focus", function() {
                            o.hasFocus = !0
                        }, !1), livespell.events.add(o, "blur", function() {
                            o.hasFocus = !1
                        }, !1), livespell.liveProxys = livespell.array.safepush(livespell.liveProxys, id), this.setProxyText(id, E$(id).value), t.readOnly) livespell.test.IE() && (n.style.display = "inline-block");
                    else {
                        n.contentEditable = "true";
                        try {
                            n.contentEditable = "PLAINtext-onLY"
                        } catch (e) {
                            n.contentEditable = "true"
                        }
                        "plaintext-only" !== n.contentEditable && (n.contentEditable = "true"), n.designMode = "on"
                    }
                    return n.disabled = t.disabled, n.readOnly = t.readOnly, n.setAttribute("spellcheck", !1), n.spellcheck = !1, n.oneline && (n.className = n.className + " ls_input"), o
                }
            }
        },
        cloneClientEventsHelper: function(from, to, sevent) {
            var element = from,
                proxy = to,
                event = sevent,
                fn = function() {
                    if (document.createEventObject) {
                        var evt = document.createEventObject();
                        element.fireEvent("on" + event, evt)
                    } else {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent(event, !0, !0), element.dispatchEvent(evt)
                    }
                };
            livespell.events.add(proxy, event, fn, !1)
        },
        cloneClientEvents: function(from, to) {
            for (var clientevents = ["onblur", "onfocus", "onscroll", "onclick", "ondblclick", "ondragstart", "onkeydown", "onkeypress", "onkeyup", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup"], k = 0; k < clientevents.length; k++) {
                var event = clientevents[k].replace("on", "");
                this.cloneClientEventsHelper(from, to, event)
            }
        },
        addCss: function(cssCode) {
            try {
                var styleElement = document.createElement("style");
                styleElement.type = "text/css", styleElement.styleSheet ? styleElement.styleSheet.cssText = cssCode : styleElement.appendChild(document.createTextNode(cssCode)), document.getElementsByTagName("head")[0].appendChild(styleElement)
            } catch (e) {}
        },
        renderProxy: function(fieldList, providerID) {
            if (fieldList) {
                fieldList.join || (fieldList = fieldList.split(","));
                for (var resent = !1, j = 0; j < fieldList.length; j++) {
                    var id = fieldList[j];
                    if (livespell.insitu.proxyDOM(id)) {
                        for (var token, show_error, strDoc = livespell.str.stripSpans(livespell.insitu.getProxyHTML(id)), tokens = livespell.str.tokenize(strDoc), rawtokens = livespell.str.tokenize(strDoc, "RAW"), tokens_startsentence = [], tokens_isword = [], i = 0; i < tokens.length; i++) {
                            token = tokens[i];
                            var rtoken = rawtokens[i];
                            tokens_isword[i] = livespell.test.isword(token), tokens_startsentence[i] = tokens_isword && (0 === i || livespell.test.eos(tokens[i - 1])), show_error = !1;
                            var reason = livespell.cache.reason[this.provider(providerID).Language][token] ? livespell.cache.reason[this.provider(providerID).Language][token] : "";
                            if (tokens_isword[i]) {
                                if ("undefined" == typeof livespell.test.spelling(token, this.provider(providerID).Language)) {
                                    if (!resent) {
                                        var fxs = this.provider(providerID);
                                        show_error = !1, setTimeout(function() {
                                            fxs.CheckInSitu()
                                        }, 10), resent = !0
                                    }
                                    continue
                                }
                                1 != livespell.test.spelling(token, this.provider(providerID).Language) && (show_error = !0), show_error && (this.provider(providerID).IgnoreAllCaps && token === token.toUpperCase() && "B" !== reason && "E" !== reason && (show_error = !1), this.provider(providerID).IgnoreNumeric && livespell.test.num(token) && "B" !== reason && "E" !== reason && (show_error = !1), this.provider(providerID).CaseSensitive || "C" != reason || (show_error = !1)), !tokens_startsentence[i] && i > 1 && this.provider(providerID).CheckGrammar && token.toUpperCase() === tokens[i - 2].toUpperCase() && token.toUpperCase() != token.toLowerCase() && (show_error = !0, reason = "R"), !show_error && this.provider(providerID).CaseSensitive && this.provider(providerID).CheckGrammar && tokens_startsentence[i] && livespell.test.lcFirst(token) && (!show_error && strDoc.indexOf(".") > 0 || strDoc.indexOf("!") > 0 || strDoc.indexOf("?") > 0 || strDoc.length > 50) && (show_error = !0, reason = "G")
                            }
                            if (show_error) {
                                var wiggleClass = "livespell_redwiggle";
                                "R" !== reason && "G" !== reason || (wiggleClass = "livespell_greenwiggle"), livespell.test.iPhone() ? tokens[i] = "<span class='" + wiggleClass + "' onclick='this.className=\"\"' >" + token + "</span>" : tokens[i] = "<span class='" + wiggleClass + "' oncontextmenu='return false' onmousedown='return livespell.insitu.disableclick(event,\"" + providerID + "\");' onmouseup=';return livespell.insitu.typoclick(event,\"" + id + '",this,"' + reason + '","' + providerID + "\")' >" + rtoken + "</span>"
                            } else tokens[i] = rtoken
                        }
                        var text = tokens.join("");
                        livespell.insitu.proxyDOM(id).hasFocus || livespell.context.isOpen() ? this.setProxyHTMLAndMaintainCaret(id, text) : this.setProxyHTML(id, text)
                    } else;
                }
            }
        },
        init: function() {
            livespell.insitu.initiated || (livespell.insitu.initiated = !0, livespell.context.renderShell(), livespell.events.add(window.document, "mousedown", livespell.context.hideIfNotinUse, !1), livespell.events.add(window.document, "keydown", livespell.context.hide, !1), livespell.userDict.load(), livespell.context.hide())
        },
        idcount: 0,
        filterTextAreas: function(Area) {
            var ok = !0;
            return "none" == Area.style.display && (ok = !1), "hidden" == Area.style.visibility && (ok = !1), !ok && Area.hasLiveSpellProxy && (ok = !0), Area.disabled && (ok = !1), ok && (Area.id || (Area.id = "livespell__textarea__" + livespell.insitu.idcount++)), ok
        },
        filterTextInputs: function(Area) {
            return 1 == Area.hasSpellProxy || ("text" !== Area.type.toLowerCase() || Area.disabled || "none" === Area.style.display || "hidden" === Area.style.visibility || (Area.id || (Area.id = "livespell__input__" + livespell.insitu.idcount++), Area.hasSpellProxy = !0), Area.hasSpellProxy)
        },
        filerEditors: function(elem) {
            if ("div" == elem.nodeName.toLowerCase()) {
                var mydiv = elem;
                if (mydiv && (1 == mydiv.getAttribute("contenteditable") || "true" === mydiv.getAttribute("contenteditable")) && (mydiv.id || (mydiv.id = "livespell_rich_div_editor_id_" + livespell.insitu.idcount++), mydiv.id.indexOf("__livespell_proxy") == -1)) return !0
            }
            if ("iframe" == elem.nodeName.toLowerCase()) {
                var myFrame = elem;
                if (oDoc = livespell.getIframeDocument(myFrame), oDoc) return myFrame.id || (myFrame.id = "livespell_rich_editor_id_" + livespell.insitu.idcount++), !0
            }
        },
        focushandler: function(e) {
            e.srcElement ? e.srcElement : this
        },
        blurhandler: function(e) {
            var me = e.srcElement ? e.srcElement : this;
            if (!me.unChanged) {
                me.unChanged = !0;
                var base_field_id = me.id.split(livespell.insitu._FIELDSUFFIX)[0];
                livespell.context.notifyBaseFieldOnChange(base_field_id)
            }
        },
        keypresshandler: function(e) {
            try {
                e || (e = window.event)
            } catch (e) {}
            e.cancelBubble = !0, e.stopPropagation && e.stopPropagation()
        },
        maxCharsHandlerTimeOutId: null,
        maxCharsHandler: function(event) {
            var obj = event.srcElement ? event.srcElement : this,
                maxChars = obj.maxLength;
            if (!maxChars) return !0;
            var o = obj;
            clearTimeout(livespell.insitu.maxCharsHandlerTimeOutId), livespell.insitu.maxCharsHandlerTimeOutId = setTimeout(function() {
                livespell.insitu.strictMaxChars(o)
            }, 3);
            var base_field_id = o.id.split(livespell.insitu._FIELDSUFFIX)[0],
                numChars = livespell.insitu.getProxyText(base_field_id).length;
            if (numChars >= maxChars) {
                try {
                    event || (event = window.event)
                } catch (e) {}
                var ch8r = event.keyCode,
                    hasRange = !1,
                    txt = "";
                try {
                    window.getSelection ? txt = window.getSelection() : document.getSelection ? txt = document.getSelection() : document.selection && (txt = document.selection.createRange().text)
                } catch (e) {}
                if (txt + "" != "" && (hasRange = !0), !(hasRange || 8 == ch8r || 9 == ch8r || 46 == ch8r || (ch8r > 15 && ch8r < 32 || ch8r > 32 && ch8r < 41) && 127 != ch8r)) {
                    try {
                        event || (event = window.event)
                    } catch (e) {}
                    return event.preventDefault && event.preventDefault(), event.returnValue = !1, !1
                }
            }
            return event.returnValue = !0, !0
        },
        strictMaxChars: function(obj) {
            var base_field_id = obj.id.split(livespell.insitu._FIELDSUFFIX)[0],
                text = livespell.insitu.getProxyText(base_field_id),
                numChars = text.length;
            numChars > obj.maxLength && obj.setValue(text.substring(0, obj.maxLength))
        },
        keyhandler: function(event) {
            var returnfalse = !1;
            try {
                event || (event = window.event)
            } catch (e) {}
            var ch8r = event.keyCode;
            if (!(ch8r >= 16 && ch8r <= 31 || ch8r >= 37 && ch8r <= 40)) {
                var me = event.srcElement ? event.srcElement : this;
                if (me.oneline && ch8r >= 10 && ch8r <= 13) return event.preventDefault && event.preventDefault(), event.returnValue = !1, !1;
                if (livespell.insitu.ignoreAtCursor(), me.unChanged = !1, me.hasFocus = !0, me.autocheck) {
                    var base_field_id = me.id.split(livespell.insitu._FIELDSUFFIX)[0];
                    livespell.context.validate(base_field_id);
                    var ProviderId = Number(me.autocheckProvider),
                        oProvider = livespell.spellingProviders[ProviderId];
                    clearTimeout(livespell.cache.checkTimeout), livespell.cache.checkTimeout = setTimeout(function() {
                        livespell.insitu.checkNow(base_field_id, ProviderId)
                    }, 32 == ch8r ? 10 : oProvider.Delay)
                }
                return !returnfalse && void 0
            }
        },
        ignoreAtCursor: function() {
            var target;
            try {
                window.getSelection ? (target = window.getSelection().focusNode, "SPAN" !== target.nodeName.toUpperCase() && (target = target.parentNode)) : document.selection && (target = document.selection.createRange().parentElement())
            } catch (e) {}
            target && "SPAN" === target.nodeName.toUpperCase() && (target.className = "", target.onmousedown = null)
        },
        disableclick: function(event, providerID) {
            var prov = livespell.spellingProviders[providerID];
            return !(!prov || !prov.RightClickOnly || 2 == event.button) || (event.preventDefault ? event.preventDefault() : event.returnValue = !1, !1)
        },
        MacCommandKeyDown: !1,
        typoclick: function(event, oparent, ospan, reason, providerID) {
            var prov = livespell.spellingProviders[providerID];
            if (prov && prov.RightClickOnly && 2 != event.button) return !0;
            event.preventDefault ? event.preventDefault() : event.returnValue = !1, livespell.context.caller = ospan, livespell.context.callerParent = oparent;
            for (var parent, p_walker = ospan; !parent;) "DIV" === p_walker.nodeName.toUpperCase() && (p_walker.id + "").indexOf(livespell.insitu._FIELDSUFFIX) > -1 ? parent = p_walker : p_walker = p_walker.parentNode;
            var id = parent.id.split(this._FIELDSUFFIX)[0];
            if (!id.length) return !1;
            var token = livespell.str.stripTags(ospan.innerHTML);
            token = livespell.str.normalizeApos(token);
            var posx = 0,
                posy = 0;
            return event || (event = window.event), event.pageX || event.pageY ? (posx = event.pageX, posy = event.pageY) : (event.clientX || event.clientY) && (posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop), posx += 2, posy += 2, livespell.test.IE() && (posx += 3, posy += 3), livespell.context.DOM().className = "livespell_contextmenu", livespell.context.DOM().style.position = "absolute", livespell.context.DOM().style.top = posy + "px", livespell.context.DOM().style.left = posx + "px", livespell.context.providerID = providerID, livespell.context.suggest(id, token, reason, ospan), !1
        }
    }, livespell.context = {
        mouseoverme: !1,
        caller: null,
        callerParent: null,
        keysTrapped: !1,
        providerID: null,
        mackeydown: function(event) {
            try {
                event || (event = window.event)
            } catch (e) {}
            return event.keyCode && 224 == event.keyCode && (livespell.insitu.MacCommandKeyDown = !0), !1
        },
        mackeyup: function() {
            return livespell.context.MacCommandKeyDown && (livespell.insitu.MacCommandKeyDown = !1), !1
        },
        validate: function(base_field_id) {
            var oF = document.getElementById(base_field_id);
            if (oF && oF.MessageHolder) {
                var proxy = livespell.insitu.proxyDOM(base_field_id);
                if (proxy) {
                    var wiggles = proxy.getElementsByTagName("SPAN"),
                        isValid = !0;
                    if (proxy.innerHTML.indexOf("livespell_") > -1)
                        for (var i = 0; i < wiggles.length; i++) {
                            var wig = wiggles[i];
                            wig && wig.className && ("livespell_redwiggle" == wig.className || "livespell_greenwiggle" == wig.className) && wig.innerHTML.length > 0 && (isValid = !1)
                        }
                    $Spelling.LiveValidateMech4Proxy(oF, isValid)
                }
            }
        },
        currentWord: function() {
            return livespell.context.caller.innerHTML
        },
        provider: function() {
            return livespell.spellingProviders[this.providerID]
        },
        isOpen: function() {
            return !(!E$(livespell.insitu._CONTEXTMENU) || "none" == E$(livespell.insitu._CONTEXTMENU).style.display)
        },
        DOM: function() {
            return E$(livespell.insitu._CONTEXTMENU)
        },
        langInSelection: !1,
        hideIfNotinUse: function() {
            "none" != livespell.context.DOM().style.display && !livespell.context.mouseoverme & !livespell.context.langInSelection && livespell.context.hide()
        },
        hide: function() {
            "none" != livespell.context.DOM().style.display && (livespell.context.DOM().style.display = "none")
        },
        notifyBaseFieldOnChange: function(base_field_id) {
            var oBase = E$(base_field_id);
            if (oBase.onchange) try {
                oBase.onchange()
            } catch (e) {}
            var event = "change",
                element = oBase;
            if (document.createEvent) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, !0, !0), element.dispatchEvent(evt)
            } else try {
                var evt = document.createEventObject();
                element.fireEvent("on" + event, evt)
            } catch (e) {}
        },
        change: function(word) {
            this.provider().onChangeWord(this.currentWord(), word);
            var b = this.base_field_id(),
                basefield = E$(b + livespell.insitu._FIELDSUFFIX);
            try {
                basefield.insertBefore(document.createTextNode(word), livespell.context.caller), basefield.removeChild(livespell.context.caller)
            } catch (e) {
                livespell.context.caller.innerHTML = word, livespell.context.caller.onMouseUp = function() {}, livespell.context.caller.onMouseDown = function() {}, livespell.context.caller.className = " "
            }
            this.hide(), livespell.context.validate(b), livespell.insitu.updateBase(b), livespell.context.notifyBaseFieldOnChange(b);
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
        },
        ignore: function() {
            this.provider().onIgnore(this.currentWord());
            var b = (livespell.context.caller, this.base_field_id()),
                basefield = livespell.context.caller.parentNode ? livespell.context.caller.parentNode : document.getElementById(b) + livespell.insitu._FIELDSUFFIX;
            livespell.cache.ignore[this.currentWord().toLowerCase()] = !0;
            try {
                basefield.insertBefore(document.createTextNode(this.currentWord()), livespell.context.caller), basefield.removeChild(livespell.context.caller)
            } catch (e) {
                livespell.context.caller.onMouseUp = function() {}, livespell.context.caller.onMouseDown = function() {}, livespell.context.caller.className = " "
            }
            livespell.context.validate(b), this.hide();
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
        },
        del: function() {
            var b = this.base_field_id(),
                p = livespell.context.caller,
                pp = p.parentNode;
            pp.removeChild(p), this.hide(), livespell.insitu.updateBase(b), livespell.context.validate(b), livespell.context.notifyBaseFieldOnChange(b);
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
        },
        ignoreAll: function() {
            var b = this.base_field_id();
            this.provider().onIgnoreAll(this.currentWord()), livespell.cache.ignore[this.currentWord().toLowerCase()] = !0;
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
            livespell.insitu.renderProxy(this.base_field_id(), this.providerID);
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
            livespell.context.validate(b), this.hide()
        },
        addPersonal: function() {
            var b = this.base_field_id();
            "SERVER" == this.provider().AddWordsToDictionary && livespell.ajax.send("SAVEWORD", this.currentWord(), 0, 0, this.providerID), this.provider().onLearnWord(this.currentWord()), word = this.currentWord().toLowerCase(), livespell.userDict.add(word);
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
            livespell.insitu.renderProxy(this.base_field_id(), this.providerID);
            try {
                E$(b + livespell.insitu._FIELDSUFFIX).focus()
            } catch (e) {}
            livespell.context.validate(b), this.hide()
        },
        changeLanguage: function(strLang) {
            if (this.provider().Language != strLang) {
                if (window.getSelection) {
                    var sel = window.getSelection();
                    try {
                        sel.collapseToEnd()
                    } catch (e) {}
                }
                this.provider().Language = strLang, this.provider().onChangeLanguage(strLang);
                var tProv = this.provider(),
                    fn = function() {
                        tProv.CheckInSitu()
                    };
                setTimeout(fn, 100), this.hide()
            }
        },
        showMultiLang: function() {
            E$("livepell__multilanguage").style.display = "block";
            for (var livelangs = livespell.insitu.provider(this.providerID).Language.split(","), i = 0; i < livespell.cache.langs.length; i++) {
                E$("livepell__multilanguage_" + livespell.cache.langs[i]).checked = !1;
                for (var j = 0; j < livelangs.length; j++) livespell.cache.langs[i] === livelangs[j].replace(/^\s\s*/, "").replace(/\s\s*$/, "") && (E$("livepell__multilanguage_" + livespell.cache.langs[i]).checked = !0)
            }
        },
        hideMultiLang: function() {
            E$("livepell__multilanguage").style.display = "none"
        },
        base_field_id: function() {
            if (livespell.context.callerParent) return livespell.context.callerParent.split(livespell.insitu._FIELDSUFFIX)[0];
            for (var parent = null, p_walker = livespell.context.caller; !parent;) "DIV" === p_walker.nodeName.toUpperCase() && (p_walker.id + "").indexOf(livespell.insitu._FIELDSUFFIX) > -1 ? parent = p_walker : p_walker = p_walker.parentNode;
            return parent.id.split(livespell.insitu._FIELDSUFFIX)[0]
        },
        showMenu: function(id, word, reason, providerID) {
            this.providerID = providerID, this.DOM().style.display = "block";
            var j, action = "REPLACE",
                suggs = livespell.cache.suggestions[livespell.spellingProviders[providerID].Language][word];
            switch (reason) {
                case "B":
                    suggs = [], suggs[0] = livespell.lang.fetch(providerID, "MENU_DELETEBANNED"), action = "DELETE";
                    break;
                case "R":
                    suggs = [], suggs[0] = livespell.lang.fetch(providerID, "MENU_DELETEREPEATED"), action = "DELETE";
                    break;
                case "G":
                    for (suggs.length || (suggs[0] = word), j = 0; j < suggs.length; j++) suggs[j] = livespell.str.toCaps(suggs[j]);
                    break;
                default:
                    var oCase = livespell.str.getCase(word);
                    if (2 === oCase)
                        for (j = 0; j < suggs.length; j++) suggs[j] = suggs[j].toUpperCase();
                    else if (1 === oCase)
                        for (j = 0; j < suggs.length; j++) suggs[j] = livespell.str.toCaps(suggs[j])
            }
            suggs.length && 0 !== suggs[0].length || (suggs = [], suggs[0] = livespell.lang.fetch(providerID, "MENU_NOSUGGESTIONS"), action = "IGNORE"), "X" === reason && (action = "REG", livespell.spellingProviders[providerID].isUniPacked && (suggs = new Array("JavaScriptSpellCheck", "**Trial**", "Please register online", "javascriptspellcheck.com")));
            var dsuggs = [];
            for (j = 0; j < suggs.length; j++) dsuggs = livespell.array.safepush(dsuggs, suggs[j]);
            this.render(dsuggs, action, providerID, reason)
        },
        setMultiLang: function() {
            for (var langboxes = document.getElementById("livepell__multilanguage").getElementsByTagName("input"), checked = [], i = 0; i < langboxes.length; i++) {
                var box = langboxes[i];
                box.checked && checked.push(box.value)
            }
            checked.length && (this.provider().Language = checked.join(","), this.provider().onChangeLanguage(this.provider().Language), livespell.insitu.checkNow(this.base_field_id(), this.providerID), this.hide())
        },
        renderShell: function() {
            if (!E$(livespell.context.DOM())) {
                var n = document.createElement("div");
                n.setAttribute("id", livespell.insitu._CONTEXTMENU), document.body.appendChild(n), n.onmouseover = function() {
                    livespell.context.mouseoverme = !0
                }, n.onmouseout = function() {
                    livespell.context.mouseoverme = !1
                }, !this.keysTrapped && livespell.test.IE() && (livespell.events.add(document.body, "keydown", this.menukey, !1), this.keysTrapped = !0)
            }
        },
        menukey: function() {
            return !livespell.context.isOpen() || (event.preventDefault ? event.preventDefault() : event.returnValue = !1, !1)
        },
        css_list: Array(),
        renderCss: function(strTheme) {
            var idname = "__livespell__stylesheet";
            if (strTheme = strTheme ? strTheme : "classic", !this.css_list[strTheme]) {
                var fileref = E$(idname);
                fileref ? fileref.setAttribute("href", livespell.installPath + "themes/" + strTheme + "/context-menu.css") : (fileref = document.createElement("link"), fileref.setAttribute("id", idname), fileref.id = idname, fileref.setAttribute("rel", "stylesheet"), fileref.setAttribute("type", "text/css"), fileref.setAttribute("href", livespell.installPath + "themes/" + strTheme + "/context-menu.css"), document.getElementsByTagName("head")[0].appendChild(fileref), livespell.test.IE() && (fileref = document.createElement("link"), fileref.setAttribute("id", idname), fileref.id = idname, fileref.setAttribute("rel", "stylesheet"), fileref.setAttribute("type", "text/css"), fileref.setAttribute("href", livespell.installPath + "themes/" + strTheme + "/ieonly.css"), document.getElementsByTagName("head")[0].appendChild(fileref))), this.css_list[strTheme] = !0
            }
        },
        buttonIsHidden: function(strId, providerID) {
            for (var oProvider = livespell.spellingProviders[providerID], arrHideButtons = oProvider.HiddenButtons.split(","), i = 0; i < arrHideButtons.length; i++) {
                var strBtn = arrHideButtons[i];
                if (strBtn.toLowerCase() === strId.toLowerCase()) return !0
            }
            return !1
        },
        render: function(suggs, action, providerID, reason) {
            if (livespell.test.iPhone()) return !1;
            var menuHTML = '<div id="context__back"><div id="context__front">';
            menuHTML += "<ul>";
            for (var i, j = 0; j < suggs.length; j++) switch (action) {
                case "REPLACE":
                    menuHTML += '<li class="ls_sug"><a href="#"  onclick="livespell.context.change(this.innerHTML); return false" >' + suggs[j] + "</a></li>";
                    break;
                case "IGNORE":
                    menuHTML += '<li class="ls_sug"><a href="#" onclick="livespell.context.ignore(); ; return false" >' + suggs[j] + "</a></li>";
                    break;
                case "REG":
                    livespell.spellingProviders[providerID].isUniPacked ? menuHTML += '<li class="ls_sug" ><a href="#"   onclick="window.open(\'http://www.javascriptspellcheck.com/Purchase\');return false;" >' + suggs[j] + "</a></li>" : "asp.net" == livespell.spellingProviders[providerID].ServerModel.toLowerCase() || "aspx" == livespell.spellingProviders[providerID].ServerModel.toLowerCase() ? (menuHTML += '<li class="ls_sug" ><a href="#"  onclick="window.open(\'http://www.aspnetspell.com/Purchase\');return false;" >ASPNetSpell Trial</a></li>', suggs = [""]) : "asp" == livespell.spellingProviders[providerID].ServerModel.toLowerCase() ? (menuHTML += '<li class="ls_sug" ><a href="#"" onclick="window.open(\'http://www.aspspellcheck.com/purchase\');return false;" >ASPSpellCheck Trial</a></li>', suggs = [""]) : (menuHTML += '<li class="ls_sug" ><a href="#" onclick="window.open(\'http://www.phpspellcheck.com/Purchase\');return false;" >PHPSpellCheck Trial</a></li>',
                        suggs = [""]);
                    break;
                case "DELETE":
                    menuHTML += '<li class="ls_sug" ><a href="#" onclick="livespell.context.del(); return false" >' + suggs[j] + "</a></li>"
            }
            if (menuHTML += '<li class="ls_hr" ><hr /></li>', this.buttonIsHidden("menuIgnore", providerID) || "B" == reason || (menuHTML += '<li><a href="#" onclick="livespell.context.ignore(); return false">' + livespell.lang.fetch(providerID, "MENU_IGNORE") + "</a></li>"), this.buttonIsHidden("menuIgnoreAll", providerID) || "B" == reason || (menuHTML += '<li><a href="#"  onclick="livespell.context.ignoreAll(); return false">' + livespell.lang.fetch(providerID, "MENU_IGNOREALL") + "</a></li>"), this.buttonIsHidden("menuAddToDict", providerID) || "B" == reason || "E" == reason || "NONE" == livespell.spellingProviders[providerID].AddWordsToDictionary || (menuHTML += '<li><a href="#"  onclick="livespell.context.addPersonal(); return false">' + livespell.lang.fetch(providerID, "MENU_LEARN") + "</a></li>"), livespell.cache.langs.length, livespell.spellingProviders[providerID].ShowLangInContextMenu) {
                menuHTML += '<li class="ls_hr" ><hr /></li>';
                var doMultipleDict = !1;
                if (1 == livespell.MultipleDictionaries && livespell.MultipleDictionaries && (doMultipleDict = !0), livespell.spellingProviders[providerID].Language.indexOf(",") > 0 && (livespell.MultipleDictionaries = !0, doMultipleDict = !0), doMultipleDict) {
                    for (menuHTML += "<li><a href='javascript:livespell.context.showMultiLang()' >" + livespell.lang.fetch(providerID, "MENU_LANGUAGES") + "</a></li>", menuHTML += '<li id="livepell__multilanguage" style="display:none">', menuHTML += livespell.cache.langs.length > 5 ? '<div  class="livespell_contextmenu_multilang_container_scroll" >' : '<div class="livespell_contextmenu_multilang_container_noscroll" >', i = 0; i < livespell.cache.langs.length; i++) menuHTML += "<label>", menuHTML += '<input type="checkbox" id="livepell__multilanguage_' + livespell.cache.langs[i] + '" value="' + livespell.cache.langs[i] + '" />', menuHTML += livespell.cache.langs[i], menuHTML += "</label>", menuHTML += "<br/>";
                    menuHTML += "</div>", menuHTML += '<input type="button" value="' + livespell.lang.fetch(providerID, "MENU_CANCEL") + '" onclick="livespell.context.hideMultiLang()" /> ', menuHTML += '<input type="button" value="' + livespell.lang.fetch(providerID, "MENU_APPLY") + '" onclick="livespell.context.setMultiLang()" /> ', menuHTML += "</li>"
                } else {
                    for (menuHTML += '<li class="li_lang">', menuHTML += '<select onblur="livespell.context.langInSelection=false;"  onfocus="livespell.context.langInSelection=true" onchange="livespell.context.langInSelection=false;livespell.context.changeLanguage(this.options[this.selectedIndex].value);"  >', i = 0; i < livespell.cache.langs.length; i++) {
                        var strselection = livespell.cache.langs[i] === livespell.spellingProviders[providerID].Language ? " selected = selected " : "";
                        menuHTML += "<option   " + strselection + ' value="' + livespell.cache.langs[i] + '"  >' + livespell.cache.langs[i] + "</option>"
                    }
                    menuHTML += "</select>"
                }
            }
            menuHTML += "</ul></div></div>", this.DOM().innerHTML = menuHTML;
            try {
                this.boundMenuToScreen()
            } catch (e) {}
        },
        boundMenuToScreen: function() {
            var oscreen = this.DimViewport(),
                ws = oscreen.width,
                hs = oscreen.height,
                px = parseInt(this.DOM().style.left.toString().replace("px", "")),
                py = parseInt(this.DOM().style.top.toString().replace("px", ""));
            scrollx = document.body.scrollLeft + document.documentElement.scrollLeft, scrolly = document.body.scrollTop + document.documentElement.scrollTop;
            var dmenu = this.DimMenu(),
                wm = dmenu.width,
                hm = dmenu.height;
            if (hm + py - scrolly > hs) {
                var gy = hs - hm + scrolly - 3;
                gy < 0 && (gy = 0), this.DOM().style.top = gy + "px"
            }
            if (wm + px - scrollx > ws) {
                var gx = ws - wm + scrollx - 3;
                gx < 0 && (gx = 0), this.DOM().style.left = gx + "px"
            }
        },
        DimViewport: function() {
            var w = 0,
                h = 0;
            "number" == typeof window.innerWidth ? (w = window.innerWidth, h = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (w = document.documentElement.clientWidth, h = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (w = document.body.clientWidth, h = document.body.clientHeight);
            var o = [];
            return o.width = w, o.height = h, o
        },
        DimMenu: function() {
            var o = this.DOM(),
                w = 0,
                h = 0;
            "number" == typeof o.innerWidth ? (w = o.innerWidth, h = o.innerHeight) : (o.clientWidth || o.clientHeight) && (w = o.clientWidth, h = o.clientHeight);
            var o = [];
            return o.width = w, o.height = h, o
        },
        suggest: function(id, word, reason, caller) {
            var Lang = [livespell.spellingProviders[this.providerID].Language];
            return livespell.cache.suggestionrequest = {}, livespell.cache.suggestions[Lang] && livespell.cache.suggestions[Lang][word] ? livespell.context.showMenu(id, word, reason, this.providerID) : (livespell.cache.suggestionrequest.id = id, livespell.cache.suggestionrequest.word = word, livespell.cache.suggestionrequest.reason = reason, livespell.cache.suggestionrequest.providerID = this.providerID, void livespell.ajax.send("CTXSUGGEST", word, Lang, livespell.cache.langs.length ? "" : "ADDLANGS", this.providerID))
        }
    }, document.addEventListener && navigator && navigator.userAgent.toUpperCase().indexOf("WINDOWS") > 0 && document.addEventListener && document.addEventListener("click", livespell___FF__clickmanager, !0), setup___livespell()
}
"undefined" != typeof jQuery && ! function($) {
    $.fn.binSpellCheckFields = function(options) {
        var options = $.extend(livespell$defaults, options);
        livespell$set(options);
        var fields = [];
        return this.each(function() {
            fields[fields.length] = this
        }), 0 == fields.length || $Spelling.BinSpellCheckFields(fields)
    }, $.fn.spellAsYouType = function(options) {
        var options = $.extend(livespell$defaults, options);
        livespell$set(options);
        var fields = [];
        return this.each(function() {
            fields[fields.length] = this
        }), 0 == fields.length || $Spelling.SpellCheckAsYouType(fields)
    }, $.fn.spellCheckInDialog = function(options) {
        var options = $.extend(livespell$defaults, options);
        livespell$set(options);
        var fields = [];
        return this.each(function() {
            fields[fields.length] = this
        }), 0 == fields.length || $Spelling.SpellCheckInWindow(fields)
    };
    var livespell$set = function(options) {
            for (var map = livespell$defaults_map, alt = livespell$defaults_alt, i = 0; i < map.length; i++) $Spelling[map[i]] = options[alt[i]]
        },
        livespell$defaults = {
            defaultDictionary: "English (International)",
            userInterfaceTranslation: "en",
            showStatisticsScreen: !0,
            submitFormById: "",
            theme: "modern",
            caseSensitive: !0,
            checkGrammar: !0,
            ignoreAllCaps: !0,
            ignoreNumbers: !0,
            showThesaurus: !0,
            showLanguagesInContextMenu: !0,
            serverModel: "auto",
            popUpStyle: "modal"
        },
        livespell$defaults_map = ["DefaultDictionary", "UserInterfaceTranslation", "ShowStatisticsScreen", "SubmitFormById", "Theme", "CaseSensitive", "CheckGrammar", "IgnoreAllCaps", "IgnoreNumbers", "ShowThesaurus", "ShowLanguagesInContextMenu", "ServerModel", "PopUpStyle"],
        livespell$defaults_alt = ["defaultDictionary", "userInterfaceTranslation", "showStatisticsScreen", "submitFormById", "theme", "caseSensitive", "checkGrammar", "ignoreAllCaps", "ignoreNumbers", "showThesaurus", "showLanguagesInContextMenu", "serverModel", "popUpStyle"]
}(jQuery);