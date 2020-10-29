define(function(require, exports, module) {
    'use strict';

    const _ = require('underscore');
    const SelectFilter = require('oro/filter/select-filter');
    const MultiselectDecorator = require('orofrontend/js/app/datafilter/frontend-multiselect-decorator');
    const FilterCountHelper = require('orofrontend/js/app/filter-count-helper');
    let config = require('module-config').default(module.id);

    config = _.extend({
        closeAfterChose: true
    }, config);

    const FrontendSelectFilter = SelectFilter.extend(_.extend({}, FilterCountHelper, {
        /**
         * @property
         */
        closeAfterChose: config.closeAfterChose,

        /**
         * @property
         */
        MultiselectDecorator: MultiselectDecorator,

        /**
         * Select widget options
         *
         * @property
         */
        widgetOptions: {
            multiple: false,
            classes: 'select-filter-widget'
        },

        /**
         * Selector for filter area
         *
         * @property
         */
        containerSelector: '.filter-criteria-selector',

        /**
         * @property {Object}
         */
        listen: {
            'metadata-loaded': 'onMetadataLoaded',
            'total-records-count-updated': 'onTotalRecordsCountUpdate',
            'filters-manager:after-applying-state mediator': 'rerenderFilter'
        },

        /**
         * @inheritDoc
         */
        constructor: function FrontendSelectFilter(options) {
            FrontendSelectFilter.__super__.constructor.call(this, options);
        },

        /**
         * @inheritDoc
         */
        getTemplateData: function() {
            const templateData = FrontendSelectFilter.__super__.getTemplateData.call(this);

            return this.filterTemplateData(templateData);
        },

        /**
         * @inheritDoc
         * @return {jQuery}
         */
        _appendToContainer: function() {
            return this.isToggleMode() ? this.$el.find('.filter-criteria') : this.dropdownContainer;
        },

        /**
         * @inheritDoc
         */
        render: function() {
            if (this.isToggleMode()) {
                this.widgetOptions = _.defaults(this.widgetOptions, {
                    hideHeader: false,
                    additionalClass: false
                });
            }
            return FrontendSelectFilter.__super__.render.call(this);
        },

        /**
         * Handle click on criteria selector
         *
         * @param {Event} e
         * @protected
         */
        _onClickFilterArea: function(e) {
            e.stopPropagation();

            if (this.isToggleMode()) {
                this.toggleFilter();
            } else {
                FrontendSelectFilter.__super__._onClickFilterArea.call(this, e);
            }
        },

        toggleFilter: function() {
            if (!this.selectDropdownOpened) {
                this._setButtonPressed(this.$(this.containerSelector), true);
                this.selectWidget.multiselect('open');
                this.selectDropdownOpened = true;
            } else {
                this._setButtonPressed(this.$(this.containerSelector), false);
                this.selectDropdownOpened = false;
            }
        },

        /**
         * @inheritDoc
         */
        reset: function() {
            FrontendSelectFilter.__super__.reset.call(this);

            if (this.isToggleMode() && this.autoClose !== false) {
                this.selectDropdownOpened = true;
                this.toggleFilter();
            }
        },

        /**
         * @inheritDoc
         */
        _getSelectWidgetPosition: function() {
            const position = FrontendSelectFilter.__super__._getSelectWidgetPosition.call(this);

            return _.extend({}, position, {
                my: 'left top'
            });
        },

        isToggleMode: function() {
            return this.renderMode === 'toggle-mode';
        }
    }));

    return FrontendSelectFilter;
});
