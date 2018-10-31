var textSize = {
    variables: function () {
        this.attributes = ["h1", "h2", "h3", "h4", "h5", "h6", "span", "p", "li", "a", "button", "address", "figcaption"];
        this.body = document.body.getElementsByTagName("*");
        this.fontLarge = document.getElementById("fontLarge");
        this.fontSmall = document.getElementById("fontSmall");
        this.fontDefault = document.getElementById("fontDefault");
    },
    _getAll: function () {
        return this.body;
    },
    _getLength: function () {
        return this._getAll().length;
    },
    _getTag: function () {
        var i;
        var out;
        var ar = new Array();
        var total = this._getLength();
        for (i = 0; i < total; i++) {
            var allTag = this._getAll()[i];
            var tag = this._getAll()[i].localName;
            if (this.attributes.indexOf(tag) != -1) {
                ar.push(this._getAll()[i]);
            }
        }
        return ar;
    },
    _writeCss: function () {
        var AllCss;
        var defaultFontSize;
        var ar = new Array();
        var css = this._getTag().map(function (obj, key) {
            AllCss = getComputedStyle(obj);
            defaultFontSize = AllCss.fontSize;
            obj.setAttribute("data-defaultSize", defaultFontSize);
            obj.style.fontSize = defaultFontSize;
            return css;
        });
        return ar;
    },
    _largeFontSize: function () {
        var currentFontSize;
        var _getTag = this._getTag();
        this.fontLarge.addEventListener("click", function () {
            var css = _getTag.map(function (obj, key) {
                currentFontSize = Number(obj.style.fontSize.replace("px", ""));
                var def = parseInt(currentFontSize);
                var add = parseInt(2);
                //obj.style.fontSize = (def + add)+"px"; // fontsize add or
                obj.style.setProperty('font-size', (def + add) + 'px', 'important'); // fontsize large !important add
                return css;
            });
        });
    },
    _smallFontSize: function () {
        var currentFontSize;
        var _getTag = this._getTag();
        this.fontSmall.addEventListener("click", function () {
            var css = _getTag.map(function (obj, key) {
                currentFontSize = Number(obj.style.fontSize.replace("px", ""));
                var def = parseInt(currentFontSize);
                var remove = parseInt(2);
                //obj.style.fontSize = (def - remove)+"px"; // fontsize remove or
                obj.style.setProperty('font-size', (def - remove) + 'px', 'important'); // fontsize small !important add
                return css;
            });
        });
    },
    _defaultFontSize: function () {
        var currentFontSize;
        var defaultFontSize;
        var _getTag = this._getTag();
        this.fontDefault.addEventListener("click", function () {
            var css = _getTag.map(function (obj, key) {
                currentFontSize = Number(obj.style.fontSize.replace("px", ""));
                var defaultFontSize = obj.getAttribute("data-defaultSize");
                console.log(defaultFontSize);
                obj.style.fontSize = defaultFontSize;
                return css;
            });
        });
    },
    _allFontRemove: function () {
        var _getTag = this._getTag();
        var timeout = 300;
        window.addEventListener("resize", function () {
            var css = _getTag.map(function (obj, key) {
                obj.style.fontSize = null;
                setTimeout(function () {
                    textSize._writeCss();
                }, timeout);
                return;
            });
        });
    },
    _packages: function () {
        this.variables();
        this._writeCss();
        this._largeFontSize();
        this._smallFontSize();
        this._defaultFontSize();
        this._allFontRemove();
    }
};
textSize._packages();