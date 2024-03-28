import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ3055_novisit {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int R, C;
    static Integer[] S, D;
    static char[][] map;
    static boolean[][] visit;
    static int[][] dist;
    static int[][] water;
    static Queue<Integer[]> q = new LinkedList<>();
    static int[][] dir = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    // 입력 함수
    static void input(){
        R = fr.nextInt();
        C = fr.nextInt();
        map = new char[R][C];
        visit = new boolean[R][C];
        dist = new int[R][C];
        water = new int[R][C];
        for (int i = 0; i < R; i++) {
            String line = fr.nextLine();
            for (int j = 0; j < C; j++) {
                map[i][j] = line.charAt(j);
                if(map[i][j] == '*') q.add(new Integer[]{i, j});
                else if(map[i][j] == 'S') S = new Integer[]{i, j};
                else if(map[i][j] == 'D') D = new Integer[]{i, j};
            }
        }
    }

    static void waterTimer(){
        int nr, nc;
        while(!q.isEmpty()){
            Integer[] loc = q.poll();
            for(int[] d : dir){
                nr = loc[0] + d[0];
                nc = loc[1] + d[1];
                if(nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
                if(map[nr][nc] != '.' && map[nr][nc] != 'S') continue;
                if(water[nr][nc] > 0) continue;
                water[nr][nc] = water[loc[0]][loc[1]] + 1;
                q.add(new Integer[]{nr, nc});
            }
        }
    }

    static void sol(){
        int nr, nc;
        q.add(S);

        while(!q.isEmpty()){
            Integer[] loc = q.poll();
            for(int[] d : dir){
                nr = loc[0] + d[0];
                nc = loc[1] + d[1];
                if(nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
                if(map[nr][nc] != '.' && map[nr][nc] != 'D') continue;
                if(water[nr][nc] > 0 && dist[loc[0]][loc[1]] + 1 >= water[nr][nc]) continue;
                if(dist[nr][nc] > 0) continue;
                dist[nr][nc] = dist[loc[0]][loc[1]] + 1;
                q.add(new Integer[]{nr, nc});
                if(nr == D[0] && nc == D[1]) return;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        waterTimer();
        sol();
        System.out.println(dist[D[0]][D[1]] > 0 ? dist[D[0]][D[1]] : "KAKTUS");
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