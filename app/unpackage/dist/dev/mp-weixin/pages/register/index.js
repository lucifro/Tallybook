"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const alignmentFormData = common_vendor.ref({
      account: "",
      password: ""
    });
    const formRole = common_vendor.ref(null);
    const rulesviod = common_vendor.ref({
      account: {
        rules: [
          {
            required: true,
            errorMessage: "请填写密码"
          },
          {
            minLength: 8,
            maxLength: 16,
            errorMessage: "长度在 8 到 16 个字符"
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "请填写密码"
          },
          {
            minLength: 8,
            maxLength: 16,
            errorMessage: "长度在 8 到 16 个字符"
          }
        ]
      }
    });
    const registerbtn = () => {
      formRole.value.validate().then(async (res) => {
        let data = await api_index.reg({
          account: res.account,
          password: res.password
        });
        if (data.code == "200") {
          common_vendor.index.navigateTo({
            url: "/pages/login/index"
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
        a: common_vendor.o(($event) => alignmentFormData.value.account = $event),
        b: common_vendor.p({
          modelValue: alignmentFormData.value.account
        }),
        c: common_vendor.p({
          label: "用户名",
          name: "account"
        }),
        d: common_vendor.o(($event) => alignmentFormData.value.password = $event),
        e: common_vendor.p({
          modelValue: alignmentFormData.value.password
        }),
        f: common_vendor.p({
          label: "密码",
          name: "password"
        }),
        g: common_vendor.sr(formRole, "46a64346-0", {
          "k": "formRole"
        }),
        h: common_vendor.p({
          modelValue: alignmentFormData.value,
          ["label-position"]: "top",
          rules: rulesviod.value
        }),
        i: common_vendor.o(registerbtn)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46a64346"], ["__file", "E:/book/node/nodejob/app/Tallybook/pages/register/index.vue"]]);
wx.createPage(MiniProgramPage);
