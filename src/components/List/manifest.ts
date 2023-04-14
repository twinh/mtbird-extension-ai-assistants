import {SchemaGenerator, COMPONENT} from "@mtbird/core";
import {IComponentManifest, IComponentInstanceForm} from "@mtbird/shared";

const {
    COMPONENT_DEFAULT_STYLE,
} = COMPONENT;

const DEFAULT_LIST_OPTIONS = [
    {
        label: "PC 端",
    },
    {
        label: "更多应用",
    },
    {
        label: "下载 APP",
    },
    {
        label: "关于我们",
    },
];

const ENTITY = [
    {
        title: "名称",
        keyPath: "label",
        type: "string",
        default: "",
        isRequired: true,
    },
    {
        title: "图标",
        keyPath: "icon",
        type: "string",
        default: "",
        isRequired: false,
    },
    {
        title: "链接",
        keyPath: "href",
        type: "string",
        default: "",
        isRequired: false,
    },
];

const manifest: IComponentManifest<IComponentInstanceForm> = {
    type: "component",
    componentName: "List",
    title: "列表",
    icon: "mtbird-unorderedlist",
    desc: "",
    category: "basic",
    schema: [
        ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
        ...SchemaGenerator.list("列表项", "data.options", ENTITY as any),
    ],
    instance: {
        type: "component",
        componentName: "List",
        props: {
            style: {
                ...COMPONENT_DEFAULT_STYLE,
                height: 200,
                width: 375,
            },
        },
        data: {
            options: DEFAULT_LIST_OPTIONS,
        },
        editing: {
            showMask: true,
        },
    },
};

export default manifest;