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
          errorMessage: "请填写事项名称"
        }]
      },
      time: {
        rules: [{
          required: true,
          errorMessage: "请选择发生时间"
        }]
      },
      type: {
        rules: [{
          required: true,
          errorMessage: "请选择类型"
        }]
      },
      account: {
        rules: [{
          required: true,
          errorMessage: "请填写金额"
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
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/index"
            });
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: data.msg,
            icon: "error"
          });
        }
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.o(($event) => alignmentFormData.value.title = $event),
        c: common_vendor.p({
          placeholder: "请输入事项名称",
          modelValue: alignmentFormData.value.title
        }),
        d: common_vendor.p({
          label: "事项",
          name: "title"
        }),
        e: common_vendor.o(($event) => alignmentFormData.value.time = $event),
        f: common_vendor.p({
          type: "date",
          ["clear-icon"]: true,
          modelValue: alignmentFormData.value.time
        }),
        g: common_vendor.p({
          label: "发生时间",
          name: "time"
        }),
        h: common_vendor.o(($event) => alignmentFormData.value.type = $event),
        i: common_vendor.p({
          localdata: range,
          modelValue: alignmentFormData.value.type
        }),
        j: common_vendor.p({
          label: "类型",
          name: "type"
        }),
        k: common_vendor.o(($event) => alignmentFormData.value.account = $event),
        l: common_vendor.p({
          placeholder: "请输入金额",
          type: "number",
          modelValue: alignmentFormData.value.account
        }),
        m: common_vendor.p({
          label: "金额",
          name: "account"
        }),
        n: common_vendor.o(($event) => alignmentFormData.value.remarks = $event),
        o: common_vendor.p({
          placeholder: "请输入备注信息（可选）",
          modelValue: alignmentFormData.value.remarks
        }),
        p: common_vendor.p({
          label: "备注",
          name: "remarks"
        }),
        q: common_vendor.sr(formRole, "1cd35ab0-0", {
          "k": "formRole"
        }),
        r: common_vendor.p({
          modelValue: alignmentFormData.value,
          ["label-position"]: "top",
          rules: rulesviod.value
        }),
        s: common_vendor.o(addbtn)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cd35ab0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/create/index.js.map
