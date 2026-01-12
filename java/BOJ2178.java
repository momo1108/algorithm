import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ2178 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[][] map;
    static boolean[][] visit;
    static int[][] dir = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        map = new int[N][M];
        visit = new boolean[N][M];

        for (int i = 0; i < N; i++) {
            String line = fr.nextLine();
            for (int j = 0; j < M; j++) {
                if(line.charAt(j)=='1') map[i][j] = 1;
                else map[i][j] = 0;
            }
        }
    }

    static void bfs(){
        Queue<Integer> queue = new LinkedList<>();
        queue.add(0);
        queue.add(0);
        queue.add(1);
        visit[0][0] = true;

        while(!queue.isEmpty()){
            int row = queue.poll(), col = queue.poll(), count = queue.poll();
            if(row == N - 1 && col == M - 1) {
                System.out.println(count);
                break;
            }

            for(int[] d : dir){
                int nr = row + d[0], nc = col + d[1];
                if(nr < 0 || nc < 0 || nr >= N || nc >= M
                 || visit[nr][nc] || map[nr][nc] == 0) continue;
                queue.add(nr);
                queue.add(nc);
                queue.add(count+1);
                visit[nr][nc] = true;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        bfs();
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