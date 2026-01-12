package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ8 {
    // https://www.acmicpc.net/workbook/view/7942

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static boolean[][] check;
    static int[] A;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new int[N + 1];
        check = new boolean[N + 1][N + 1];
        for (int i = 1; i <= N; i++) {
            A[i] = fr.nextInt();
            check[i][i] = true;
            check[i - 1][i] = A[i - 1] == A[i];
        }

        for(int len = 3; len <= N; len++){
            for(int pStart = 1; pStart <= N - len + 1; pStart++){
                int pEnd = pStart + len - 1;
                check[pStart][pEnd] = check[pStart + 1][pEnd - 1] && A[pStart] == A[pEnd];
            }
        }
    }

    static void dp(){
        int[][] Dy = new int[N + 1][N + 1];
        // Dy[i][j] : i~j 까지 짝팰 부분집합 최대 개수
        // 초기값 : 2자리 부분집합들
        for (int i = 1; i < N; i += 2) {
            Dy[i][i + 1] = check[i][i + 1] ? 1 : 0;
        }

        for (int len = 4; len <= N; len += 2) {
            for (int start = 1; start <= N - len + 1; start += 2) {
                int maxCount = 0;
                for(int pLen = 2; pLen <= len; pLen += 2){
                    if(len == pLen){
                        maxCount = Math.max(maxCount, check[start][start + len - 1]? 1 : 0);
                        break;
                    }
                    if(!check[start][start + pLen - 1] || Dy[start + pLen][start + len - 1] == 0) continue;
                    maxCount = Math.max(maxCount, 1 + Dy[start + pLen][start + len - 1]);
                }
                Dy[start][start + len - 1] = maxCount;
            }
        }

        System.out.println(Dy[1][N] == 0? -1 : Dy[1][N]);
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();
    }

    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        public FastReader(String s) throws FileNotFoundException {
            br = new BufferedReader(new FileReader(new File(s)));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }

        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }
}