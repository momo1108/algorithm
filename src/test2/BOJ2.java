package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M, T;
    static int[] nums;
    static int[][] map, dir = new int[][]{{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        nums = new int[N * M * 3];
        map = new int[N][M];

        
        for (int i = 0; i < N * M * 3; i++) {
            nums[i] = fr.nextInt();
        }

        T = fr.nextInt();

        int pixel;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                pixel = (i * M * 3) + (j * 3);
                map[i][j] = (nums[pixel] + nums[pixel + 1] + nums[pixel + 2]) / 3 >= T? 255 : 0;
            }
        }
    }

    static void dfs(int row, int col){
        int nr, nc;
        map[row][col] = -1;
        for(int[] d : dir){
            nr = row + d[0];
            nc = col + d[1];

            if(nr >= N || nr < 0 || nc >= M || nc < 0) continue;
            if(map[nr][nc] < 255) continue;
            dfs(nr, nc);
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        int answer = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if(map[i][j] == 255){
                    answer++;
                    dfs(i, j);
                }
            }
        }

        System.out.println(answer);
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