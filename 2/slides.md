# ChIP-seq Pipelines

### Lab Meeting
<!-- .element: style="margin-top: 1.2em;"-->
------

# Introduction


## Motivation
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
Need for an automated pipeline for processing **ERC** project ``ChIP-seq`` samples


## Former analysis
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel -->
<!-- .element: style="margin-bottom: 1em;"-->
Manual workflow including the following steps:

- mapping with ``GEM``
- fragment length estimation with ``SPP`` (``phantompeaktools``)
- peak calling with ``align2rawsignal`` (a.k.a ``WIGGLER``)


## Drawbacks

- Manual execution
- ``align2rawsignal`` requires a specific version of ``MATLAB Runtime`` and is unmantained
------

# Blueprint


## Workflow

1. [Mapping](#/BlueprintMapping)
2. [Filtering](#/BlueprintFiltering)
3. [Modelling Fragment Size](#/BlueprintModellingFragmentSize)
4. [Peak Calling](#/BlueprintPeakCalling)
5. [Wiggle Plots](#/BlueprintWigglePlots)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
``BWA`` with default parameters + low quality trimming

1. ``bwa aln``
  - max edit distance **0.04**
  - disallow long gaps
  - trimming low quality (**<5**) reads
<!-- .element: style="margin-bottom: 0.6em;"-->
2. ``bwa samse``
  - max **3** output alignments

3.  mark duplicates


## Filtering

- exclude SAM flag ``1024``
  * PCR or optical duplicates
- remove low quality (**<5**) mappings


## Modelling Fragment Size
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``SPP`` to estimate the fragment size


## Peak Calling
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``MACS2`` to estimate the fragment size using both the standard method
and the ``-broad`` flag depending on the mark in question

- Standard: ``H3K27me3``, ``H3K36me3``, ``H3K9me3``, ``H3K4me1``
- Broad: ``H3K27ac``, ``H3K4me3``, ``H3K9/14ac``, ``H2A.Zac``


## Wiggle Plots
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``align2RawSignal`` to produce signal plots. Sex specific
fasta and ``umap`` files are used.
------

# ENCODE


## Workflow

1. [Mapping](#/ENCODEMapping)
2. [Filter QC](#/ENCODEFilterQC)
3. [Xcor](#/ENCODEXcor)
4. [SPP](#/ENCODESPP)
5. [MACS2](#/ENCODEMACS2)
6. [IDR](#/ENCODEIDR)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
``BWA`` with default parameters

1. ``bwa aln``
  - max edit distance **0.04**
  - disallow long gaps
  - no trimming
<!-- .element: style="margin-bottom: 0.6em;"-->
2. ``bwa samse``
  - max **3** output alignments


## Filter QC

  - exclude SAM flag``1804``
    * read unmapped
    * mate unmapped
    * secondary alignments
    * not passing platform quality check
    * PCR or optical duplicates
  - mark duplicates with Picard


## Xcor
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``SPP`` to calculate cross correlation QC scores and estimate fragment size

  - create ``tagAlign`` file
  - create ``BEDPE`` file
  - subsample ``tagAlign`` file (15M reads)
  - run ``SPP``


## SPP
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``SPP`` to call peaks

  - call peaks
    * RegionPeaks (``-savr`` option)
  - fix bad coordinates in peak files
    * adjust feature end coordinates that go off the end of the chromosome (``slopBed``)
    * remove any features that are still not within the boundaries of the chromosome (``bedClip``)


## MACS2
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``MACS2`` to call peaks - assumes ``input`` is always present

  - narrow peaks and preliminary signal tracks
  - broad and gapped peaks
  - fold enrichment signal tracks
  - ``-log10(p-value)`` signal tracks
  - bigWigs from beds to support ``trackhub`` visualization of peak files


## IDR
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
perform IDR analysis on replicates

  - True Replicates
  - Rep 1 Self-pseudoreplicates
  - Rep 2 Self-pseudoreplicates
  - Pooled Pseudoreplicates

<!-- panel->(green) -->
<!-- .element: style="margin-top: 2em;"-->
final peak calls
------

# Current Implementation


## Workflow

1. [Mapping](#/CurrentImplementationMapping)
2. [Merge BAM files on metadata key](#/CurrentImplementationWorkflow)
3. [Model](#/CurrentImplementationModel)
4. [Peak Calling](#/CurrentImplementationPeakCalling)


## Mapping
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
``GEM``

1. ``gem-mapper`` with default parameters
2. ``gt.filter``
  - max edit distance (**2** - absolute number of bases)
<!-- .element: style="margin-bottom: 0.6em;"-->
3. ``gt.filter``
  - max **10** output alignments
4. exclude SAM flag ``256``
  - keep primary alignments only


## Model
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``SPP`` to estimate fragment size and produce cross-correlation plot


## Peak Calling
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
uses ``MACS2`` to call peaks - work with or without ``input``

  - narrow peaks and preliminary signal tracks
  - broad and gapped peaks
  - pileup signal tracks
  - only with ``input`` present:
    - fold enrichment signal tracks
    - ``-log10(p-value)`` signal tracks
------

# Future work


## IHEC reference standards
<!-- .element: style="margin-bottom: 0.6em;"-->

- QC metrics
  1. Read length and sequencing depth
  <!-- .element: style="margin-top: 0.5em;"-->
  2. Fraction aligned reads, duplicate reads
  3. Concordance between replicate datasets
  4. Fraction of reads in enriched intervals, and other criteria.
  5. Use of controls
<!-- .element: style="margin-bottom: 1em;"-->
- Biological replicates

Note:
1. ~30-50 million aligned reads with at least a 36 base read length
2. primer dimer artifacts, contamination, potential PCR artifacts
4. Roadmap project is working on data based QA criteria
5. library derived from the chromatin preparation


## HOMER
<!-- .element: style="margin-bottom: 0.6em;"-->
![alt text](http://homer.salk.edu/homer/pic2.gif "")

1. Peak finding / Transcript detection / Feature identification (``findPeaks``)
2. Motif analysis (``findMotifsGenome.pl)``
3. Annotation of Peaks (``annotatePeaks.pl``)


## Pipeline steps
<!-- .element: style="margin-bottom: 0.6em;"-->

- UCSC track hubs
  1. automatically make BigWig files accessible
  <!-- .element: style="margin-top: 0.5em;"-->
  2. produce the UCSC track hub file
<!-- .element: style="margin-bottom: 1em;"-->
