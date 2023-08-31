class Solution {
public:
  int lengthOfLongestSubstring(string s) {
    int n = s.length();
    set<char> st;
    int maxLen = 0, windowStart = 0, windowEnd = 0;

    while(windowEnd < n) {
      if(st.find(s[windowEnd]) == st.end()) {
        st.insert(s[windowEnd]);
        maxLen = max(maxLen, windowEnd-windowStart+1);
        windowEnd++;
      }
      else {
        st.erase(st.find(s[windowStart]));
        windowStart++;
      }
    }

    return maxLen;
  }
};
