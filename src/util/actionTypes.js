export default function actionTypes(scope, action) {
    return {
        REQUESTED: `${scope}/${action}_REQUESTED`,
        SUCCEEDED: `${scope}/${action}_SUCCEEDED`,
        FAILED: `${scope}/${action}_FAILED`
    };
}