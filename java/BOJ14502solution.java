import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ14502solution {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M, answer = -1;
    static int[][] dir = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    static int[][] map;
    static ArrayList<Integer[]> emptyList = new ArrayList<>();
    static boolean[][] visit;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        map = new int[N][M];
        visit = new boolean[N][M];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                map[i][j] = fr.nextInt();
                if(map[i][j] == 0) emptyList.add(new Integer[]{i, j});
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
                    visit[i][j] = true;
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
                if(nr < 0 || nr >= N || nc < 0 || nc >= M 
                || visit[nr][nc] || map[nr][nc] != 0) continue;
                queue.add(nr);
                queue.add(nc);
                visit[nr][nc] = true;
            }
        }

        int count = 0;
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if(!visit[i][j] && map[i][j] == 0) count++;
            }
        }

        visit = new boolean[N][M];

        answer = Math.max(answer, count);
    }

    static void dfs(int index, int wallCount){
        if(wallCount == 3) {
            bfs();
            return;
        }
        if(index >= emptyList.size()) return;

        Integer[] loc = emptyList.get(index);

        map[loc[0]][loc[1]] = 1;
        dfs(index + 1, wallCount + 1);

        map[loc[0]][loc[1]] = 0;
        dfs(index + 1, wallCount);
    }

    public static void main(String[] args) throws Exception {
        input();
        dfs(0, 0);
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