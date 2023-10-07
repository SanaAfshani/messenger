// components/Icon.tsx
import React, { ReactElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
/**
 * An Icon set.
 *
 * @param {object} type - Define an icon.
 * @param {object} style - Used to set styles for icons.
 * @param {string} className - The desired class Name for icons.
 * @returns {object} An Icon set.
 */
interface IconProps {
    type: keyof typeof IconWrapper;
    className?: string;
    style?: React.CSSProperties;
}

const iconPretext = 'icon-';

const IconWrapper: Record<string, ReactElement> = {
    settings: <span className={`${iconPretext}settings`}/>,
    line: <span className={`${iconPretext}line`}/>,
    chat: <span className={`${iconPretext}chat`}/>,
    search: <span className={`${iconPretext}search`}/>,
    send: <span className={`${iconPretext}send`}/>,
    left: <span className={`${iconPretext}left`}/>,
    plus: <span className={`${iconPretext}plus`}/>,
};

/** @function
 * @name Icon
 * @returns Requirment class name and style for icon is added.
 */
const Icon: React.FC<IconProps> = ({ type, className, style }) => {
    const result = IconWrapper[type];

    let finalProps = { ...style };
    if (className) {
        finalProps = {
            ...finalProps,
            className: `${result.props.className} ${className}`,
        };
    }

    return cloneElement(result, finalProps);
};

Icon.propTypes = {
    type: PropTypes.oneOf(Object.keys(IconWrapper)).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default Icon;
