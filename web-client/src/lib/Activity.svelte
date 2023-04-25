<script lang="ts">
    interface Activity {
        name: string;
        description?: string;
        time_to_spend_weekly: number;
        time_spent_ms: number;
        session_start: Date | null;
    }
</script>