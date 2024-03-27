import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ14502 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M, answer = -1;
    static int[][] dir = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    static int[][] map;
    static boolean[][] empty;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        map = new int[N][M];
        empty = new boolean[N][M];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                map[i][j] = fr.nextInt();
                if(map[i][j] == 0) empty[i][j] = true;
            }
        }
    }

    static void bfs(){
        Queue<Integer> queue = new LinkedList<Integer>();
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (map[i][j] == 2) {
                    queue.add(i);
                    queue.add(j);
                }
            }
        }

        int nr, nc;
        while(!queue.isEmpty()){
            int row = queue.poll();
            int col = queue.poll();
            for (int[] d : dir) {
                nr = row + d[0];
                nc = col + d[1];
                if(nr < 0 || nr >= N || nc < 0 || nc >= M || !empty[nr][nc]) continue;
                empty[nr][nc] = false;
                queue.add(nr);
                queue.add(nc);
            }
        }

        int count = 0;
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if(empty[i][j]) count++;
                if(map[i][j] == 0) empty[i][j] = true;
                else  empty[i][j] = false;
            }
        }

        answer = Math.max(answer, count);
    }

    static void pro(){
        for (int i = 0; i < N*M; i++) {
            if(!empty[i / M][i % M]) continue;
            for (int j = i+1; j < N*M; j++) {
                if(!empty[j / M][j % M]) continue;
                for (int k = j+1; k < N*M; k++) {
                    if(!empty[k / M][k % M]) continue;
                    empty[i / M][i % M] = false;
                    empty[j / M][j % M] = false;
                    empty[k / M][k % M] = false;
                    bfs();
                }
            }
        }

        System.out.println(answer);
    }

    public static void main(String[] args) throws Exception {
        input();
        pro();
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