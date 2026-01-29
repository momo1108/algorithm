import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.StringTokenizer;

public class BOJ2667 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, count = 0;
    static ArrayList<Integer> answer = new ArrayList<>();
    static boolean[][] map, visit;
    static int[][] dir = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};


    // 입력 함수
    static void input(){
        N = fr.nextInt();
        map = new boolean[N][N];
        visit = new boolean[N][N];

        String row;
        for (int i = 0; i < N; i++) {
            row = fr.nextLine();
            for (int j = 0; j < N; j++) {
                if(row.charAt(j)=='1') map[i][j] = true;
            }
        }
    }

    static void dfs(int row, int col){
        if(map[row][col] && !visit[row][col]){
            visit[row][col] = true;
            count++;

            int newRow, newCol;
            for (int[] d : dir) {
                newRow = row + d[0];
                newCol = col + d[1];
                if(newRow < 0 || newCol < 0 || newRow >= N || newCol >= N) continue;
                dfs(newRow, newCol);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                dfs(i, j);
                if(count > 0) answer.add(count);
                count = 0;
            }
        }

        Collections.sort(answer);

        System.out.println(answer.size());
        for (Integer a : answer) {
            System.out.println(a);
        }
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