Vue.component('lad-calculator', {
    template: '#lad-calculator-template',
    data() {
        return {
            YYYY_MM_DD: "YYYY-MM-DD",
            SPA_AMOUNT: "local_spa_amount",
            mcoPeriod: 167,
            unitLADPercentage: 0.1,
            cfLADPercentage: 0.2,
            defaultVPETA: "2024-04-30",
            defaultCfCCCDate: "2024-03-27",
            defaultSPADate: "2019-01-28",
            spaDate: "2019-01-28",
            purchaseAmount: 300000,
            estimatedVP: "2024-04-30",
            showMCOOffset: true,
            mcoOffsetLAD: false,
            showMessage: false,
        };
    },
    computed: {
        delayInDays() {
            return this.getDelayInDays(this.showMCOOffset, this.estimatedVP) || 0;
        },
        unitLADAmount() {
            return ((this.unitLADPercentage * this.purchaseAmount * this.getDelayInDays(this.showMCOOffset, this.estimatedVP)) / 365) || 0;
        },
        cfLADAmount() {
            return ((this.cfLADPercentage * this.purchaseAmount * this.unitLADPercentage * this.getDelayInDays(this.mcoOffsetLAD, this.defaultCfCCCDate)) / 365) || 0;
        },
        totalLADAmount() {
            return (this.unitLADAmount + this.cfLADAmount) || 0;
        }
    },
    watch: {
        purchaseAmount(newAmount) {
            localStorage.setItem(this.SPA_AMOUNT, newAmount);
        }
    },
    methods: {
        getDelayInDays(withMCO, cutOffDate) {
            const spaDeliveryDate = moment(this.spaDate).add(36, "month");
            const diffDays = moment(cutOffDate).diff(spaDeliveryDate, "days");
            const delay_days = withMCO ? diffDays - this.mcoPeriod : diffDays;
            this.showMessage = delay_days <= 0 ? true : false ;
            return delay_days > 0 ? delay_days : 0;
        },
        clearCachedData() {
            localStorage.removeItem(this.SPA_DATE);
            localStorage.removeItem(this.SPA_AMOUNT);
            this.spaDate = null;
            this.estimatedVP = null;
            this.defaultCfCCCDate = null;
            this.purchaseAmount = 0;
        }
    }
});

new Vue({
    el: '#app'
});