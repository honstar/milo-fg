/* ************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2023 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
************************************************************************* */

// eslint-disable-next-line import/no-extraneous-dependencies
const openwhisk = require('openwhisk');
const { getAioLogger } = require('../utils');

// This returns the activation ID of the action that it called
function main(args) {
    const logger = getAioLogger();
    let payload;
    try {
        const { spToken, adminPageUri, projectExcelPath } = args;
        if (!spToken || !adminPageUri || !projectExcelPath) {
            payload = 'Required data is not available to proceed with FG Promote action.';
            logger.error(payload);
        } else {
            const ow = openwhisk();
            return ow.actions.invoke({
                name: 'milo-fg/copy-worker',
                blocking: false, // this is the flag that instructs to execute the worker asynchronous
                result: false,
                params: args
            });
        }
    } catch (err) {
        logger.error(err);
        payload = err;
    }

    return {
        body: payload,
    };
}

exports.main = main;
