

import SkeletonInput from "antd/es/skeleton/Input";
import React from "react";
const RenderLoading = (loading,children) => loading ? <SkeletonInput /> : children;

export default RenderLoading