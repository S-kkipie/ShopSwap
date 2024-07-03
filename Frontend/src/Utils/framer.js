import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children } from "react";
import { addPropertyControls, ControlType, RenderTarget } from "framer";
import { motion, useMotionValue, useTransform } from "framer-motion";
/**
 * ANIMATOR
 *
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 200
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */ export default function Animator(props) {
    /* Properties */ const { pathAnimation, from, to, animate, shouldLoop, loopOptions, slots = [], endCircle } = props;
    /* State */ const hasChildren = Children.count(slots) > 0;
    /* Empty State */ let customShape = /*#__PURE__*/ _jsxs("div", { style: placeholderStyles, children: [/*#__PURE__*/ _jsx("div", { style: emojiStyles, children: "✍️" }), /*#__PURE__*/ _jsx("p", { style: titleStyles, children: "Connect to Graphic" }), /*#__PURE__*/ _jsx("p", { style: subtitleStyles, children: "Animates single or joined paths on Web Pages only." })] });
    if (hasChildren) {
        /* Grab the SVG from the Graphic */ const firstChild = getFirstChild(slots);
        const svgChild = getFirstChild(firstChild.props.svg);
        const isSpring = pathAnimation.type === "spring";
        /* Shape transition properties */ /* Dividing stiffness and damping by 1000 is a trick I got from Matt 
        which helps with pathLength animations, which otherwise are so fast 
        you never even see them happen in the preview. */ const shapeTransition = { pathLength: { ...pathAnimation, repeat: shouldLoop ? Infinity : 0, repeatType: loopOptions, stiffness: isSpring ? pathAnimation.stiffness / 1e3 : pathAnimation.stiffness, damping: isSpring ? pathAnimation.damping / 1e3 : pathAnimation.damping } };
        /* Add our own properties to the Path */ const pathLength = useMotionValue(0);
        const opacity = useTransform(pathLength, [0, 0.025], [0, 1]);
        const shapeProps = { variants: { start: { pathLength: from / 100 }, end: { pathLength: to / 100 } }, transition: shapeTransition };
        /* Prevent animating or adjusting pathLength on the Canvas */ const isCanvas = RenderTarget.current() === RenderTarget.canvas;
        /* Just render the full connected Graphic on Canvas, when connected */ if (isCanvas) {
            customShape = firstChild;
        }
        /* If on a web page */ if (!isCanvas && svgChild) {
            /* Pass Attributes */ let attributes = svgChild.match(/[\w-]+="[^"]*"/g);
            let pathD;
            let stroke;
            let strokeWidth;
            let strokeLinecap;
            let strokeLinejoin;
            for (const element of attributes) {
                if (element.includes("d=")) {
                    pathD = splitAndReplace(element);
                }
                if (element.includes("stroke=")) {
                    stroke = splitAndReplace(element);
                }
                if (element.includes("stroke-width=")) {
                    strokeWidth = splitAndReplace(element);
                }
                if (element.includes("stroke-linecap=")) {
                    strokeLinecap = splitAndReplace(element);
                }
                if (element.includes("stroke-linejoin=")) {
                    strokeLinejoin = splitAndReplace(element);
                }
            }
            /* Grab viewbox */ let svgViewbox;
            svgViewbox = svgChild.split("viewBox=")[1];
            svgViewbox = svgViewbox.split(">")[0];
            svgViewbox = svgViewbox.replace(/^"(.+(?="$))"$/, "$1");
            customShape = /*#__PURE__*/ _jsx(motion.div, {
                initial: isCanvas || animate === false ? false : "start",
                animate: isCanvas || animate === false ? false : "end",
                style: { width: "100%", height: "100%", display: "flex", placeContent: "center", placeItems: "center", backgroundColor: "transparent", overflow: "hidden" },
                children: /*#__PURE__*/ _jsx(motion.svg, {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "100%",
                    height: "100%",
                    viewBox: svgViewbox,
                    children: /*#__PURE__*/ _jsx(motion.path, { ...shapeProps, d: pathD, stroke: stroke, strokeWidth: strokeWidth, strokeLinejoin: strokeLinejoin, strokeLinecap: strokeLinecap, fill: "transparent", style: !endCircle && { pathLength, opacity }, initial: isCanvas || animate === false ? false : "start", animate: isCanvas || animate === false ? false : "end" }),
                }),
            });
        }
    }
    return customShape;
}
/* Default Properties */ Animator.defaultProps = { animate: true, shouldLoop: false, loopOptions: "reverse", from: 0, to: 100, pathAnimation: { type: "tween", duration: 2 }, endCircle: true };
/* Property Controls */ addPropertyControls(Animator, {
    slots: { type: ControlType.ComponentInstance, title: "Children" },
    animate: { title: "Animate", type: ControlType.Boolean, defaultValue: Animator.defaultProps.animate, enabledTitle: "True", disabledTitle: "False" },
    shouldLoop: {
        title: "Loop",
        type: ControlType.Boolean,
        defaultValue: Animator.defaultProps.shouldLoop,
        enabledTitle: "True",
        disabledTitle: "False",
        hidden(props) {
            return props.animate === false;
        },
    },
    loopOptions: {
        type: ControlType.Enum,
        title: "Type",
        defaultValue: Animator.defaultProps.loopOptions,
        options: ["loop", "reverse", "mirror"],
        optionTitles: ["Loop", "Reverse", "Mirror"],
        hidden(props) {
            return props.shouldLoop === false;
        },
    },
    endCircle: {
        title: "End Circle",
        type: ControlType.Boolean,
        defaultValue: Animator.defaultProps.endCircle,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden(props) {
            return props.animate === false;
        },
    },
    from: {
        title: "From",
        type: ControlType.Number,
        min: 0,
        max: 100,
        displayStepper: true,
        step: 1,
        defaultValue: Animator.defaultProps.from,
        unit: "%",
        hidden(props) {
            return props.animate === false;
        },
    },
    to: {
        title: "To",
        type: ControlType.Number,
        min: 0,
        max: 100,
        displayStepper: true,
        step: 1,
        defaultValue: Animator.defaultProps.to,
        unit: "%",
        hidden(props) {
            return props.animate === false;
        },
    },
    pathAnimation: {
        title: " ",
        type: ControlType.Transition,
        defaultValue: Animator.defaultProps.pathAnimation,
        hidden(props) {
            return props.animate === false;
        },
    },
});
/* Method to get stringless attributes */ const splitAndReplace = (string) => {
    return string.split("=")[1].replace(/['"]+/g, "");
};
/* Method to get the first child */ function getFirstChild(slots) {
    let firstChild;
    Children.map(slots, (child) => {
        if (firstChild === undefined) {
            firstChild = child;
        }
    });
    return firstChild;
}
/* Styles */ const placeholderStyles = { display: "flex", width: "100%", height: "100%", placeContent: "center", placeItems: "center", flexDirection: "column", color: "#96F", background: "rgba(136, 85, 255, 0.1)", fontSize: 11, overflow: "hidden" };
const emojiStyles = { fontSize: 32, marginBottom: 10 };
const titleStyles = { margin: 0, marginBottom: 10, fontWeight: 600, textAlign: "center" };
const subtitleStyles = { margin: 0, opacity: 0.7, maxWidth: 150, lineHeight: 1.5, textAlign: "center" };
export const __FramerMetadata__ = { exports: { default: { type: "reactComponent", name: "Animator", slots: [], annotations: { framerIntrinsicHeight: "200", framerSupportedLayoutWidth: "fixed", framerSupportedLayoutHeight: "fixed", framerIntrinsicWidth: "200", framerContractVersion: "1", framerDisableUnlink: "*" } }, __FramerMetadata__: { type: "variable" } } };
//# sourceMappingURL=./Animator.map
