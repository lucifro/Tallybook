"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_data_select + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const alignmentFormData = common_vendor.ref({
      title: "",
      time: "",
      type: "",
      account: "",
      remarks: ""
    });
    const range = [
      {
        value: 0,
        text: "支出"
      },
      {
        value: 1,
        text: "收入"
      }
    ];
    const formRole = common_vendor.ref(null);
    const rulesviod = common_vendor.ref({
      title: {
        rules: [{
          required: true,
          errorMessage: "请进行填写"
        }]
      },
      time: {
        rules: [{
          required: true,
          errorMessage: "请进行填写"
        }]
      },
      type: {
        rules: [{
          required: true,
          errorMessage: "请进行填写"
        }]
      },
      account: {
        rules: [{
          required: true,
          errorMessage: "请进行填写"
        }]
      }
    });
    const addbtn = () => {
      formRole.value.validate().then(async (res) => {
        let data = await api_index.addlist({
          title: res.title,
          time: res.time,
          type: res.type,
          account: res.account,
          remarks: res.remarks
        });
        if (data.code == "200") {
          common_vendor.index.showToast({
            title: data.msg,
            icon: "success"
          });
          common_vendor.index.navigateTo({
            url: "/pages/index"
          });
        } else {
          common_vendor.index.showToast({
            title: data.msg,
            icon: "error"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => alignmentFormData.value.title = $event),
        b: common_vendor.p({
          modelValue: alignmentFormData.value.title
        }),
        c: common_vendor.p({
          label: "事项",
          name: "title"
        }),
        d: common_vendor.o(($event) => alignmentFormData.value.time = $event),
        e: common_vendor.p({
          type: "date",
          ["clear-icon"]: true,
          modelValue: alignmentFormData.value.time
        }),
        f: common_vendor.p({
          label: "发生时间",
          name: "time"
        }),
        g: common_vendor.o(($event) => alignmentFormData.value.type = $event),
        h: common_vendor.p({
          localdata: range,
          modelValue: alignmentFormData.value.type
        }),
        i: common_vendor.p({
          label: "类型",
          name: "type"
        }),
        j: common_vendor.o(($event) => alignmentFormData.value.account = $event),
        k: common_vendor.p({
          modelValue: alignmentFormData.value.account
        }),
        l: common_vendor.p({
          label: "金额",
          name: "account"
        }),
        m: common_vendor.o(($event) => alignmentFormData.value.remarks = $event),
        n: common_vendor.p({
          modelValue: alignmentFormData.value.remarks
        }),
        o: common_vendor.p({
          label: "备注",
          name: "remarks"
        }),
        p: common_vendor.sr(formRole, "1cd35ab0-0", {
          "k": "formRole"
        }),
        q: common_vendor.p({
          modelValue: alignmentFormData.value,
          ["label-position"]: "top",
          rules: rulesviod.value
        }),
        r: common_vendor.o(addbtn)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cd35ab0"], ["__file", "E:/book/node/nodejob/app/Tallybook/pages/create/index.vue"]]);
wx.createPage(MiniProgramPage);
