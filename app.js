const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const jiraHeaders = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
    'Dnt': '1',
    'Priority': 'u=1, i',
    'Referer': 'https://oneline.atlassian.net/jira/software/c/projects/POM/boards/1397/backlog?assignee=712020%3A57970fdc-0a95-4799-bd50-60b6872834b0',
    'Sec-Ch-Ua': '"Chromium";v="133", "Not(A:Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    'X-Atlassian-Capability': 'COMPANY_MANAGED_BACKLOG--other',
    'X-B3-Spanid': 'b61f15a116edfda8',
    'X-B3-Traceid': '2b64d7092f87c46a1b61f15a116edfda8',
    'Cookie': process.env.JIRA_ONE_COOKIE
};

const cyberHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Host': 'blueprint.cyberlogitec.com.vn',
    'Referer': 'https://blueprint.cyberlogitec.com.vn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'Cookie': process.env.CYBER_COOKIE
}

async function getCornalIssues() {
  try {
      const response = await axios.get('https://oneline.atlassian.net/rest/greenhopper/1.0/xboard/plan/v2/backlog/data?forceConsistency=true&operation=fetchBacklogData&rapidViewId=1397', { headers: jiraHeaders })

      const cornalIssues = response.data.issues.filter(issue => issue.assigneeName === "Cornal Nguyen")
      .map(issue => ({
          key: issue?.key || '',
          summary: issue?.summary || '',
          status: issue?.statusName || '',
          assignee: issue?.assigneeName || ''
      }))

      return cornalIssues;
  } catch (error) {
      console.error(`Error fetching data`, error.message);
      throw new Error('Error fetching issues from Jira');
  }
}

async function postNewRequirement() {
  try {
    const data = {
        "requirementVO": {
            "pjtId": "PJT20220609000000001",
            "pjtNm": "Chorus",
            "cateId": "PJT20231113000000004",
            "cateNm": "POOL",
            "prntReqId": "0",
            "subPjtId": "PJT20230329000000001",
            "mode": 1,
            "jbTpCd": "REQ_JOB_TPRPT",
            "jbTpNm": "Reporting",
            "bizProcId": "ABP20220825000000001",
            "bizProcNm": "Task",
            "reqCtnt": "<p>Test</p>",
            "reqTxtCtnt": "Test",
            "itrtnId": "ITR20220609000000001",
            "imptTpCd": "IMPT_TP_CDLOW",
            "imptNm": "Low",
            "reqTitNm": "Test",
            "crntReqCntn": "",
            "prvsReqCntn": "",
            "emailFlg": "N",
            "arrSkd": [
                {
                    "asgnList": [
                        {
                            "usrId": "duynd",
                            "usrNm": "Duy Nguyen Dang"
                        }
                    ],
                    "className": "com.dou.pim.models.UserAssignVO",
                    "efrtPctNo": 5,
                    "estmDueDt": "202502121638",
                    "mode": 0,
                    "pctNo": 0,
                    "phsCd": "PIM_PHS_CDREG",
                    "phsNm": "Register",
                    "plnDueDt": "202502121638",
                    "plnStDt": "202502121638",
                    "prntPhsId": "0",
                    "procPhsId": "APP20220825000000001",
                    "wrkHrNo": 0,
                    "usrId": "duynd",
                    "usrNm": "Duy Nguyen Dang"
                },
                {
                    "asgnList": [
                        {
                            "usrId": "linhpnk",
                            "usrNm": "Linh Phan Nhat Khanh"
                        },
                        {
                            "usrId": "lypham",
                            "usrNm": "Ly Pham"
                        },
                        {
                            "usrId": "myntd",
                            "usrNm": "My Nguyen Thi Diem"
                        },
                        {
                            "usrId": "phungny",
                            "usrNm": "Phung Nguyen Yen"
                        },
                        {
                            "usrId": "quannqm",
                            "usrNm": "Quan Nguyen Quoc Minh"
                        },
                        {
                            "usrId": "thitt",
                            "usrNm": "Thi Tran Tiu"
                        },
                        {
                            "usrId": "thupham",
                            "usrNm": "Thu Pham"
                        },
                        {
                            "usrId": "thuongtran",
                            "usrNm": "Thuong Tran"
                        },
                        {
                            "usrId": "tienle",
                            "usrNm": "Tien Le"
                        },
                        {
                            "usrId": "trangly",
                            "usrNm": "Trang Ly"
                        }
                    ],
                    "className": "com.dou.pim.models.UserAssignVO",
                    "efrtPctNo": 3,
                    "estmDueDt": "202502121728",
                    "endTmNo": 28,
                    "mode": 0,
                    "pctNo": 5,
                    "phsCd": "PIM_PHS_CDREC",
                    "phsNm": "Confirmation",
                    "plnDueDt": "202502121728",
                    "plnStDt": "202502121638",
                    "prntPhsCd": "PIM_PHS_CDREG",
                    "prntPhsId": "APP20220825000000001",
                    "procPhsId": "APP20220825000000002",
                    "rsrcRoleCd": "PJT_USR_RLPM,RID20141202000000002",
                    "stTmNo": 16.63,
                    "strEndDt": "2025021217",
                    "utPctNo": 100,
                    "wrkHrNo": 0.8,
                    "usrId": "thupham",
                    "usrNm": "Thu Pham"
                },
                {
                    "asgnList": [
                        {
                            "usrId": "anhpty",
                            "usrNm": "Anh Pham Thị Yen"
                        },
                        {
                            "usrId": "anhtm",
                            "usrNm": "Anh Tran Mai"
                        },
                        {
                            "usrId": "anhtrinhminh",
                            "usrNm": "Anh Trinh Minh"
                        },
                        {
                            "usrId": "baodao",
                            "usrNm": "Bao Dao"
                        },
                        {
                            "usrId": "baoln",
                            "usrNm": "Bao Le Ngoc"
                        },
                        {
                            "usrId": "baong",
                            "usrNm": "Bao Nguyen Gia"
                        },
                        {
                            "usrId": "baophung",
                            "usrNm": "Bao Phung"
                        },
                        {
                            "usrId": "baovlg",
                            "usrNm": "Bao Vo Lam Gia"
                        },
                        {
                            "usrId": "binhle",
                            "usrNm": "Binh Le"
                        },
                        {
                            "usrId": "binhnn",
                            "usrNm": "Binh Nguyen"
                        },
                        {
                            "usrId": "cuongnq",
                            "usrNm": "Cuong Nguyen Quoc"
                        },
                        {
                            "usrId": "datnq",
                            "usrNm": "Dat Nguyen Quoc"
                        },
                        {
                            "usrId": "dienngo",
                            "usrNm": "Dien Ngo"
                        },
                        {
                            "usrId": "dinhtruong",
                            "usrNm": "Dinh Truong"
                        },
                        {
                            "usrId": "dongle",
                            "usrNm": "Dong Le"
                        },
                        {
                            "usrId": "ducchau",
                            "usrNm": "Duc Chau"
                        },
                        {
                            "usrId": "duongphan",
                            "usrNm": "Duong Phan"
                        },
                        {
                            "usrId": "duongtran",
                            "usrNm": "Duong Tran"
                        },
                        {
                            "usrId": "duyhoang",
                            "usrNm": "Duy Hoang"
                        },
                        {
                            "usrId": "duynd",
                            "usrNm": "Duy Nguyen Dang"
                        },
                        {
                            "usrId": "duynh",
                            "usrNm": "Duy Nguyen Hoang"
                        },
                        {
                            "usrId": "giangnguyentruong",
                            "usrNm": "Giang Nguyen Truong"
                        },
                        {
                            "usrId": "hangpnt",
                            "usrNm": "Hang Pham Ngoc Thanh"
                        },
                        {
                            "usrId": "hanhpham",
                            "usrNm": "Hanh Pham"
                        },
                        {
                            "usrId": "hieung",
                            "usrNm": "Hieu Trung Nguyen"
                        },
                        {
                            "usrId": "hoannn",
                            "usrNm": "Hoan Nguyen Ngoc"
                        },
                        {
                            "usrId": "hungng",
                            "usrNm": "Hung Nguyen"
                        },
                        {
                            "usrId": "huongnt",
                            "usrNm": "Huong Nguyen Thanh"
                        },
                        {
                            "usrId": "huydang",
                            "usrNm": "Huy Dang"
                        },
                        {
                            "usrId": "huynguyen",
                            "usrNm": "Huy Nguyen"
                        },
                        {
                            "usrId": "huynguyendac",
                            "usrNm": "Huy Nguyen Dac"
                        },
                        {
                            "usrId": "huyng",
                            "usrNm": "Huy Nguyen Gia"
                        },
                        {
                            "usrId": "huynlh",
                            "usrNm": "Huy Nguyen Le Hoang"
                        },
                        {
                            "usrId": "huythach",
                            "usrNm": "Huy Thach"
                        },
                        {
                            "usrId": "huytdg",
                            "usrNm": "Huy Tran Dam Gia"
                        },
                        {
                            "usrId": "huyenntn",
                            "usrNm": "Huyen Nguyen Thi Ngoc"
                        },
                        {
                            "usrId": "khanhnk",
                            "usrNm": "Khanh Nguyen Kim"
                        },
                        {
                            "usrId": "khanhnp",
                            "usrNm": "Khanh Nguyen Phu"
                        },
                        {
                            "usrId": "khoahoang",
                            "usrNm": "Khoa Hoang"
                        },
                        {
                            "usrId": "khoale",
                            "usrNm": "Khoa Le"
                        },
                        {
                            "usrId": "kietlai",
                            "usrNm": "Kiet Lai"
                        },
                        {
                            "usrId": "lamnt",
                            "usrNm": "Lam Nguyen Thanh"
                        },
                        {
                            "usrId": "landoan",
                            "usrNm": "Lan Doan"
                        },
                        {
                            "usrId": "linhntt",
                            "usrNm": "Linh Nguyen Thi Thuy"
                        },
                        {
                            "usrId": "linhpnk",
                            "usrNm": "Linh Phan Nhat Khanh"
                        },
                        {
                            "usrId": "linhta",
                            "usrNm": "Linh Ta"
                        },
                        {
                            "usrId": "linhtm",
                            "usrNm": "Linh Tran My"
                        },
                        {
                            "usrId": "longtcp",
                            "usrNm": "Long Tran Cao Phuoc"
                        },
                        {
                            "usrId": "lypham",
                            "usrNm": "Ly Pham"
                        },
                        {
                            "usrId": "minhdpn",
                            "usrNm": "Minh Do Phuong Nhat"
                        },
                        {
                            "usrId": "myntd",
                            "usrNm": "My Nguyen Thi Diem"
                        },
                        {
                            "usrId": "namtn",
                            "usrNm": "Nam Thai Nguyen"
                        },
                        {
                            "usrId": "namthanhnguyen",
                            "usrNm": "Nam Thanh Nguyen"
                        },
                        {
                            "usrId": "namtv",
                            "usrNm": "Nam Tran Van"
                        },
                        {
                            "usrId": "ngattq",
                            "usrNm": "Nga Tran Thi Quynh"
                        },
                        {
                            "usrId": "nganndk",
                            "usrNm": "Ngan Nguyen Dieu Kim"
                        },
                        {
                            "usrId": "ngocnkl",
                            "usrNm": "Ngoc Nguyen Khanh Lam"
                        },
                        {
                            "usrId": "nguyendoan",
                            "usrNm": "Nguyen Doan"
                        },
                        {
                            "usrId": "nhanhuynhtrung",
                            "usrNm": "Nhan Huynh Trung"
                        },
                        {
                            "usrId": "nhannguyentrong",
                            "usrNm": "Nhan Nguyen Trong"
                        },
                        {
                            "usrId": "nhidu",
                            "usrNm": "Nhi Du"
                        },
                        {
                            "usrId": "nhihoang",
                            "usrNm": "Nhi Hoang"
                        },
                        {
                            "usrId": "nhungvo",
                            "usrNm": "Nhung Vo"
                        },
                        {
                            "usrId": "phudn",
                            "usrNm": "Phu Duy Nguyen"
                        },
                        {
                            "usrId": "phuchoangnguyen",
                            "usrNm": "Phuc Hoang Nguyen"
                        },
                        {
                            "usrId": "phungny",
                            "usrNm": "Phung Nguyen Yen"
                        },
                        {
                            "usrId": "phuonglethe",
                            "usrNm": "Phuong Le The"
                        },
                        {
                            "usrId": "phuongntm",
                            "usrNm": "Phuong Nguyen Truong Minh"
                        },
                        {
                            "usrId": "quannqm",
                            "usrNm": "Quan Nguyen Quoc Minh"
                        },
                        {
                            "usrId": "quangdn",
                            "usrNm": "Quang Do Nhat"
                        },
                        {
                            "usrId": "quangndn",
                            "usrNm": "Quang Nguyen Don Ngoc"
                        },
                        {
                            "usrId": "quangnm",
                            "usrNm": "Quang Nguyen Minh"
                        },
                        {
                            "usrId": "quyenho",
                            "usrNm": "Quyen Ho"
                        },
                        {
                            "usrId": "sonhuynh",
                            "usrNm": "Son Huynh"
                        },
                        {
                            "usrId": "sonng",
                            "usrNm": "Son Nguyen Huynh"
                        },
                        {
                            "usrId": "suongduong",
                            "usrNm": "Suong Duong"
                        },
                        {
                            "usrId": "tainguyentuan",
                            "usrNm": "Tai Nguyen Tuan"
                        },
                        {
                            "usrId": "tannv",
                            "usrNm": "Tan Nguyen Van"
                        },
                        {
                            "usrId": "thanhdo",
                            "usrNm": "Thanh Do"
                        },
                        {
                            "usrId": "thaolhh",
                            "usrNm": "Thao Le Hoang Hieu"
                        },
                        {
                            "usrId": "thinguyen",
                            "usrNm": "Thi Nguyen"
                        },
                        {
                            "usrId": "thitt",
                            "usrNm": "Thi Tran Tiu"
                        },
                        {
                            "usrId": "thienth",
                            "usrNm": "Thien Tran Huu"
                        },
                        {
                            "usrId": "thinhbui",
                            "usrNm": "Thinh Bui"
                        },
                        {
                            "usrId": "thupham",
                            "usrNm": "Thu Pham"
                        },
                        {
                            "usrId": "thuanvuong",
                            "usrNm": "Thuan Vuong"
                        },
                        {
                            "usrId": "thuongnt",
                            "usrNm": "Thuong Nguyen Thien"
                        },
                        {
                            "usrId": "thuongtran",
                            "usrNm": "Thuong Tran"
                        },
                        {
                            "usrId": "tienle",
                            "usrNm": "Tien Le"
                        },
                        {
                            "usrId": "tiennd",
                            "usrNm": "Tien Nguyen Duc"
                        },
                        {
                            "usrId": "trangluong",
                            "usrNm": "Trang Luong"
                        },
                        {
                            "usrId": "trangly",
                            "usrNm": "Trang Ly"
                        },
                        {
                            "usrId": "trangngtt",
                            "usrNm": "Trang Nguyen TT"
                        },
                        {
                            "usrId": "trucdang",
                            "usrNm": "Truc Dang"
                        },
                        {
                            "usrId": "trucvo",
                            "usrNm": "Truc Vo"
                        },
                        {
                            "usrId": "trungnm",
                            "usrNm": "Trung Nguyen Minh"
                        },
                        {
                            "usrId": "tuanhoang",
                            "usrNm": "Tuan Hoang"
                        },
                        {
                            "usrId": "tuanthm",
                            "usrNm": "Tuan Tran Hoang Minh"
                        },
                        {
                            "usrId": "tuevo",
                            "usrNm": "Tue Vo"
                        },
                        {
                            "usrId": "tuyendinh",
                            "usrNm": "Tuyen Dinh"
                        },
                        {
                            "usrId": "uytran",
                            "usrNm": "Uy Tran"
                        },
                        {
                            "usrId": "vuongle",
                            "usrNm": "Vuong Le"
                        },
                        {
                            "usrId": "xuannv",
                            "usrNm": "Xuan Nguyen Viet"
                        }
                    ],
                    "className": "com.dou.pim.models.UserAssignVO",
                    "efrtPctNo": 90,
                    "estmDueDt": "202502141639",
                    "endTmNo": 39,
                    "mode": 0,
                    "pctNo": 90,
                    "phsCd": "PIM_PHS_CDIMP",
                    "phsNm": "Implementation",
                    "plnDueDt": "202502141639",
                    "plnStDt": "202502121728",
                    "prntPhsCd": "PIM_PHS_CDREC",
                    "prntPhsId": "APP20220825000000002",
                    "procPhsId": "APP20220825000000003",
                    "rsrcRoleCd": "PJT_USR_RLDEV,PJT_USR_RLQA,PJT_USR_RLTSR,RID20141117000000001,RID20141202000000003",
                    "stTmNo": 17.47,
                    "strEndDt": "2025021416",
                    "utPctNo": 100,
                    "wrkHrNo": 15.2,
                    "usrId": "duynd",
                    "usrNm": "Duy Nguyen Dang"
                },
                {
                    "asgnList": [
                        {
                            "usrId": "linhpnk",
                            "usrNm": "Linh Phan Nhat Khanh"
                        },
                        {
                            "usrId": "lypham",
                            "usrNm": "Ly Pham"
                        },
                        {
                            "usrId": "myntd",
                            "usrNm": "My Nguyen Thi Diem"
                        },
                        {
                            "usrId": "phungny",
                            "usrNm": "Phung Nguyen Yen"
                        },
                        {
                            "usrId": "quannqm",
                            "usrNm": "Quan Nguyen Quoc Minh"
                        },
                        {
                            "usrId": "thitt",
                            "usrNm": "Thi Tran Tiu"
                        },
                        {
                            "usrId": "thupham",
                            "usrNm": "Thu Pham"
                        },
                        {
                            "usrId": "thuongtran",
                            "usrNm": "Thuong Tran"
                        },
                        {
                            "usrId": "tienle",
                            "usrNm": "Tien Le"
                        },
                        {
                            "usrId": "trangly",
                            "usrNm": "Trang Ly"
                        }
                    ],
                    "className": "com.dou.pim.models.UserAssignVO",
                    "efrtPctNo": 2,
                    "estmDueDt": "202502151730",
                    "mode": 0,
                    "pctNo": 5,
                    "phsCd": "PIM_PHS_CDFIN",
                    "phsNm": "Finish",
                    "plnDueDt": "202502151730",
                    "plnStDt": "202502141639",
                    "prntPhsCd": "PIM_PHS_CDIMP",
                    "prntPhsId": "APP20220825000000003",
                    "procPhsId": "APP20220825000000004",
                    "rsrcRoleCd": "PJT_USR_RLPM,RID20141202000000002",
                    "wrkHrNo": 0.9,
                    "usrId": "thupham",
                    "usrNm": "Thu Pham"
                }
            ],
            "pntNo": "30",
            "plnDueDt": "202502151730",
            "plnStDt": "202502121638",
            "phsCd": "PIM_PHS_CDREG",
            "rltTpCd": null,
            "confFlg": "N"
        },
        "categoryList": {
            "id": "PJT20231113000000004",
            "open": false,
            "value": "POOL",
            "className": "com.dou.adm.models.AdmPjtVO",
            "pjtId": "PJT20231113000000004",
            "prntPjtId": "PJT20230329000000001",
            "pjtNm": "POOL",
            "mgrId": "thuongtran",
            "pjtTpCd": "ADM_PJT_TPCAT",
            "coCd": "DOU",
            "rootPjtId": "PJT20220609000000001",
            "ordNo": 2,
            "mode": 0,
            "$count": 0,
            "$parent": "PJT20230329000000001",
            "$level": 3
        },
        "flgRefer": "",
        "arrRelated": []
    }
      const response = await axios({
          method: 'post',
          url: 'https://blueprint.cyberlogitec.com.vn/api/new-task/new-requirement',
          data,
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Accept-Encoding': 'gzip, deflate, br, zstd',
              'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
              'Connection': 'keep-alive',
              'DNT': '1',
              'Host': 'blueprint.cyberlogitec.com.vn',
              'Referer': 'https://blueprint.cyberlogitec.com.vn/',
              'Sec-Fetch-Dest': 'empty',
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Site': 'same-origin',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
              'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"macOS"',
              'Cookie': process.env.CYBER_COOKIE 
          }
      });
      const newRequirement = response.data;
      return newRequirement
      
  } catch (error) {
      console.error('Error sending request:', error.message);
  }
}

async function getRequirementDetail(reqId) {
  try {
    const response = await axios.get(`https://blueprint.cyberlogitec.com.vn/api/searchRequirementDetails?reqId=${reqId}`, { headers: cyberHeaders })
    const requirementDetail = response.data;
    return requirementDetail;
  } catch (error) {
    console.error(`Error fetching data`, error.message);
    throw new Error('Error fetching issues from Jira');
  }
}

async function putSaveReqJobDetail(data) {
  try {
    // const data = {
    //     "categoryList": [
    //         {
    //             "utPnt": 0,
    //             "jbId": "JOB20220616000000005",
    //             "jbNm": "Training",
    //             "itmAmt": 0,
    //             "$parent": 0
    //         },
    //         {
    //             "utPnt": 200,
    //             "jbId": "JOB20220616000000006",
    //             "jbNm": "High",
    //             "itmAmt": "5",
    //             "$parent": "JOB20220616000000005",
    //             "prntNm": "Training"
    //         }
    //     ],
    //     "totalPoint": 1030,
    //     // 
    //     "reqId": "PRQ20250212000000233",
    //     "cmtCtnt": "<div class=\"system-comment\"> • Added Point: </div>   <div style=\"margin-left: 10px\"> <b>&nbsp;Training:</b></div>  <div style=\"margin-left: 10px\"><i> &nbsp;&nbsp;High: </i>1000 </div> ",
    //     "pjtId": "PJT20220609000000001",
    //     "subPjtId": "PJT20230329000000001",
    //     "action": "REQ_WTC_EFRT"
    //   }

      const response = await axios({
          method: 'put',
          url: 'https://blueprint.cyberlogitec.com.vn/api/save-req-job-detail',
          data,
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Accept-Encoding': 'gzip, deflate, br, zstd',
              'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
              'Connection': 'keep-alive',
              'DNT': '1',
              'Host': 'blueprint.cyberlogitec.com.vn',
              'Referer': 'https://blueprint.cyberlogitec.com.vn/',
              'Sec-Fetch-Dest': 'empty',
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Site': 'same-origin',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
              'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"macOS"',
              'Cookie': process.env.CYBER_COOKIE 
          }
      });
      const putSaveReqJob = response.data;
      return putSaveReqJob
      
  } catch (error) {
      console.error('Error sending request:', error.message);
  }
}

async function putUpdatePointProcessPhase(data) {
  try {
    const response = await axios({
      method: 'put',
      url: 'https://blueprint.cyberlogitec.com.vn/api/update-point-process-phase',
      data,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Host': 'blueprint.cyberlogitec.com.vn',
        'Referer': 'https://blueprint.cyberlogitec.com.vn/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'Cookie': process.env.CYBER_COOKIE 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending request:', error.message);
  }
}

app.get("/report", async (req, res) => {
    try {
      // let cornalIssues = await getCornalIssues();
      // let cornalIssues = [
      //   {
      //     key: 'POM-176',
      //     summary: '(Cornal) Set up Docker container local',
      //     status: 'In Progress',
      //     assignee: 'Cornal Nguyen'
      //   },
      //   {
      //     key: 'POM-150',
      //     summary: 'Setup CI for Dev Env (Github action) using Self-host runner',
      //     status: 'In Progress',
      //     assignee: 'Cornal Nguyen'
      //   },
      //   {
      //     key: 'POM-151',
      //     summary: 'Document guideline (How to Start)',
      //     status: 'TO DO',
      //     assignee: 'Cornal Nguyen'
      //   },
      //   {
      //     key: 'POM-114',
      //     summary: 'Create configuration GKE with manifest file',
      //     status: 'Done',
      //     assignee: 'Cornal Nguyen'
      //   },
      //   {
      //     key: 'POM-112',
      //     summary: 'Sync Application (FE) to GKE through ArgoCD',
      //     status: 'Done',
      //     assignee: 'Cornal Nguyen'
      //   },
      //   {
      //     key: 'POM-113',
      //     summary: 'Connect Container with Google Artifact Registry (FE)',
      //     status: 'Done',
      //     assignee: 'Cornal Nguyen'
      //   }
      // ]

      let newRequirement = await postNewRequirement()
      const { saveFlg, msgId, seqId, reqId } = newRequirement
      if(saveFlg !== 'SAVE_SUCCEED') {
        return res.json({ error: 'saveFlg is not save succeed! (postNewRequirement)' })
      }

      const reqDetail = await getRequirementDetail(newRequirement.reqId)
      const lstSkdUsr = reqDetail?.lstSkdUsr || []

      const detailReqVO = reqDetail?.detailReqVO || null;

      if(!detailReqVO) {
        return res.json({ error: 'detailReqVO empty (getRequirementDetail)' })
      }

      const subPjtId = detailReqVO?.subPjtId || ''

      if(!subPjtId) {
        return res.json({ error: 'subPjtId empty (getRequirementDetail)' })
      }

      let lstJbDetails = reqDetail?.lstJbDetails || []
      if(!lstJbDetails.length) {
        lstJbDetails = [
          {
            className: "com.dou.pim.models.JobDetailsVO",
            jbId: "JOB20220616000000005",
            prntJbId: "0",
            jbNm: "Training",
            utPnt: 0,
            ordNo: 0,
            itmAmt: 0,
            mode: 0
          },
          {
            className: "com.dou.pim.models.JobDetailsVO",
            jbId: "JOB20220616000000006",
            prntJbId: "JOB20220616000000005",
            jbNm: "High",
            utPnt: 200,
            ordNo: 0,
            itmAmt: 5,
            mode: 0
          }
        ]
      }

      if(!lstSkdUsr.length) {
        return res.json({ error: 'lstSkdUsr empty (getRequirementDetail)' })
      }

      const transformedData = lstJbDetails.map(item => {
        const transformedItem = {
            utPnt: item.utPnt,
            jbId: item.jbId,
            jbNm: item.jbNm,
            itmAmt: item.itmAmt,
            $parent: item.prntJbId
        };
    
        if (item.prntJbId !== "0") {
          const parent = lstJbDetails.find(parentItem => parentItem.jbId === item.prntJbId);
          if (parent) {
              transformedItem.prntNm = parent.jbNm;
          }
        }
    
        return transformedItem;
      });

      const dataPutSaveReqJobDetail = {
        categoryList: transformedData,
        totalPoint: 1030,
        reqId: newRequirement.reqId,
        cmtCtnt: "<div class=\"system-comment\"> • Added Point: </div>   <div style=\"margin-left: 10px\"> <b>&nbsp;Training:</b></div>  <div style=\"margin-left: 10px\"><i> &nbsp;&nbsp;High: </i>1000 </div> ",
        pjtId: 'PJT20220609000000001',
        subPjtId: subPjtId,
        action: 'REQ_WTC_EFRT'
      }

      let putSaveReqJob = await putSaveReqJobDetail(dataPutSaveReqJobDetail);
      const isSaveFlg = putSaveReqJob?.saveFlg || null;
      if(isSaveFlg !== 'SAVE_SUCCEED') {
        return res.json({ error: 'saveFlg empty (putSaveReqJobDetail)' })
      }

      const dataUpdatePointProcessPhase = {
        reqId: newRequirement.reqId,
        // lstPhsPoint: lstSkdUsr.map(item => ({
        //   skdId: item.skdId,
        //   efrtNo: parseFloat(item.efrtNo)
        // })),
        lstPhsPoint: [
          {
            skdId: lstSkdUsr[0].skdId,
            efrtNo: 51.5
          },
          {
            skdId: lstSkdUsr[1].skdId,
            efrtNo: 30.9
          },
          {
            skdId: lstSkdUsr[2].skdId,
            efrtNo: 927
          },
          {
            skdId: lstSkdUsr[3].skdId,
            efrtNo: 20.6
          }
        ],
        cmtCtnt: "<div class=\"system-comment\"> • Updated Point: </div>",
        pjtId: "PJT20220609000000001",
        subPjtId: "PJT20230329000000001",
        customFlg: false,
        action: "REQ_WTC_EFRT",
        pstTpCd: "PST_TP_CDACT"
      }

      const updatedPointProcessPhase = await putUpdatePointProcessPhase(dataUpdatePointProcessPhase)
      if(updatedPointProcessPhase?.saveFlg !== 'SAVE_SUCCEED') {
        return res.json({ error: 'updatedPointProcessPhase empty (putUpdatePointProcessPhase)' })
      }

      return res.json(updatedPointProcessPhase)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});