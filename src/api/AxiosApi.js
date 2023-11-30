import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";

const AxiosApi = {
  header: (token) => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
  },
  // 로그인
  memberLogin: async (email, pw) => {
    console.log("로그인 : ", email, pw);
    const login = {
      email: email,
      password: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },
  //회원 전체 조회
  memberGet: async () => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/users/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 회원 조회
  memberGetOne: async (token) => {
    return await axios.get(KH_DOMAIN + "/users/detail", AxiosApi.header(token));
  },

  // 회원 가입
  memberReg: async (email, pwd, name) => {
    const member = {
      email: email,
      password: pwd,
      name: name,
    };
    return await axios.post(KH_DOMAIN + "/auth/signup", member);
  },
  // 회원 가입 여부 확인
  memberRegCheck: async (email) => {
    console.log("가입 가능 여부 확인 : ", email);
    return await axios.get(KH_DOMAIN + `/auth/exists/${email}`);
  },
  // 회원 정보 수정
  memberUpdate: async (email, name, image) => {
    const token = localStorage.getItem("accessToken");
    console.log("회원 정보 수정 : ", email, name, image);
    const member = {
      email: email,
      name: name,
      image: image,
    };
    return await axios.put(KH_DOMAIN + `/users/modify`, member, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },

  // 회원 탈퇴
  memberDel: async (id) => {
    const del = {
      id: id,
    };
    return await axios.post(KH_DOMAIN + "/user/delete", del);
  },
  // 게시글 조회
  boardList: async () => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + "/api/board/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 게시글 상세 조회
  boardDetail: async (boardId) => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/board/detail/${boardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 게시글 쓰기
  boardWrite: async (email, title, categoryId, content, img) => {
    const token = localStorage.getItem("token");
    const board = {
      email: email,
      title: title,
      categoryId: categoryId,
      content: content,
      img: img,
    };
    return await axios.post(KH_DOMAIN + "/api/board/new", board, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 게시글에 달린 댓글 조회
  commentList: async (boardId) => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/comment/list/${boardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 댓글 쓰기
  commentWrite: async (email, boardId, content) => {
    const token = localStorage.getItem("accessToken");
    console.log("댓글 쓰기 : ", email, boardId, content);
    const comment = {
      boardId: boardId,
      email: email,
      content: content,
    };
    return await axios.post(KH_DOMAIN + `/api/comment/new`, comment, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 카테고리 조회
  cateList: async () => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/category/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 카테고리 쓰기
  cateInsert: async (email, category) => {
    const token = localStorage.getItem("accessToken");
    const cate = {
      email: email,
      categoryName: category,
    };
    return await axios.post(KH_DOMAIN + "/api/category/new", cate, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 카테고리 삭제
  cateDelete: async (categoryId) => {
    const token = localStorage.getItem("accessToken");
    return await axios.delete(
      KH_DOMAIN + `/api/category/delete/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  // 카테고리 수정
  cateUpdate: async (todoId) => {
    const token = localStorage.getItem("accessToken");
    return await axios.put(KH_DOMAIN + `/api/todo/${todoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 영화 목록 조회
  movieList: async () => {
    return await axios.get(KH_DOMAIN + "/movies/list");
  },
  // 영화 페이지 수 조회
  moviePage: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/movies/list/count?page=${page}&size=${size}`
    );
  },
  // 영화 페이지네이션 조회
  moviePageList: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/movies/list/page?page=${page}&size=${size}`
    );
  },
  // 채팅방 목록 보기
  chatList: async () => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + "/chat/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 채팅방 생성
  chatCreate: async (email, name) => {
    const token = localStorage.getItem("accessToken");
    const chat = {
      email: email,
      name: name,
    };
    return await axios.post(KH_DOMAIN + "/chat/new", chat, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 채팅방 정보
  chatInfo: async (chatId) => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/chat/chatroom/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // 이전 채팅 가져오기
  recentChatLoad: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/message/${roomId}`);
  },
};
export default AxiosApi;
