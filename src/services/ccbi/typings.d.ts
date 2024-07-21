declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChartDetail = {
    code?: number;
    data?: ChartDetail;
    message?: string;
  };

  type BaseResponseChartResponse = {
    code?: number;
    data?: ChartResponse;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponsePageChartDetail = {
    code?: number;
    data?: PageChartDetail;
    message?: string;
  };

  type BaseResponsePageChartDetailVO = {
    code?: number;
    data?: PageChartVODetail;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    title?: string;
  };

  type ChartDetail = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    generateChart?: string;
    generateResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    isPublic?: number;
    taskId?: string;
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type ChartVO = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    generateChart?: string;
    generateResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    isPublic?: number;
    taskId?: string;
    status: string;
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
    title?: string;
  };

  type ChartQueryRequest = {
    chartData?: string;
    chartType?: string;
    current?: number;
    goal?: string;
    pageSize?: number;
    publicOnly?: boolean;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: string;
  };

  type ChartResponse = {
    chartId?: string;
    generateChart?: string;
    generateResult?: string;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    title?: string;
  };

  type deleteChartUsingPOSTParams = {
    /** chartId */
    chartId?: string;
  };

  type deleteUserUsingPOSTParams = {
    /** userId */
    userId?: string;
  };

  type generateChartUsingPOSTParams = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    title?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    id?: string;
    avatar?: string;
    username?: string;
    profile?: string;
    role?: number;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChartDetail = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ChartDetail[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageChartVODetail = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ChartVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    account?: string;
    avatar?: string;
    createTime?: string;
    id?: string;
    isDelete?: number;
    mpopenId?: string;
    password?: string;
    profile?: string;
    role?: number;
    roleEnumValue?: 'ADMIN' | 'BAN' | 'USER';
    unionId?: string;
    updateTime?: string;
    username?: string;
  };

  type UserAddRequest = {
    account?: string;
    avatar?: string;
    role?: string;
    username?: string;
  };

  type userLoginUsingPOSTParams = {
    /** account */
    account?: string;
    /** password */
    password?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: string;
    mpOpenId?: string;
    pageSize?: number;
    profile?: string;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userRole?: string;
    username?: string;
  };

  type userRegisterUsingPOSTParams = {
    /** account */
    account?: string;
    /** checkPassword */
    checkPassword?: string;
    /** password */
    password?: string;
  };

  type UserUpdateMyRequest = {
    avatar?: string;
    profile?: string;
    username?: string;
  };

  type UserUpdateRequest = {
    avatar?: string;
    id?: string;
    profile?: string;
    userRole?: string;
    username?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
